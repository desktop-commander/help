<script setup lang="ts">
// Shows the "related" links from an article's frontmatter at the end of the page.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter, theme } = useData()

const items = computed(() => {
  const related = (frontmatter.value.related ?? []) as string[]
  const titles = (theme.value.pageTitles ?? {}) as Record<string, string>
  return related.map((link) => ({ link, title: titles[link] ?? link }))
})
</script>

<template>
  <section v-if="items.length" class="related-articles">
    <h2>Related articles</h2>
    <ul>
      <li v-for="item in items" :key="item.link">
        <a :href="withBase(item.link)">{{ item.title }}</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.related-articles {
  margin: 48px 0 32px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.related-articles h2 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

.related-articles ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.related-articles li {
  margin: 0;
  padding: 4px 0;
}

.related-articles a {
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.related-articles a:hover {
  text-decoration: underline;
}
</style>
