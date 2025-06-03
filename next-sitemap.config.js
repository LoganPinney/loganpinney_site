module.exports = {
  siteUrl: 'https://loganpinney.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/drafts/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/private/' }
    ],
    additionalSitemaps: [
      'https://loganpinney.com/my-custom-sitemap-1.xml'
    ]
  }
}