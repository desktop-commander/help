import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import {
  BASE,
  HELP_ORIGIN,
  IS_TEST_COPY,
  SITE,
  SITE_DESCRIPTION,
  SITE_TITLE,
  buildPageTitles,
  buildSidebar,
  linkFromRelativePath,
  markdownPath,
  pageUrl,
} from './content.mts'
import { writeLlmsFiles } from './llms.mts'

// Image shown when a page is shared in Slack, LinkedIn, ChatGPT and so on (1200 x 630)
const SHARE_IMAGE = pageUrl('/og-image.png')

// Google Analytics, with the same property and cookie banner (Cookiebot) as
// desktopcommander.app. Google Analytics only loads after the visitor accepts
// statistics cookies. Help center events are in theme/analytics.ts.
const GA_ID = 'G-HXL4Y3Y62N'
const COOKIEBOT_ID = '83cceb09-32d2-409b-ada6-17cc28478ba6'
const ANALYTICS_HTML = `
    <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="${COOKIEBOT_ID}" data-blockingmode="auto" type="text/javascript" async></script>
    <script type="text/plain" data-cookieconsent="statistics" async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script type="text/plain" data-cookieconsent="statistics">
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    </script>`

export default defineConfig({
  lang: 'en-US',
  title: SITE_TITLE,
  titleTemplate: `:title | ${SITE_TITLE}`,
  description: SITE_DESCRIPTION,
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,
  appearance: false, // light theme only
  srcExclude: ['**/README.md'],

  sitemap: { hostname: `${HELP_ORIGIN}${BASE}` },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${BASE}favicon-32x32.png` }],
    ['link', { rel: 'apple-touch-icon', href: `${BASE}apple-touch-icon.png` }],
    ['link', { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: `${BASE}llms.txt` }],
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:image', content: SHARE_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Desktop Commander Help' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: SHARE_IMAGE }],
    // Keep test copies out of search engines
    ...(IS_TEST_COPY ? [['meta', { name: 'robots', content: 'noindex, nofollow' }] as const] : []),
  ],

  // Per page: the desktopcommander.app/help address, the Markdown copy for AI
  // tools, and the title and description used in link previews
  transformPageData(pageData) {
    const link = linkFromRelativePath(pageData.relativePath)
    const url = pageUrl(link)
    const title = pageData.frontmatter.title ?? pageData.title ?? SITE_TITLE
    const description = pageData.frontmatter.description ?? SITE_DESCRIPTION
    const isArticle = !/(^|\/)index\.md$/.test(pageData.relativePath)
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['link', { rel: 'alternate', type: 'text/markdown', href: pageUrl(markdownPath(link)) }],
      ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    )
  },

  // Cookie banner and Google Analytics, first thing in <head> of every built
  // page. Added here rather than in `head` so page changes don't touch them.
  // Only runs in npm run build, and not for the test copy.
  transformHtml(html) {
    if (IS_TEST_COPY) return html
    return html.replace('<meta charset="utf-8">', (tag) => tag + ANALYTICS_HTML)
  },

  // llms.txt, llms-full.txt and a Markdown copy of every page
  buildEnd(siteConfig) {
    writeLlmsFiles(siteConfig.outDir)
  },

  vite: {
    resolve: {
      // Sidebar section names as plain text instead of <h2> (see theme/overrides)
      alias: [
        {
          find: /^.*\/VPSidebarItem\.vue$/,
          replacement: fileURLToPath(new URL('./theme/overrides/VPSidebarItem.vue', import.meta.url)),
        },
      ],
    },
  },

  themeConfig: {
    logo: { src: '/logo-light.png', alt: 'Desktop Commander' },
    siteTitle: 'Help',

    nav: [
      { text: 'Getting started', link: '/', activeMatch: '^/($|getting-started/)' },
      { text: 'Troubleshooting', link: '/troubleshooting/' },
      { text: 'Contact support', link: '/support/' },
      { text: 'Manage devices', link: 'https://mcp.desktopcommander.app' },
      { text: 'Home', link: SITE },
    ],

    sidebar: buildSidebar(),

    // Page titles by link, for the "Related articles" block (custom field)
    pageTitles: buildPageTitles(),

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },
    lastUpdated: { text: 'Last updated' },
    docFooter: { prev: 'Previous', next: 'Next' },

    footer: {
      copyright: `© ${new Date().getFullYear()} Desktop Commander`,
    },
  },
})
