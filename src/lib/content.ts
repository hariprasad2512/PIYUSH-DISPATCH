import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Issue, IssueSummary, Topic } from '@/types';
import { calculateReadingTime, extractHeadings, slugify } from './utils';

const contentDir = path.join(process.cwd(), 'content', 'issues');

// Fast In-Memory Cache for 0ms Server-Side Reads
let cachedIssues: Issue[] | null = null;
let cacheTime: number = 0;
const CACHE_TTL_MS = 10000; // 10 seconds cache TTL for development hot-reloading

export async function getAllIssues(): Promise<Issue[]> {
  const now = Date.now();
  if (cachedIssues && (now - cacheTime) < CACHE_TTL_MS) {
    return cachedIssues;
  }

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const issues = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const fullPath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const id = file.replace(/\.mdx?$/, '');
      const slug = data.slug || id;

      return {
        id,
        slug,
        issueNumber: data.issueNumber || 0,
        date: data.date || new Date().toISOString(),
        title: data.title || 'Untitled',
        subtitle: data.subtitle || '',
        excerpt: data.excerpt || '',
        heroImage: data.heroImage ? data.heroImage.replace(/\/issue(%23|#)/gi, '/issue-') : '',
        readingTime: calculateReadingTime(content),
        topics: data.topics || [],
        tags: data.tags || [],
        content,
        headings: extractHeadings(content),
        sources: data.sources || [],
        relatedIssues: data.relatedIssues || [],
        published: data.published !== false,
      } as Issue;
    })
    .filter(issue => issue.published);

  // Sort by issue number descending
  const sorted = issues.sort((a, b) => b.issueNumber - a.issueNumber);
  cachedIssues = sorted;
  cacheTime = now;
  return sorted;
}

export async function getIssueSummaries(): Promise<IssueSummary[]> {
  const issues = await getAllIssues();
  const articleOnlyFields = new Set(['content', 'headings', 'sources', 'relatedIssues', 'published']);
  return issues.map((issue) => Object.fromEntries(
    Object.entries(issue).filter(([key]) => !articleOnlyFields.has(key))
  ) as IssueSummary);
}

export async function getIssueBySlug(slug: string): Promise<Issue | null> {
  const issues = await getAllIssues();
  if (!slug) return null;
  if (slug === 'latest' && issues.length > 0) return issues[0];

  const cleanSlug = slug.toLowerCase().trim();
  return issues.find((issue) => 
    issue.slug.toLowerCase() === cleanSlug || 
    issue.id.toLowerCase() === cleanSlug ||
    `daily-nodes-${String(issue.issueNumber).padStart(3, '0')}`.toLowerCase() === cleanSlug ||
    `daily-nodes-${issue.issueNumber}`.toLowerCase() === cleanSlug
  ) || null;
}

export async function getIssuesByTopic(topicSlug: string): Promise<Issue[]> {
  const issues = await getAllIssues();
  return issues.filter((issue) => 
    issue.topics.some(topic => slugify(topic) === topicSlug)
  );
}

export async function getAllTopics(): Promise<Topic[]> {
  const issues = await getAllIssues();
  const topicMap = new Map<string, Topic>();

  issues.forEach((issue) => {
    issue.topics.forEach((topicName) => {
      const slug = slugify(topicName);
      if (topicMap.has(slug)) {
        topicMap.get(slug)!.count++;
      } else {
        topicMap.set(slug, {
          name: topicName,
          slug,
          count: 1,
          description: `Articles and issues related to ${topicName}`,
        });
      }
    });
  });

  return Array.from(topicMap.values()).sort((a, b) => b.count - a.count);
}

export async function getRelatedIssues(issue: Issue, limit: number = 3): Promise<Issue[]> {
  const issues = await getAllIssues();
  
  if (issue.relatedIssues && issue.relatedIssues.length > 0) {
    const explicitlyRelated = issues.filter(i => issue.relatedIssues.includes(i.slug) && i.slug !== issue.slug);
    if (explicitlyRelated.length >= limit) return explicitlyRelated.slice(0, limit);
    
    const relatedByTopic = issues
      .filter(i => i.slug !== issue.slug && !issue.relatedIssues.includes(i.slug))
      .map(i => {
        const commonTopics = i.topics.filter(t => issue.topics.includes(t)).length;
        return { issue: i, score: commonTopics };
      })
      .filter(i => i.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(i => i.issue);
      
    return [...explicitlyRelated, ...relatedByTopic].slice(0, limit);
  }

  const relatedByTopic = issues
    .filter(i => i.slug !== issue.slug)
    .map(i => {
      const commonTopics = i.topics.filter(t => issue.topics.includes(t)).length;
      return { issue: i, score: commonTopics };
    })
    .filter(i => i.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(i => i.issue);

  return relatedByTopic.slice(0, limit);
}

export async function getPreviousIssue(issueNumber: number): Promise<Issue | null> {
  const issues = await getAllIssues();
  return issues.find(i => i.issueNumber < issueNumber) || null;
}

export async function getNextIssue(issueNumber: number): Promise<Issue | null> {
  const issues = await getAllIssues();
  for (let i = issues.length - 1; i >= 0; i--) {
    if (issues[i].issueNumber > issueNumber) {
      return issues[i];
    }
  }
  return null;
}

export async function searchIssues(query: string): Promise<Issue[]> {
  if (!query || query.trim() === '') return [];
  
  const issues = await getAllIssues();
  const lowerQuery = query.toLowerCase();
  
  return issues.filter(issue => 
    issue.title.toLowerCase().includes(lowerQuery) ||
    issue.subtitle.toLowerCase().includes(lowerQuery) ||
    issue.excerpt.toLowerCase().includes(lowerQuery) ||
    issue.content.toLowerCase().includes(lowerQuery) ||
    issue.topics.some(t => t.toLowerCase().includes(lowerQuery)) ||
    issue.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

export async function getLatestIssue(): Promise<Issue | null> {
  const issues = await getAllIssues();
  return issues.length > 0 ? issues[0] : null;
}
