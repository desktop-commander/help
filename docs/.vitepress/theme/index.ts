import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ArticleList from './ArticleList.vue'
import PrivacyLinks from './PrivacyLinks.vue'
import RelatedArticles from './RelatedArticles.vue'
import { setupAnalytics } from './analytics'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // "Related articles" from the frontmatter, at the end of every article
      'doc-footer-before': () => h(RelatedArticles),
      // Privacy and cookie settings links at the bottom of the sidebar
      'sidebar-nav-after': () => h(PrivacyLinks),
    }),
  enhanceApp({ app, router }) {
    // <ArticleList /> can be used in any Markdown page
    app.component('ArticleList', ArticleList)
    // Help center events for Google Analytics (see analytics.ts)
    setupAnalytics(router)
  },
} satisfies Theme
