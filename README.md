# filippozanardo.com

Sito professionale bilingue in HTML statico e CSS. Cloudflare Workers Static Assets serve la directory `public/`.

## Build e anteprima locale

Dalla radice del repository, con Node.js:

```sh
node scripts/build.mjs
WRANGLER_SEND_METRICS=false npx wrangler dev --local --ip 127.0.0.1 --port 8766
```

La build genera le dieci pagine HTML e la sitemap in `public/`, senza pacchetti npm. Gli output sono versionati insieme alle sorgenti. Wrangler è lo strumento di anteprima locale e replica sia gli URL senza estensione sia i redirect di produzione.

## Contenuti

- `content/it.mjs` e `content/en.mjs` contengono testi e metadati delle cinque pagine per lingua.
- `content/projects.json` alimenta i progetti selezionati e l’archivio nella pagina Esperienza. Feesbee è il caso presentato in homepage in entrambe le lingue.
- `scripts/build.mjs` contiene i percorsi, i template condivisi e la generazione di metadata, dati strutturati e sitemap. Rigenera gli output dopo ogni modifica alle sorgenti.
- `public/_redirects` contiene i redirect 301 delle vecchie URL italiane. I vecchi frammenti della home sono ancora raggiungibili.

| Italiano | Inglese |
| --- | --- |
| `/` | `/en` |
| `/sviluppo-software` | `/en/software-development` |
| `/consulenza-tecnica` | `/en/technical-consulting` |
| `/collaborazioni-agenzie` | `/en/agency-collaborations` |
| `/esperienza` | `/en/experience` |
| `/#contatti` | `/en#contact` |

## CV e contatti

I link nella pagina Esperienza scaricano il PDF in lingua da `public/cv/`. La build verifica la presenza e la firma dei due file.

La sezione Contatti mostra l’indirizzo email e lo collega al client di posta tramite `mailto:`.

## Controlli

```sh
node --check scripts/build.mjs
node scripts/build.mjs
git diff --check
```
