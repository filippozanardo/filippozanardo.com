# filippozanardo.com

Personal one-page website in English, using semantic HTML, responsive CSS and minimal vanilla JavaScript. No dependencies or build step.

## Local preview

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory public
```

Open http://127.0.0.1:8765.

## Files

- `public/index.html`: content, navigation and metadata.
- `public/styles.css`: responsive layout, focus states and reduced-motion support.
- `public/site.js`: optional CV availability check.
- `wrangler.jsonc`: existing Cloudflare Workers Static Assets configuration, serving `public`. Deployment configuration is unchanged; this implementation has not been published.

## CV and contacts

The English page downloads `public/cv/Filippo_Zanardo_CV.pdf`; the Italian page downloads `public/cv/Filippo_Zanardo_CV_IT.pdf`. Both hero and contact download links use the page language. Keep these filenames when replacing the PDFs, or update the paths in `public/site.js`.

Download links appear after a successful response with the `application/pdf` content type, avoiding broken links if an asset host returns HTML for a missing file. Without JavaScript, the optional download links stay hidden.

Email, LinkedIn, GitHub and the Feesbee URL were supplied by Filippo. The contact section works without JavaScript.

## Checks

```sh
node --check public/site.js
git diff --check
```

Browser checks performed in Chrome at 1440, 390 and 320 px: no horizontal overflow, valid section anchors, hidden unavailable CV, working keyboard skip link, reduced-motion scrolling and no JavaScript errors. Desktop and mobile full-page screenshots were visually reviewed.

## Languages

English remains at `/`; the Italian version is at `/it/`. Both pages share CSS and JavaScript, include an EN / IT navigation and declare canonical and alternate language URLs. Update both HTML files when changing content. Language selection uses ordinary links and works without JavaScript.

The Italian page was also checked visually on desktop and mobile, with browser checks at 1440, 390 and 320 px.
