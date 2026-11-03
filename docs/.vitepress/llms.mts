// Writes files for AI tools after the build (see https://llmstxt.org):
// - llms.txt: an index of every page, with links to Markdown copies
// - llms-full.txt: every page in one file
// - a Markdown copy of every page, next to its HTML (for example devices/connect-computer.md)
import fs from 'node:fs'
import path from 'node:path'
import {
  CATEGORIES,
  SITE_DESCRIPTION,
  SITE_TITLE,
  allPages,
  markdownPath,
  pageUrl,
  sectionArticles,
  type Page,
} from './content.mts'

const ABOUT =
  'Desktop Commander gives AI apps access to your computer: files, terminal commands and search. ' +
  'Desktop Commander Remote connects ChatGPT, Claude and other AI apps to your computers and servers. ' +
  'Desktop Commander (local MCP) is free and open source and runs on your computer inside Claude Desktop, Claude Code, Cursor and other MCP clients. ' +
  'Every page below is also available as Markdown.'

export function writeLlmsFiles(outDir: string) {
  const pages = allPages()
  const titles = Object.fromEntries(pages.map((p) => [p.link, p.title]))

  const copies = pages.map((page) => {
    const markdown = toMarkdown(page, titles)
    const target = path.join(outDir, markdownPath(page.link))
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, markdown)
    return markdown
  })

  const index = [`# ${SITE_TITLE}`, '', `> ${SITE_DESCRIPTION}`, '', ABOUT, '']
  for (const { dir, text } of CATEGORIES) {
    const articles = sectionArticles(dir)
    const section = pages.find((p) => p.link === `/${dir}/`)
    const items = articles.length ? articles : section ? [section] : []
    if (!items.length) continue
    index.push(`## ${text}`, '', ...items.map((p) => `- [${p.title}](${pageUrl(markdownPath(p.link))}): ${p.description}`), '')
  }
  index.push('## Optional', '', `- [All pages in one file](${pageUrl('/llms-full.txt')})`, '')

  fs.writeFileSync(path.join(outDir, 'llms.txt'), index.join('\n'))
  fs.writeFileSync(path.join(outDir, 'llms-full.txt'), copies.join('\n\n---\n\n'))
}

function toMarkdown(page: Page, titles: Record<string, string>): string {
  let body = page.body
    .replace(/<!--[\s\S]*?-->\n?/g, '') // notes for editors
    .replace(/^#\s+.+\r?\n/m, '') // the title is added below
    .replace(/<ArticleList\s*\/>/g, () => articleList(page)) // section pages
    .replace(/\]\((\/[^)\s]*)\)/g, (_, link) => `](${pageUrl(link)})`) // links to other pages
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  const related = page.related.map((link) => `- [${titles[link] ?? link}](${pageUrl(link)})`)
  const parts = [`# ${page.title}`, '']
  // Skip the summary when the page already starts with the same sentence
  if (page.description && !body.startsWith(page.description)) parts.push(`> ${page.description}`, '')
  parts.push(`Source: ${pageUrl(page.link)}`, '', body, '')
  if (related.length) parts.push('## Related articles', '', ...related, '')
  return parts.join('\n')
}

function articleList(page: Page): string {
  const dir = page.link === '/' ? 'getting-started' : page.link.replace(/^\/|\/$/g, '')
  const articles = sectionArticles(dir)
  if (!articles.length) return 'Articles for this section are being written.'
  return articles.map((p) => `- [${p.title}](${p.link}): ${p.description}`).join('\n')
}
