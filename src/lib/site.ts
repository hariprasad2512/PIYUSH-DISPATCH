export const siteConfig = {
  name: "PIYUSH'S DISPATCH",
  shortName: "Piyush's Dispatch",
  url: 'https://dispatch.piyush.dev',
  description:
    'A daily publication exploring AI, software architecture, machine learning, startups, business, and the ideas shaping the future.',
  author: {
    name: 'Piyush',
    handle: 'PiyushPal143104',
    sameAs: [
      'https://x.com/PiyushPal143104',
      'https://github.com/xrcodexcode',
      'https://www.linkedin.com/in/xrcodex/',
    ],
  },
  contactEmail: 'hello@dispatch.piyush.dev',
  defaultImage: '/assets/issue%236/9.jpg',
};

export function absoluteUrl(pathname: string = '/') {
  return new URL(pathname, siteConfig.url).toString();
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
