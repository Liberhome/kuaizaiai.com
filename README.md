# kuaizaiai.com

Corporate website for **快哉智能（澄迈）科技有限责任公司** / Kuaizai Intelligence (Chengmai) Technology Co., Ltd.

Static site deployed via GitHub Pages, served at https://kuaizaiai.com.

## Stack

Plain HTML + CSS + a tiny vanilla JS language switcher. No build step.

## Files

- `index.html` — Home (hero, about, services, contact)
- `privacy.html` — Privacy Policy (CN/EN)
- `terms.html` — Terms of Service (CN/EN)
- `styles.css` — Shared styles
- `script.js` — Bilingual switcher (zh-CN default, EN/中 toggle in header)
- `CNAME` — GitHub Pages custom domain
- `.nojekyll` — Disable Jekyll processing

## Local preview

```bash
open index.html
```

## Deploy

Push to the `main` branch of the GitHub repo with Pages enabled and custom domain `kuaizaiai.com`.
