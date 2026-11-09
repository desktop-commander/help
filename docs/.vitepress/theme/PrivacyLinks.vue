<script setup lang="ts">
// "Privacy" and "Cookie settings" at the bottom of the sidebar. The cookie
// settings link only shows when the cookie banner is on the page, which is the
// built site on desktopcommander.app (not npm run dev or the test copy).
import { onMounted, ref } from 'vue'

type Cookiebot = { renew?: () => void }
// window.Cookiebot is the <script id="Cookiebot"> tag until the banner has loaded
const cookiebot = () => (window as unknown as { Cookiebot?: Cookiebot }).Cookiebot
const openCookieSettings = () => {
  const banner = cookiebot()
  if (typeof banner?.renew === 'function') banner.renew()
}

const hasCookieBanner = ref(false)

onMounted(() => {
  const check = () => (hasCookieBanner.value = typeof cookiebot()?.renew === 'function')
  check()
  window.addEventListener('CookiebotOnLoad', check)
})
</script>

<template>
  <div class="privacy-links">
    <a href="https://legal.desktopcommander.app" target="_blank" rel="noopener">Privacy</a>
    <template v-if="hasCookieBanner">
      <span aria-hidden="true">·</span>
      <button type="button" @click="openCookieSettings">Cookie settings</button>
    </template>
  </div>
</template>

<style scoped>
.privacy-links {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 24px;
  padding: 16px 0 24px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 12px;
  line-height: 20px;
  color: var(--vp-c-text-3);
}

.privacy-links a,
.privacy-links button {
  color: var(--vp-c-text-2);
  font-size: inherit;
  text-decoration: none;
}

.privacy-links a:hover,
.privacy-links button:hover {
  color: var(--vp-c-brand-1);
}
</style>
