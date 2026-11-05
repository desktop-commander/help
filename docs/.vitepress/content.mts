// Reads the articles in docs/ and builds the sidebar, the page list and the
// related article checks. Shared by config.mts and llms.mts.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'

export const SITE = 'https://desktopcommander.app'
export const BASE = '/help/'
// Where the help center is served. The test copy on GitHub Pages sets
// HELP_ORIGIN=https://desktop-commander.github.io so its links point to itself.
export const HELP_ORIGIN = process.env.HELP_ORIGIN || SITE
export const IS_TEST_COPY = HELP_ORIGIN !== SITE
export const SITE_TITLE = 'Desktop Commander Help'
export const SITE_DESCRIPTION =
  'Help center for Desktop Commander, Remote MCP and the local MCP server: setup, devices, billing, security and troubleshooting.'
export const DOCS = fileURLToPath(new URL('..', import.meta.url))

// Sidebar sections. Each one is a folder in docs/ with an index.md.
// Getting started is the exception: its page is the home page (docs/index.md).
// Articles inside a folder show up in the sidebar automatically.
export const CATEGORIES: { dir: string; text: string; link?: string }[] = [
  { dir: 'getting-started', text: 'Getting started', link: '/' },
  { dir: 'devices', text: 'Devices' },
  { dir: 'account-billing', text: 'Account and billing' },
  { dir: 'security-privacy', text: 'Security and privacy' },
  { dir: 'troubleshooting', text: 'Troubleshooting' },
  { dir: 'local-mcp', text: 'Local MCP' },
  { dir: 'support', text: 'Support' },
]

export interface Page {
  link: string // '/', '/support/', '/devices/connect-computer'
  file: string // path inside docs/
  title: string
  sidebarTitle: string
  description: string
  order: number
  related: string[]
  body: string // Markdown after the frontmatter
}

export function readPage(file: string, link: string): Page {
  const src = fs.readFileSync(file, 'utf8')
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const fm = match?.[1] ?? ''
  const body = match ? src.slice(match[0].length) : src
  const get = (key: string) =>
    fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '')
  const h1 = body.match(/^#\s+(.+)$/m)?.[1]
  const title = get('title') ?? h1 ?? path.basename(file, '.md')
  return {
    link,
    file: path.relative(DOCS, file),
    title,
    // Short label for the sidebar. The full question stays the page title.
    sidebarTitle: get('sidebarTitle') ?? title,
    description: get('description') ?? '',
    order: Number(get('order') ?? 999),
    related: readList(fm, 'related'),
    body,
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

// The articles of one section, in sidebar order (index.md not included)
export function sectionArticles(dir: string): Page[] {
  const folder = path.join(DOCS, dir)
  if (!fs.existsSync(folder)) return []
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => readPage(path.join(folder, f), `/${dir}/${f.slice(0, -3)}`))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

// Every page on the site: the home page, section pages and articles
export function allPages(): Page[] {
  const pages = [readPage(path.join(DOCS, 'index.md'), '/')]
  for (const { dir } of CATEGORIES) {
    const index = path.join(DOCS, dir, 'index.md')
    if (fs.existsSync(index)) pages.push(readPage(index, `/${dir}/`))
    pages.push(...sectionArticles(dir))
  }
  return pages
}

export function buildSidebar(): DefaultTheme.SidebarItem[] {
  return CATEGORIES.map(({ dir, text, link }) => ({
    text,
    link: link ?? `/${dir}/`,
    collapsed: false,
    // title and description are used by the article list on each section page
    items: sectionArticles(dir).map(
      (p) => ({ text: p.sidebarTitle, title: p.title, link: p.link, description: p.description }) as DefaultTheme.SidebarItem,
    ),
  }))
}

// Page titles by link, for the "Related articles" block.
// Fails the build when a related link points to a page that doesn't exist.
export function buildPageTitles(): Record<string, string> {
  const pages = allPages()
  const byLink = Object.fromEntries(pages.map((p) => [p.link, p]))
  const broken = pages.flatMap((p) =>
    p.related.filter((link) => !byLink[link]).map((link) => `${p.file}: related link "${link}" doesn't exist`),
  )
  if (broken.length) throw new Error(`Broken related links:\n${broken.join('\n')}`)
  return Object.fromEntries(pages.map((p) => [p.link, p.title]))
}

// '/devices/connect-computer' -> 'https://desktopcommander.app/help/devices/connect-computer'
export function pageUrl(link: string): string {
  return `${HELP_ORIGIN}${BASE}${link.replace(/^\//, '')}`
}

// '/devices/connect-computer' -> 'devices/connect-computer.md', '/devices/' -> 'devices/index.md'
export function markdownPath(link: string): string {
  const rel = link.replace(/^\//, '')
  return rel === '' || rel.endsWith('/') ? `${rel}index.md` : `${rel}.md`
}

// 'devices/connect-computer.md' (relativePath from VitePress) -> '/devices/connect-computer'
export function linkFromRelativePath(relativePath: string): string {
  return '/' + relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}
