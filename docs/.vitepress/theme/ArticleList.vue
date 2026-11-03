<script setup lang="ts">
// Lists the articles of the current section (taken from the sidebar).
// Used on each section page as <ArticleList />.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { theme, page } = useData()

const items = computed(() => {
  const rel = page.value.relativePath
  const section = rel === 'index.md' ? '/' : '/' + rel.replace(/index\.md$/, '')
  const groups = (theme.value.sidebar ?? []) as { link?: string; items?: any[] }[]
  return groups.find((g) => g.link === section)?.items ?? []
})
</script>

<template>
  <ul v-if="items.length" class="article-list">
    <li v-for="item in items" :key="item.link">
      <a :href="withBase(item.link)">{{ item.title ?? item.text }}</a>
      <span v-if="item.description">{{ item.description }}</span>
    </li>
  </ul>
  <div v-else class="info custom-block">
    <p class="custom-block-title">Coming soon</p>
    <p>Articles for this section are being written.</p>
  </div>
</template>

<style scoped>
.article-list {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  border-top: 1px solid var(--vp-c-divider);
}

.article-list li {
  margin: 0;
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.article-list a {
  display: block;
  font-weight: 600;
  text-decoration: none;
  color: var(--vp-c-brand-1);
}

.article-list a:hover {
  text-decoration: underline;
}

.article-list span {
  display: block;
  margin-top: 4px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
