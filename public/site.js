// Select the real CV matching the page language.
// Never expose a download until the server confirms it is a PDF (Workers
// can return index.html for a missing path through their SPA fallback).
const cvPath = document.documentElement.lang === 'it'
  ? '/cv/Filippo_Zanardo_CV_IT.pdf'
  : '/cv/Filippo_Zanardo_CV.pdf';

async function enableCV(path) {
  if (!path) return;

  try {
    const response = await fetch(path, { method: 'HEAD' });

    if (
      !response.ok ||
      !response.headers.get('content-type')?.includes('application/pdf')
    ) {
      return;
    }

    document.querySelectorAll('[data-cv-link]').forEach((link) => {
      link.href = path;
      link.setAttribute('download', path.split('/').pop());
      link.hidden = false;
    });

    document.querySelector('#contact').hidden = false;
    document.querySelector('[data-contact-link]').hidden = false;
  } catch {
    // Keep the page complete and usable when the CV is unavailable.
  }
}

enableCV(cvPath);


// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------

const projects = [
  {
    id: 'feesbee',
    year: '2025',
    sortYear: 2025,
    pinned: true,
    featured: true,
    technologies: [
      'Laravel',
      'FilamentPHP',
      'PostgreSQL',
      'Livewire',
      'Tailwind CSS',
      'Stripe'
    ],
    image: null,
    url: 'https://feesbee.com',
    detail: true,

    en: {
      name: 'Feesbee',
      type: 'SaaS / Electronic invoicing',
      role: 'Co-founder & CTO',
      description:
        'A SaaS platform for electronic invoicing and everyday business administration, built from product idea to production.',
      work:
        'Product and technical decisions, software architecture and hands-on development across the platform.'
    },

    it: {
      name: 'Feesbee',
      type: 'SaaS / Fatturazione elettronica',
      role: 'Co-fondatore e CTO',
      description:
        'Una piattaforma SaaS per la fatturazione elettronica e la gestione amministrativa quotidiana, costruita dall’idea di prodotto fino alla produzione.',
      work:
        'Scelte di prodotto e tecniche, architettura software e sviluppo diretto della piattaforma.'
    }
  },

  {
    id: 'casa-blog',
    year: '2026',
    sortYear: 2026,
    featured: false,
    technologies: [
      'WordPress',
      'Custom Theme',
      'PHP',
      'JavaScript'
    ],
    image: null,
    url: null,
    detail: false,

    en: {
      name: 'Casa.it — Blog',
      type: 'Publishing platform'
    },

    it: {
      name: 'Casa.it — Blog',
      type: 'Piattaforma editoriale'
    }
  },

  {
    id: 'aifi',
    year: '2025 - 26',
    sortYear: 2025,
    featured: false,
    technologies: [
      'Laravel',
      'FilamentPHP',
      'MySQL',
      'Tailwind CSS'
    ],
    image: null,
    url: null,
    detail: false,

    en: {
      name: 'AIFI',
      type: 'Private business platforms'
    },

    it: {
      name: 'AIFI',
      type: 'Piattaforme business private'
    }
  },

  {
    id: 'poliform',
    year: '2025',
    sortYear: 2025,
    featured: true,
    technologies: [
      'WordPress',
      'Custom Theme',
      'PHP',
      'JavaScript',
      'Laravel',
      'MySQL'
    ],
    image: null,
    url: 'https://www.poliform.it/',
    detail: true,

    en: {
      name: 'Poliform',
      type: 'Corporate website & business platform',
      role: 'Lead Developer',
      description:
        'Two different digital products for the same brand: the corporate website and a custom Private Area, developed as a freelance collaborator for Socialidea.',
      work:
        'Custom WordPress development for the corporate website and development of a Laravel-based Private Area for business users.'
    },

    it: {
      name: 'Poliform',
      type: 'Sito corporate & piattaforma business',
      role: 'Lead Developer',
      description:
        'Due prodotti digitali diversi per lo stesso brand: il sito corporate e una Private Area custom, sviluppati come collaboratore freelance per Socialidea.',
      work:
        'Sviluppo WordPress custom del sito corporate e sviluppo di una Private Area basata su Laravel per gli utenti business.'
    }
  },

  {
    id: 'turri',
    year: '2024',
    sortYear: 2024,
    featured: false,
    technologies: [
      'WordPress',
      'Custom Theme',
      'PHP',
      'JavaScript'
    ],
    image: null,
    url: 'https://turri.it/',
    detail: false,

    en: {
      name: 'Turri',
      type: 'Corporate website'
    },

    it: {
      name: 'Turri',
      type: 'Sito corporate'
    }
  },

  {
    id: 'quantyca',
    year: '2023',
    sortYear: 2023,
    featured: false,
    technologies: [
      'WordPress',
      'Custom Theme',
      'PHP',
      'JavaScript'
    ],
    image: null,
    url: 'https://www.quantyca.it/',
    detail: false,

    en: {
      name: 'Quantyca',
      type: 'Corporate website'
    },

    it: {
      name: 'Quantyca',
      type: 'Sito corporate'
    }
  },

  {
    id: 'korian',
    year: '2022',
    sortYear: 2022,
    featured: false,
    technologies: [
      'WordPress',
      'Custom Theme',
      'PHP',
      'JavaScript'
    ],
    image: null,
    url: 'https://www.korian.it/',
    detail: false,

    en: {
      name: 'Korian',
      type: 'Corporate website'
    },

    it: {
      name: 'Korian',
      type: 'Sito corporate'
    }
  },

  {
    id: 'socialidea',
    year: '2021–25',
    sortYear: 2021,
    featured: false,
    technologies: [
      'WordPress',
      'Laravel',
      'PHP',
      'MySQL',
      'JavaScript'
    ],
    image: null,
    url: 'https://socialidea.it/',
    detail: false,

    en: {
      name: 'Socialidea',
      type: 'Freelance collaboration'
    },

    it: {
      name: 'Socialidea',
      type: 'Collaborazione freelance'
    }
  },

  {
    id: 'interactive-experiences',
    year: '2019–22',
    sortYear: 2019,
    featured: true,
    technologies: [
      'PHP',
      'JavaScript',
      'Vue',
      'React',
      'Media processing'
    ],
    image: null,
    url: '',
    detail: true,

    en: {
      name: 'Interactive Experiences',
      type: 'Event & brand experiences',
      role: 'Freelance Developer',
      description:
        'Interactive applications built for live events and brand activations while collaborating with Johannes Pics, including projects for brands such as Max Mara and Espolòn.',
      work:
        'Built event-driven applications ranging from photobooths and interactive experiences to custom video workflows, including an application that captured video, removed the background and composited it with another video.'
    },

    it: {
      name: 'Interactive Experiences',
      type: 'Event & brand experiences',
      role: 'Freelance Developer',
      description:
        'Applicazioni interattive sviluppate per eventi dal vivo e brand activation durante la collaborazione con Johannes Pics, inclusi progetti per brand come Max Mara ed Espolòn.',
      work:
        'Sviluppo di applicazioni per eventi, dai photobooth alle esperienze interattive fino a workflow video custom, inclusa un’applicazione che registrava video, rimuoveva lo sfondo e lo sostituiva componendolo con un altro video.'
    }
  },

  {
    id: 'bologna-fc',
    year: '2018',
    sortYear: 2018,
    featured: false,
    technologies: [
      'WordPress',
      'Custom Theme',
      'PHP',
      'JavaScript'
    ],
    image: null,
    url: 'https://www.bolognafc.it/',
    detail: false,

    en: {
      name: 'Bologna FC',
      type: 'Sports website'
    },

    it: {
      name: 'Bologna FC',
      type: 'Sito sportivo'
    }
  },

  {
    id: 'blossom',
    year: '2008–18',
    sortYear: 2008,
    featured: false,
    technologies: [
      'Laravel',
      'WordPress',
      'Custom Theme',
      'PHP',
      'JavaScript'
    ],
    image: null,
    url: 'https://blossom.it/it/',
    detail: false,

    en: {
      name: 'Blossom',
      type: 'Freelance collaboration'
    },

    it: {
      name: 'Blossom',
      type: 'Collaborazione freelance'
    }
  },

  {
    id: 'kpmg',
    year: '2007',
    sortYear: 2007,
    featured: false,
    technologies: [
      'Microsoft Access'
    ],
    image: null,
    url: null,
    detail: false,

    en: {
      name: 'KPMG',
      type: 'Financial application'
    },

    it: {
      name: 'KPMG',
      type: 'Applicazione finanziaria'
    }
  }
];


