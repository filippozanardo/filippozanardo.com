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

## Add the real CV and contacts

The contact email `zanardo.filippo@gmail.com` and LinkedIn profile `https://www.linkedin.com/in/filippo-zanardo-43a0299/` and GitHub profile `https://github.com/filippozanardo` were supplied by Filippo. The Feesbee project links to `https://feesbee.com`, supplied by Filippo. No CV is available.

Place the actual CV PDF in `public` and set `cvPath` in `public/site.js` to its absolute site path. Download links appear only after a successful response with the `application/pdf` content type. This avoids exposing a broken link when an asset host returns HTML for a missing file. Without JavaScript, the page remains readable and the optional CV stays hidden.

The contact section and navigation link are always visible and work without JavaScript. Add any further verified contact details to `#contact-actions`; do not add placeholder links.

Project and collaboration names are supplied by the site brief. No additional roles, results, client relationships or metrics have been inferred for the collaborations list.

## Checks

```sh
node --check public/site.js
git diff --check
```

Browser checks performed in Chrome at 1440, 390 and 320 px: no horizontal overflow, valid section anchors, hidden unavailable CV, working keyboard skip link, reduced-motion scrolling and no JavaScript errors. Desktop and mobile full-page screenshots were visually reviewed.

## Languages

English remains at `/`; the Italian version is at `/it/`. Both pages share CSS and JavaScript, include an EN / IT navigation and declare canonical and alternate language URLs. Update both HTML files when changing content. Language selection uses ordinary links and works without JavaScript.

The Italian page was also checked visually on desktop and mobile, with browser checks at 1440, 390 and 320 px.
