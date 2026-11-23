import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import it from '../content/it.mjs';
import en from '../content/en.mjs';

const output = new URL('../public/', import.meta.url);
const projects = JSON.parse(await readFile(new URL('../content/projects.json', import.meta.url), 'utf8'));
const site = 'https://filippozanardo.com';
const email = 'zanardo.filippo@gmail.com';
const linkedin = 'https://www.linkedin.com/in/filippo-zanardo-43a0299/';
const github = 'https://github.com/filippozanardo';
const keys = ['home', 'development', 'consulting', 'agency', 'experience'];
const paths = {
  it: ['/', '/sviluppo-software', '/consulenza-tecnica', '/collaborazioni-agenzie', '/esperienza'],
  en: ['/en', '/en/software-development', '/en/technical-consulting', '/en/agency-collaborations', '/en/experience'],
};
const locales = { it: 'it_IT', en: 'en_GB' };
const cvFiles = { it: 'Filippo_Zanardo_CV_IT.pdf', en: 'Filippo_Zanardo_CV.pdf' };
const featured = projects.find(project => project.id === 'feesbee');
const stack = ['Laravel', 'FilamentPHP', 'PostgreSQL', 'Stripe'];

function escape(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

function link(href, label, className = '') {
  return `<a${className ? ` class="${className}"` : ''} href="${escape(href)}">${escape(label)}</a>`;
}

function contactURL(lang) {
  return `${paths[lang][0]}#${lang === 'it' ? 'contatti' : 'contact'}`;
}

function alternates(index, tag) {
  const variants = { it: paths.it[index], en: paths.en[index], 'x-default': paths.it[index] };
  return Object.entries(variants)
    .map(([lang, path]) => `<${tag} rel="alternate" hreflang="${lang}" href="${site}${path}"${tag === 'link' ? '>' : ' />'}`)
    .join(tag === 'link' ? '\n  ' : '\n    ');
}

function layout(lang, copy, index, content) {
  const key = keys[index];
  const page = copy[key];
  const url = site + paths[lang][index];
  const alternateLang = lang === 'it' ? 'en' : 'it';
  const profile = key === 'home' || key === 'experience';
  const person = {
    '@type': 'Person',
    '@id': site + '/#person',
    name: 'Filippo Zanardo',
    url: site + '/',
    jobTitle: 'Senior Full Stack Developer · PHP / Laravel',
    sameAs: [linkedin, github],
  };
  const structured = {
    '@context': 'https://schema.org',
    '@type': profile ? 'ProfilePage' : 'WebPage',
    url,
    name: page.title,
    description: page.description,
    inLanguage: lang,
    mainEntity: profile ? person : {
      '@type': 'Service',
      name: page.label,
      description: page.description,
      provider: person,
    },
  };
  const nav = [...paths[lang], contactURL(lang)].map((path, i) =>
    `<a href="${path}"${i === index ? ' aria-current="page"' : ''}>${escape(copy.nav[i])}</a>`).join('');
  const languages = Object.keys(paths).map(code => {
    const abbreviation = code.toUpperCase();
    const name = code === 'it' ? 'Italiano' : 'English';
    return `<a href="${paths[code][index]}" lang="${code}" hreflang="${code}" aria-label="${abbreviation} · ${name}"${code === lang ? ' aria-current="page"' : ''}>${abbreviation}</a>`;
  }).join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f3f2ec">
  <title>${escape(page.title)}</title>
  <meta name="description" content="${escape(page.description)}">
  <link rel="canonical" href="${url}">
  ${alternates(index, 'link')}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
  <meta property="og:type" content="${profile ? 'profile' : 'website'}">
  <meta property="og:site_name" content="Filippo Zanardo">
  <meta property="og:title" content="${escape(page.title)}">
  <meta property="og:description" content="${escape(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="${locales[lang]}">
  <meta property="og:locale:alternate" content="${locales[alternateLang]}">
  <meta property="og:image" content="${site}/social-preview.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Filippo Zanardo · Senior Full Stack Developer · PHP / Laravel">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(page.title)}">
  <meta name="twitter:description" content="${escape(page.description)}">
  <script type="application/ld+json">${JSON.stringify(structured).replace(/</g, '\\u003c')}</script>
</head>
<body id="top">
  ${link('#main', copy.skip, 'skip-link')}
  <header class="wrap site-header">
    <a class="wordmark" href="${paths[lang][0]}">Filippo Zanardo<span aria-hidden="true">.</span></a>
    <nav class="main-nav" aria-label="${copy.navLabel}">${nav}</nav>
    <div class="header-actions">
      <nav class="languages" aria-label="${copy.language}">${languages}</nav>
      ${link(contactURL(lang), copy.write, 'button button-small')}
    </div>
  </header>
  <main id="main" tabindex="-1">
    ${content}
  </main>
  <footer class="wrap site-footer">
    <a class="wordmark" href="${paths[lang][0]}">Filippo Zanardo<span aria-hidden="true">.</span></a>
    <p>${copy.location}</p>
    ${link('#top', copy.back, 'text-link')}
  </footer>
</body>
</html>
`;
}

function rows(items, className = 'rows') {
  return `<ul class="${className}" role="list">${items.map(([title, description, action]) => {
    const body = Array.isArray(description)
      ? `<div>${description.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}</div>`
      : `<p>${escape(description)}</p>`;
    return `
      <li>
        <h3>${escape(title)}</h3>
        ${body}
        ${action ?? ''}
      </li>`;
  }).join('')}
    </ul>`;
}

function feesbee(copy, heading = 'h2') {
  const project = copy.feesbee;
  return `<article class="case-study">
      <${heading}>${project.name} <span>${project.type}</span></${heading}>
      <div>
        <p class="case-role">${project.role}</p>
        <p>${project.description}</p>
        <ul class="stack" role="list">${stack.map(item => `<li>${item}</li>`).join('')}</ul>
        ${link(featured.url, project.visit, 'text-link')}
      </div>
    </article>`;
}

function contact(lang, copy) {
  const c = copy.contact;
  const id = lang === 'it' ? 'contatti' : 'contact';
  return `<section id="${id}" class="contact-section dark-section" tabindex="-1" aria-labelledby="contact-title">
    ${lang === 'it' ? '<span class="fragment" id="contact"></span>' : ''}
    <div class="wrap contact-grid">
      <div>
        <p class="eyebrow">${copy.nav.at(-1)}</p>
        <h2 id="contact-title">${c.title}</h2>
        <p class="contact-intro">${c.description}</p>
      </div>
      <div class="contact-links">
        <a class="contact-email" id="contact-actions" href="mailto:${email}">
          <span class="contact-email-action">${escape(c.emailAction)}</span>
          <span class="contact-email-address">${escape(email)}</span>
        </a>
        ${link(github, 'GitHub', 'text-link')}
      </div>
    </div>
  </section>`;
}

function home(lang, copy) {
  const c = copy.home;
  const urls = paths[lang];
  const routeTargets = [urls[3], urls[4], contactURL(lang)];
  return `<section class="wrap hero">
    <p class="eyebrow hero-overline">Filippo Zanardo <span>·</span> Senior Full Stack Developer · PHP / Laravel</p>
    <h1>${c.h1[0]} <em>${c.h1[1]}</em></h1>
    <div class="hero-bottom">
      <div class="hero-intro">${c.intro.map(p => `<p>${p}</p>`).join('')}</div>
      <div>
        <div class="actions">
          ${link(contactURL(lang), c.cta, 'button')}
          ${link(urls[4], c.experience, 'text-link')}
        </div>
        <p class="availability">${c.availability}</p>
      </div>
    </div>
  </section>
  <section class="soft-section">
    <div class="wrap section audience">
      <h2>${c.routesTitle}</h2>
      ${rows(c.routes.map(([title, desc, action], i) =>
        [title, desc, link(routeTargets[i], action, 'text-link')]), 'rows audience-rows')}
    </div>
  </section>
  <section class="wrap section services">
    <h2>${c.servicesTitle}</h2>
    <div class="service-grid">
      ${c.services.map(([title, question, desc, action], i) => `<article class="service-panel${i === 0 ? ' dark-section' : ''}">
        <h3>${title}</h3>
        <p class="service-question">${question}</p>
        <p>${desc}</p>
        ${link(urls[i + 1], action, 'text-link')}
      </article>`).join('')}
    </div>
  </section>
  <section class="wrap section split-section ruled">
    <h2>${c.problemsTitle}</h2>
    ${rows(c.problems)}
  </section>
  <section id="about" class="dark-section">
    <div class="wrap section split-section evidence">
      <h2>${c.evidenceTitle}</h2>
      <div class="evidence-copy">
        ${c.evidence.map(paragraph => `<p>${escape(paragraph)}</p>`).join('\n        ')}
        ${link(urls[4], c.experience, 'text-link')}
      </div>
    </div>
  </section>
  <section class="wrap section" id="work">
    <p class="eyebrow">${c.caseLabel}</p>
    ${feesbee(copy)}
  </section>
  ${contact(lang, copy)}`;
}

function closing(lang, page) {
  return `<section class="dark-section">
    <div class="wrap section closing">
      <h2>${page.closing}</h2>
      ${link(contactURL(lang), page.cta, 'button')}
    </div>
  </section>`;
}

function service(lang, page, key) {
  return `<section class="wrap subhero">
    <p class="eyebrow hero-overline">${page.label}</p>
    <h1>${page.h1}</h1>
    <p class="lead">${page.intro}</p>
    ${key === 'agency' ? link(contactURL(lang), page.cta, 'button') : ''}
  </section>
  <section class="wrap section split-section ruled">
    <h2>${page.listTitle}</h2>
    ${rows(page.items)}
  </section>
  ${page.note ? `<aside class="soft-section"><div class="wrap section note">
    ${page.noteTitle ? `<h2>${page.noteTitle}</h2>` : ''}
    <p>${page.note}</p>
  </div></aside>` : ''}
  ${closing(lang, page)}`;
}

function experience(lang, copy) {
  const page = copy.experience;
  const selected = projects.filter(project => project.detail && project.id !== featured.id);
  const archive = projects.filter(project => !project.detail);
  return `<section class="wrap subhero">
    <h1>${page.h1}</h1>
    <p class="lead">${page.intro}</p>
    <div class="actions">
      <a class="button" href="/cv/${cvFiles[lang]}" download>${page.download}</a>
      ${link(github, 'GitHub', 'text-link')}
      ${link(linkedin, 'LinkedIn', 'text-link')}
    </div>
    <p class="availability">${page.availability}</p>
  </section>
  <section class="soft-section">
    <div class="wrap section split-section">
      <h2>${page.rolesTitle}</h2>
      <ul class="timeline" role="list">${page.roles.map(([date, role, detail]) => `
        <li><p class="period">${date}</p><div><h3>${role}</h3><p>${detail}</p></div></li>`).join('')}</ul>
    </div>
  </section>
  <section class="wrap section split-section">
    <h2>${page.skillsTitle}</h2>
    ${rows(page.skills)}
  </section>
  <section class="wrap section ruled" id="projects">
    <h2>${page.projectsTitle}</h2>
    ${feesbee(copy, 'h3')}
    <div class="project-grid">
      ${selected.map(project => {
        const content = project[lang];
        return `<article>
        <p class="eyebrow project-meta">${escape(project.year)} · ${escape(content.role)}</p>
        <h3>${escape(content.name)}</h3>
        <p>${escape(content.description)}</p>
        <p>${escape(content.work)}</p>
        <p class="project-stack">${escape(project.technologies.join(' · '))}</p>
        ${project.url ? link(project.url, `${page.visit} · ${content.name}`, 'text-link') : ''}
      </article>`;
      }).join('')}
    </div>
    <details class="project-archive">
      <summary>${page.archiveTitle}</summary>
      <ul role="list">${archive.map(project => `<li><span>${escape(project.year)}</span>
        <strong>${project.url ? link(project.url, project[lang].name, 'text-link') : escape(project[lang].name)}</strong>
        <span>${escape(project[lang].type)}</span></li>`).join('')}</ul>
    </details>
  </section>
  ${closing(lang, page)}`;
}

for (const file of Object.values(cvFiles)) {
  const pdf = await readFile(new URL('cv/' + file, output));
  if (pdf.subarray(0, 5).toString() !== '%PDF-') throw new Error('Invalid CV PDF: ' + file);
}

for (const [lang, copy] of Object.entries({ it, en })) {
  for (const [index, key] of keys.entries()) {
    const path = paths[lang][index];
    const file = new URL(path === '/' ? 'index.html' : path.slice(1) + '.html', output);
    const content = key === 'home' ? home(lang, copy)
      : key === 'experience' ? experience(lang, copy)
      : service(lang, copy[key], key);
    await mkdir(new URL('./', file), { recursive: true });
    await writeFile(file, layout(lang, copy, index, content).replace(/[ \t]+$/gm, ''));
  }
}

const entries = Object.values(paths).flatMap(list => list.map((path, index) => `  <url>
    <loc>${site}${path}</loc>
    ${alternates(index, 'xhtml:link')}
  </url>`));
await writeFile(new URL('sitemap.xml', output), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`);
await rm(new URL('it/index.html', output), { force: true });
console.log('Built 10 localized pages and sitemap in public/.');
