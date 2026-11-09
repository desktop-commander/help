// Help center events for Google Analytics.
//
// Google Analytics itself is added to the built pages in config.mts, behind the
// same cookie banner as desktopcommander.app. Page views, outbound link clicks
// and scrolling are recorded by Google Analytics automatically. This file adds
// the events that are specific to the help center:
//
//   search               a search the visitor paused on (search_term)
//   search_no_results    the same, when nothing was found (search_term)
//   search_result_click  a search result was opened (search_term, link_url)
//   related_article_click  a link under "Related articles" (link_url, link_text)
//   copy_code            a code block was copied (code_language, code_snippet)
//   file_download        a setup script was downloaded, like the Windows .cmd
//                        (file_name, file_extension, link_url, link_text)
//   page_not_found       a visitor landed on a page that doesn't exist
//
// Nothing is sent before the visitor accepts statistics cookies, and nothing
// is sent from npm run dev or the GitHub Pages test copy.
// To see the events in the browser console on any copy of the site, run
//   localStorage.setItem('analytics-debug', '1')
// in the console and reload.

import { nextTick } from 'vue'
import type { Router } from 'vitepress'

type Params = Record<string, string>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Events wait here until Google Analytics has loaded (after cookie consent)
const pending: [string, Params][] = []

// The page the visitor is on, updated after every page change. Events use it
// rather than the address bar, because when a link is clicked the address bar
// already shows the next page before the click reaches this code.
let currentPage: { url: string; title: string } | undefined

export function track(name: string, eventParams: Params = {}) {
  const page = currentPage ?? { url: location.href, title: document.title }
  const params = { page_location: page.url, page_title: page.title, ...eventParams }
  if (debug()) console.info('[analytics]', name, eventParams)
  if (typeof window.gtag === 'function') window.gtag('event', name, params)
  else if (pending.length < 20) pending.push([name, params])
}

function flush() {
  if (typeof window.gtag !== 'function') return false
  for (const [name, params] of pending.splice(0)) window.gtag('event', name, params)
  return true
}

// After consent the cookie banner turns on the Google Analytics scripts.
// Wait for them (up to 5 seconds), then send what was waiting.
function flushWhenReady() {
  let tries = 0
  const timer = setInterval(() => {
    if (flush() || ++tries > 25) clearInterval(timer)
  }, 200)
}

function debug() {
  try {
    return localStorage.getItem('analytics-debug') === '1'
  } catch {
    return false
  }
}

// Search terms are free text: lower case, no email addresses or long numbers,
// and at most 100 characters (the Google Analytics limit)
function cleanTerm(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\S+@\S+/g, '[email]')
    .replace(/\d{6,}/g, '[number]')
    .slice(0, 100)
}

function setupSearch() {
  let timer: ReturnType<typeof setTimeout> | undefined
  let typed = ''
  let lastSent = ''

  const searchBox = () => document.querySelector('.VPLocalSearchBox')

  function sendSearch() {
    clearTimeout(timer)
    timer = undefined
    if (typed.length < 2 || typed === lastSent) return
    lastSent = typed
    track('search', { search_term: typed })
    if (searchBox()?.querySelector('.no-results')) track('search_no_results', { search_term: typed })
  }

  function openResult(result: HTMLAnchorElement) {
    sendSearch()
    track('search_result_click', { search_term: typed, link_url: result.href })
  }

  // Count a search once the visitor stops typing for a moment
  document.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement
    if (input.id !== 'localsearch-input') return
    typed = cleanTerm(input.value)
    clearTimeout(timer)
    timer = setTimeout(sendSearch, 1200)
  })

  document.addEventListener(
    'click',
    (e) => {
      const result = (e.target as Element).closest?.('.VPLocalSearchBox a.result')
      if (result) openResult(result as HTMLAnchorElement)
    },
    true,
  )

  document.addEventListener(
    'keydown',
    (e) => {
      if ((e.target as HTMLElement).id !== 'localsearch-input') return
      if (e.key === 'Enter') {
        const result = searchBox()?.querySelector('a.result.selected')
        if (result) openResult(result as HTMLAnchorElement)
      } else if (e.key === 'Escape') {
        sendSearch()
      }
    },
    true,
  )
}

function codeBlockDetails(block: Element) {
  const language = [...block.classList].find((c) => c.startsWith('language-'))?.slice('language-'.length) ?? ''
  const firstLine = block.querySelector('pre code')?.textContent?.trim().split('\n')[0] ?? ''
  return { code_language: language, code_snippet: firstLine.slice(0, 100) }
}

function setupClicks() {
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element
      if (!target.closest) return

      // Copy button on a code block
      const copyButton = target.closest('div[class*="language-"] > button.copy')
      if (copyButton?.parentElement) {
        track('copy_code', codeBlockDetails(copyButton.parentElement))
        return
      }

      const link = target.closest('a[href]') as HTMLAnchorElement | null
      if (!link) return

      if (link.closest('.related-articles')) {
        track('related_article_click', { link_url: link.href, link_text: link.textContent?.trim() ?? '' })
        return
      }

      // Setup scripts. Google Analytics only records common file types itself.
      const file = new URL(link.href).pathname.split('/').pop() ?? ''
      const extension = file.match(/\.(cmd|bat|ps1|sh|command)$/i)?.[1]
      if (extension) {
        track('file_download', {
          file_name: file,
          file_extension: extension.toLowerCase(),
          link_url: link.href,
          link_text: link.textContent?.trim() ?? '',
        })
      }
    },
    true,
  )

  // Code copied by selecting it instead of using the copy button
  document.addEventListener('copy', () => {
    const node = document.getSelection()?.anchorNode
    const element = node instanceof Element ? node : node?.parentElement
    const block = element?.closest('div[class*="language-"]')
    if (block) track('copy_code', codeBlockDetails(block))
  })
}

export function setupAnalytics(router: Router) {
  if (typeof window === 'undefined') return

  window.addEventListener('CookiebotOnAccept', flushWhenReady)
  window.addEventListener('CookiebotOnDecline', () => pending.splice(0))

  setupSearch()
  setupClicks()

  // Runs on the first page load and after every page change
  const previous = router.onAfterRouteChange
  router.onAfterRouteChange = async (to) => {
    await previous?.(to)
    await nextTick() // the page title is updated by then
    currentPage = { url: location.href, title: document.title }
    if (router.route.data.isNotFound) track('page_not_found')
  }
}
