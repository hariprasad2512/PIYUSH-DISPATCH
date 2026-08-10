export interface Source {
  title: string;
  publisher: string;
  date: string;
  url: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface Topic {
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface SearchResult {
  issue: Issue;
  matches: string[];
}

export interface Issue {
  id: string;
  issueNumber: number;
  date: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  heroImage: string;
  readingTime: number;
  topics: string[];
  tags: string[];
  content: string;
  headings: Heading[];
  sources: Source[];
  relatedIssues: string[];
  published: boolean;
  nodeType: 'daily-node' | 'deep-node';
}

/** The fields needed by archive/search cards; excludes article-only payload. */
export type IssueSummary = Pick<Issue,
  'id' | 'issueNumber' | 'date' | 'slug' | 'title' | 'subtitle' |
  'excerpt' | 'heroImage' | 'readingTime' | 'topics' | 'tags' | 'nodeType'
>;
