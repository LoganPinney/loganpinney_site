import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: 'https://www.loganpinney.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  // Keep the private lab excluded below, with explicit public challenge pages.
  additionalPaths: async () => [
    { loc: '/lab/agents', changefreq: 'monthly', priority: 0.6 },
    { loc: '/lab/agents/board', changefreq: 'monthly', priority: 0.4 },
  ],
  exclude: [
    '/admin/*', // any paths you don’t want indexed
    '/drafts/*',
    '/lab',
    '/lab/*',
    '/sprites',
  ],
};

export default config;
