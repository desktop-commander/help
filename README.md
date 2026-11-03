# Desktop Commander Help

The Desktop Commander help center, built with [VitePress](https://vitepress.dev). It will be served at [desktopcommander.app/help](https://desktopcommander.app/help).

Articles are plain Markdown files in `docs/`. Found a mistake or something missing? Open an issue or a pull request.

## Run it on your computer

You need Node.js 18 or newer.

```bash
npm install      # first time only
npm run dev      # starts the site
```

Then open http://localhost:5173/help/ in your browser. Pages reload as you save them.

A new article file shows up in the sidebar after you restart `npm run dev`.

## Check before you push

```bash
npm run build    # fails if a link points to a page that doesn't exist
npm run preview  # shows the built site at http://localhost:4173/help/
```

## Folders

| Path | What it is |
| --- | --- |
| `docs/index.md` | Home page, which is also the Getting started page |
| `docs/<category>/index.md` | Category page, one per sidebar section (except Getting started) |
| `docs/<category>/<article>.md` | Articles |
| `docs/public/` | Logos, favicons and images (`docs/public/images/<category>/`) |
| `docs/.vitepress/config.mts` | Site settings, navigation and sidebar sections |
| `docs/.vitepress/theme/custom.css` | Brand colors |
| `templates/article.md` | Copy this to start a new article |