// -----------------------------------------------------------------------------
// Project rendering
// -----------------------------------------------------------------------------

const language = document.documentElement.lang === 'it' ? 'it' : 'en';
const featuredWork = document.querySelector('[data-featured-work]');
const projectIndex = document.querySelector('[data-project-index]');
const projectDialog = document.querySelector('.project-dialog');

let previousFocus;
let previousOverflow;


function setProjectText(selector, value) {
  const element = projectDialog.querySelector(selector);

  element.hidden = !value;
  element.textContent = value ?? '';
}


function openProject(project) {
  if (!project.detail) return;

  const content = project[language];

  projectDialog.querySelector('[data-project-year-wrap]').hidden = !project.year;

  setProjectText('[data-project-year]', project.year);
  setProjectText('[data-project-title]', content.name);
  setProjectText('[data-project-description]', content.description);

  if (content.description) {
    projectDialog.setAttribute(
      'aria-describedby',
      'project-dialog-description'
    );
  } else {
    projectDialog.removeAttribute('aria-describedby');
  }

  for (const field of ['role', 'work']) {
    const fact = projectDialog
      .querySelector(`[data-project-${field}]`)
      .parentElement;

    fact.hidden = !content[field];

    setProjectText(
      `[data-project-${field}]`,
      content[field]
    );
  }

  projectDialog
    .querySelector('[data-project-technologies]')
    .parentElement
    .hidden = !project.technologies.length;

  setProjectText(
    '[data-project-technologies]',
    project.technologies.join(' · ')
  );

  projectDialog.querySelector('.project-facts').hidden =
    !content.role &&
    !content.work &&
    !project.technologies.length;


  const link = projectDialog.querySelector('[data-project-url]');

  link.hidden = !project.url;

  if (project.url) {
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.removeAttribute('href');
    link.removeAttribute('target');
    link.removeAttribute('rel');
  }


  const image = projectDialog.querySelector('[data-project-image]');

  image.hidden = !project.image;

  if (project.image) {
    image.src = project.image.src;
    image.alt = project.image.alt[language];
  } else {
    image.removeAttribute('src');
    image.alt = '';
  }


  previousFocus = document.activeElement;
  previousOverflow = document.body.style.overflow;

  document.body.style.overflow = 'hidden';

  projectDialog.showModal();

  projectDialog
    .querySelector('[data-dialog-close]')
    .focus();
}


