import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const SITE = 'https://desktopcommander.app'
const BASE = '/help/'
const DOCS = fileURLToPath(new URL('..', import.meta.url))

// Sidebar sections. Each one is a folder in docs/ with an index.md.
// Getting started is the exception: its page is the home page (docs/index.md).
// Articles inside a folder show up in the sidebar automatically.
const CATEGORIES: { dir: string; text: string; link?: string }[] = [
  { dir: 'getting-started', text: 'Getting started', link: '/' },
  { dir: 'devices', text: 'Devices' },
  { dir: 'account-billing', text: 'Account and billing' },
  { dir: 'security-privacy', text: 'Security and privacy' },
  { dir: 'troubleshooting', text: 'Troubleshooting' },
  { dir: 'local-mcp', text: 'Local MCP' },
  { dir: 'support', text: 'Support' },
]

function readArticle(file: string) {
  const src = fs.readFileSync(file, 'utf8')
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const get = (key: string) =>
    fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '')
  const h1 = src.match(/^#\s+(.+)$/m)?.[1]
  const title = get('title') ?? h1 ?? path.basename(file, '.md')
  return {
    title,
    // Short label for the sidebar. The full question stays the page title.
    sidebarTitle: get('sidebarTitle') ?? title,
    description: get('description') ?? '',
    order: Number(get('order') ?? 999),
    related: readList(fm, 'related'),
  }
}

// Reads a YAML list written as one "- item" per line, for example:
// related:
//   - /troubleshooting/remote-cant-find-computer
function readList(fm: string, key: string): string[] {
  const block = fm.match(new RegExp(`^${key}:\\s*\\r?\\n((?:[ \\t]+-[ \\t]*.+\\r?\\n?)+)`, 'm'))?.[1]
  if (!block) return []
  return block
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
}

// Every page on the site with its title, keyed by link: '/', '/support/', '/devices/connect-computer'.
// Used to show related articles, and to fail the build when a related link points nowhere.
function buildPages() {
  const pages: Record<string, { title: string; related: string[]; file: string }> = {}
  const add = (link: string, file: string) => {
    const { title, related } = readArticle(file)
    pages[link] = { title, related, file: path.relative(DOCS, file) }
  }
  add('/', path.join(DOCS, 'index.md'))
  for (const { dir } of CATEGORIES) {
    const folder = path.join(DOCS, dir)
    if (!fs.existsSync(folder)) continue
    for (const f of fs.readdirSync(folder).filter((f) => f.endsWith('.md'))) {
      add(f === 'index.md' ? `/${dir}/` : `/${dir}/${f.slice(0, -3)}`, path.join(folder, f))
    }
  }
  const broken = Object.values(pages).flatMap(({ related, file }) =>
    related.filter((link) => !pages[link]).map((link) => `${file}: related link "${link}" doesn't exist`),
  )
  if (broken.length) throw new Error(`Broken related links:\n${broken.join('\n')}`)
  return Object.fromEntries(Object.entries(pages).map(([link, p]) => [link, p.title]))
}

function buildSidebar(): DefaultTheme.SidebarItem[] {
  return CATEGORIES.map(({ dir, text, link }) => {
    const folder = path.join(DOCS, dir)
    const items = fs.existsSync(folder)
      ? fs
          .readdirSync(folder)
          .filter((f) => f.endsWith('.md') && f !== 'index.md')
          .map((f) => ({ ...readArticle(path.join(folder, f)), link: `/${dir}/${f.slice(0, -3)}` }))
          .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
          // title and description are used by the article list on each section page
          .map(({ title, sidebarTitle, link, description }) =>
            ({ text: sidebarTitle, title, link, description }) as DefaultTheme.SidebarItem)
      : []
    return { text, link: link ?? `/${dir}/`, collapsed: false, items }
  })
}

export default defineConfig({
  lang: 'en-US',
  title: 'Desktop Commander Help',
  titleTemplate: ':title | Desktop Commander Help',
  description:
    'Help center for Desktop Commander, Remote MCP and the local MCP server: setup, devices, billing, security and troubleshooting.',
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,
  appearance: false, // light theme only
  srcExclude: ['**/README.md'],

  sitemap: { hostname: `${SITE}${BASE}` },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${BASE}favicon-32x32.png` }],
    ['link', { rel: 'apple-touch-icon', href: `${BASE}apple-touch-icon.png` }],
    ['meta', { property: 'og:site_name', content: 'Desktop Commander Help' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  // Every page points Google to its desktopcommander.app/help address
  transformPageData(pageData) {
    const page = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(['link', { rel: 'canonical', href: `${SITE}${BASE}${page}` }])
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
    pageTitles: buildPages(),

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },
    lastUpdated: { text: 'Last updated' },
    docFooter: { prev: 'Previous', next: 'Next' },

    footer: {
      copyright: `© ${new Date().getFullYear()} Desktop Commander`,
    },
  },
})
