import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import {
  BASE,
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

  sitemap: { hostname: `${SITE}${BASE}` },

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