function makeText(tag, className, value) {
  const element = document.createElement(tag);

  element.className = className;
  element.textContent = value;

  return element;
}


function makeDetailButton(project, className, label, symbol) {
  const button = document.createElement('button');

  button.className = className;
  button.type = 'button';

  button.setAttribute(
    'aria-label',
    `${label} ${project[language].name}`
  );

  button.append(
    makeText('span', '', symbol)
  );

  button
    .querySelector('span')
    .setAttribute('aria-hidden', 'true');

  button.addEventListener(
    'click',
    () => openProject(project)
  );

  return button;
}


if (featuredWork && projectIndex && projectDialog) {
  const labels = language === 'it'
    ? {
        detail: 'Apri i dettagli di',
        view: 'Vedi progetto',
        visit: 'Visita il sito'
      }
    : {
        detail: 'Open details for',
        view: 'View project',
        visit: 'Visit site'
      };


  // ---------------------------------------------------------------------------
  // Featured projects
  // ---------------------------------------------------------------------------

  projects
    .filter((project) => project.featured)
    .forEach((project, position) => {
      const content = project[language];

      const item = document.createElement('li');

      item.className = 'featured-project';
      item.dataset.project = project.id;


      const meta = document.createElement('div');

      meta.className = 'featured-meta';

      meta.append(
        makeText(
          'span',
          'index',
          `01.${position + 1}`
        )
      );

      if (content.type) {
        meta.append(
          makeText(
            'span',
            'eyebrow',
            content.type
          )
        );
      }


      const body = document.createElement('div');

      body.className = 'featured-body';

      body.append(
        makeText(
          'h4',
          'featured-name',
          content.name
        )
      );


      if (content.description) {
        body.append(
          makeText(
            'p',
            'featured-description',
            content.description
          )
        );
      }


      if (project.technologies.length) {
        body.append(
          makeText(
            'p',
            'featured-technologies',
            project.technologies.join(' · ')
          )
        );
      }


      if (content.role) {
        body.append(
          makeText(
            'p',
            'featured-role',
            content.role
          )
        );
      }


      if (project.detail) {
        const button = makeDetailButton(
          project,
          'featured-link text-link',
          labels.detail,
          '↗'
        );

        button.prepend(
          document.createTextNode(
            `${labels.view} `
          )
        );

        body.append(button);
      } else if (project.url) {
        const link = makeText(
          'a',
          'featured-link text-link',
          `${labels.visit} ↗`
        );

        link.href = project.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        body.append(link);
      }


      item.append(meta, body);


      if (project.image?.src) {
        const image = document.createElement('img');

        image.className = 'featured-image';
        image.src = project.image.src;
        image.alt =
          project.image.alt?.[language] ?? '';

        image.loading = 'lazy';

        item.append(image);
      }


      featuredWork.append(item);
    });


  // ---------------------------------------------------------------------------
  // Project index
  //
  // Feesbee is intentionally pinned first.
  // Everything else is sorted by year.
  // ---------------------------------------------------------------------------

  [...projects]
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      return (b.sortYear ?? 0) - (a.sortYear ?? 0);
    })
    .forEach((project) => {
      const content = project[language];

      const row = document.createElement('li');

      row.className = 'project-row';
      row.dataset.project = project.id;


      for (const [field, value] of [
        ['year', project.year],
        ['name', content.name],
        ['type', content.type],
        [
          'technologies',
          project.technologies.join(' · ')
        ]
      ]) {
        const cell = makeText(
          'span',
          `project-${field}`,
          value ?? ''
        );

        if (!value) {
          cell.setAttribute(
            'aria-hidden',
            'true'
          );
        }

        row.append(cell);
      }


      if (project.detail) {
        row.append(
          makeDetailButton(
            project,
            'project-detail',
            labels.detail,
            '+'
          )
        );
      }


      projectIndex.append(row);
    });


  // ---------------------------------------------------------------------------
  // Dialog
  // ---------------------------------------------------------------------------

  projectDialog
    .querySelector('[data-dialog-close]')
    .addEventListener(
      'click',
      () => projectDialog.close()
    );


  projectDialog.addEventListener(
    'close',
    () => {
      document.body.style.overflow =
        previousOverflow;

      previousFocus?.focus();
    }
  );


  projectDialog.addEventListener(
    'click',
    (event) => {
      if (event.target === projectDialog) {
        projectDialog.close();
      }
    }
  );
}