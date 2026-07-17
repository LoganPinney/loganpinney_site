import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: 'https://www.loganpinney.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin/*', // any paths you don’t want indexed
    '/drafts/*',
    '/lab',
    '/lab/*',
    '/sprites',
  ],
};

export default config;
