(() => {
  'use strict';
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const video = document.getElementById('brand-video');
  let motionPaused = reduceMotion.matches;

  function applyMotionPreference() {
    root.classList.toggle('motion-paused', motionPaused);
    if (motionPaused) video.pause();
    else video.play().catch(() => { /* Respect browser autoplay restrictions. */ });
  }
  reduceMotion.addEventListener('change', () => { motionPaused = reduceMotion.matches; applyMotionPreference(); });
  applyMotionPreference();

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pending');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    root.classList.add('motion-ready');
    document.querySelectorAll('.reveal').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('pending');
      observer.observe(element);
    });
  }

  const progress = document.querySelector('.reading-progress');
  let scrollScheduled = false;
  function updateProgress() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    scrollScheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  document.querySelectorAll('[data-payment]').forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.dataset.payment;
      document.querySelectorAll('[data-payment]').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('[data-payment-detail]').forEach(item => {
        item.hidden = item.dataset.paymentDetail !== mode;
      });
      const descriptions = {
        split: '50% al iniciar y 50% al finalizar, con el sistema disponible para entrega.',
        finance3: 'Se financia el 100% del desarrollo en 3 cuotas mensuales. Primera cuota a los 30 días. Mantenimiento desde la puesta en funcionamiento.',
        finance6: 'Se financia el 100% del desarrollo en 6 cuotas mensuales. Primera cuota a los 30 días. Mantenimiento desde la puesta en funcionamiento.'
      };
      document.getElementById('payment-description').textContent = descriptions[mode];
    });
  });

  document.getElementById('share-proposal').addEventListener('click', async () => {
    const status = document.getElementById('share-status');
    const url = window.location.href.split('#')[0];
    const data = { title: 'Mendoza Drink × NeuroTech', text: 'Propuesta de atención inteligente por WhatsApp para Mendoza Drink.', url };
    try {
      if (navigator.share) { await navigator.share(data); status.textContent = 'Propuesta compartida.'; }
      else if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(url); status.textContent = 'Enlace copiado. Ya podés pegarlo en WhatsApp.'; }
      else status.textContent = `Copiá este enlace para compartir: ${url}`;
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = `Podés compartir este enlace: ${url}`;
    }
  });
})();