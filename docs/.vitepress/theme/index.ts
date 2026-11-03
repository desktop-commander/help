import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ArticleList from './ArticleList.vue'
import RelatedArticles from './RelatedArticles.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  // "Related articles" from the frontmatter, at the end of every article
  Layout: () => h(DefaultTheme.Layout, null, { 'doc-footer-before': () => h(RelatedArticles) }),
  enhanceApp({ app }) {
    // <ArticleList /> can be used in any Markdown page
    app.component('ArticleList', ArticleList)
  },
} satisfies Theme
