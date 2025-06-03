// next-sitemap.config.cjs
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://loganpinney.com',   // ← your production URL
    generateRobotsTxt: true,              // ← creates robots.txt
    changefreq: 'weekly',                 // ← default change frequency
    priority: 0.7,                        // ← default priority
    exclude: [
      '/admin/*',                         // ← any paths you don’t want indexed
      '/drafts/*'
    ],
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://loganpinney.com/sitemap.xml',
        // you can list extra sitemap chunks if you split them
      ]
    }
  }