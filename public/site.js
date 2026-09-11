// Set this to a real PDF within public, e.g. '/filippo-zanardo-cv.pdf'.
// Never expose a download until the server confirms it is a PDF (Workers
// can return index.html for a missing path through their SPA fallback).
const cvPath = null;

async function enableCV(path) {
  if (!path) return;
  try {
    const response = await fetch(path, { method: 'HEAD' });
    if (!response.ok || !response.headers.get('content-type')?.includes('application/pdf')) return;
    document.querySelectorAll('[data-cv-link]').forEach((link) => {
      link.href = path;
      link.setAttribute('download', 'Filippo-Zanardo-CV.pdf');
      link.hidden = false;
    });
    document.querySelector('#contact').hidden = false;
    document.querySelector('[data-contact-link]').hidden = false;
  } catch {
    // Keep the page complete and usable when the CV is unavailable.
  }
}

enableCV(cvPath);
