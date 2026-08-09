import React from 'react';
import { marked } from 'marked';
import { slugify } from '@/lib/utils';

interface MDXContentProps {
  content: string;
}

const renderer = new marked.Renderer();
const renderedContentCache = new Map<string, string>();

// Custom heading renderer for TOC anchor scrolling
renderer.heading = function({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const rawText = tokens.map(t => t.raw || '').join('');
  const id = slugify(rawText || text);

  if (depth === 2) {
    return `<h2 id="${id}" class="scroll-mt-28 border-b border-[var(--border-color)] pb-3 font-serif text-2xl md:text-3xl font-bold mt-14 mb-6 text-[var(--text-primary)]">${text}</h2>`;
  }
  if (depth === 3) {
    return `<h3 id="${id}" class="scroll-mt-28 font-serif text-xl md:text-2xl font-bold mt-10 mb-4 text-[var(--text-primary)]">${text}</h3>`;
  }
  if (depth === 1) {
    return `<h1 id="${id}" class="font-serif text-3xl md:text-5xl font-bold mt-12 mb-6 text-[var(--text-primary)]">${text}</h1>`;
  }
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

// Custom image renderer to fix broken image paths and apply senior web dev figure styling
renderer.image = function({ href, title, text }) {
  let cleanSrc = href || '';
  
  if (cleanSrc.startsWith('./assets/')) {
    cleanSrc = cleanSrc.replace('./assets/', '/assets/');
  } else if (cleanSrc.startsWith('assets/')) {
    cleanSrc = '/' + cleanSrc;
  }

  // Handle URL encoding for # symbol in folder names like issue#1
  cleanSrc = cleanSrc.replace('/issue#', '/issue%23');

  const caption = text || title || '';

  return `
    <figure class="my-10 text-center">
      <img 
        src="${cleanSrc}" 
        alt="${caption}" 
        loading="lazy" 
        decoding="async"
        class="rounded-2xl border border-[var(--border-color)] shadow-lg w-full max-w-4xl mx-auto object-cover bg-[var(--surface)] transition-transform duration-300 hover:scale-[1.01]" 
        onerror="this.onerror=null; this.style.display='none';"
      />
      ${caption ? `<figcaption class="mt-3 text-center text-xs font-mono text-[var(--text-secondary)] italic">${caption}</figcaption>` : ''}
    </figure>
  `;
};

marked.use({ renderer, gfm: true, breaks: true });

export function MDXContent({ content }: MDXContentProps) {
  const source = content || '';
  let htmlContent = renderedContentCache.get(source);
  if (htmlContent === undefined) {
    htmlContent = marked.parse(source) as string;
    renderedContentCache.set(source, htmlContent);
  }

  return (
    <div 
      className="prose prose-lg max-w-none text-[var(--text-primary)] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default MDXContent;
