/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // must be a full URL, or every <loc> comes out as "//page"
  siteUrl: process.env.SITE_URL || "https://www.jrhunor.com",
  // writes public/robots.txt pointing crawlers at the sitemap
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
