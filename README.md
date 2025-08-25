# Schedule-Max

A **lightweight, installable PWA** for planning *Today* and *Tomorrow* with zero back-end and a delightfully touch-friendly UI.

## ✨ Key features

- **Responsive mobile layout** with safe-area padding for notched phones and one-hand reach.
- **Dark-mode toggle** (saved in `localStorage`) and smooth SVG icon swap.
- **Today / Tomorrow boards** plus an overlay preview for tomorrow.
- **Custom infinite-scroll wheel time-picker**—no `<input type="time">`.
- iOS-style **swipe actions** (archive → missed, delete) and large checkbox hit-zones.
- **Weekly templates** pre-seed the next 7 days; tweak one JS object to change.
- All data stored locally under `scheduleMax.v2`; *no accounts, no network latency*.
- 100% **vanilla HTML + CSS + JS**—deploy anywhere a static file can live.


## 🗂️ Project structure

```
schedule-max/
├─ index.html           # full app (HTML, CSS, JS)
└─ src/
   ├─ icon.png          # homescreen / social images
   └─ manifest.json     # PWA manifest
```


## 🚀 Quick start

1. Clone or download the folder.
2. Open `index.html` in any modern browser.
    - Tap **+** (FAB) → choose day → set times → add tasks.
    - Swipe left on a row for **Archive / Delete**.
3. Optional: push to Cloudflare Pages (or Netlify, Vercel, GitHub Pages).
– No build step; root is the folder containing `index.html`.

## ⚙️ Local development

```bash
# Serve with live-reload (optional)
npx serve schedule-max   # or any static server
```


## 🛠️ Customization tips

| What you want | Where to edit |
| :-- | :-- |
| Default weekly plan | `WEEKLY_TEMPLATES` object (JS) |
| Colors, radius, animation speed | CSS variables in `:root` |
| Swipe width / actions | `--swipe-width` var and `.row-actions` buttons |
| Storage key/version | `STORAGE_KEY` constant |

## 🚧 Known limitations

- Pure `localStorage` → **no multi-device sync**.
- Assumes device local time zone; cross-zone shifts not handled.
- Single-user; no auth or cloud backup (by design).


## 📜 License

MIT — use, fork, remix.

Made with ❤️ to keep daily planning **fast, private, and distraction-free**.
