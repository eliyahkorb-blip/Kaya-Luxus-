'use strict';
(() => {
  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
  const remove = key => { try { localStorage.removeItem(key); } catch {} };

  // Navigation: the desktop links remain available if JavaScript is disabled.
  const toggle = $('#nav-toggle');
  const mobileNav = $('#mobile-nav');
  let menuOpen = false;
  const main = $('main');
  const footer = $('.site-footer');
  const setMenu = (open, restoreFocus = true) => {
    menuOpen = open;
    if (!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (main) main.inert = open;
    if (footer) footer.inert = open;
    if (open) $('a', mobileNav)?.focus();
    else if (restoreFocus) toggle.focus();
  };
  toggle?.addEventListener('click', () => setMenu(!menuOpen));
  $$('a', mobileNav || document.createElement('div')).forEach(a => a.addEventListener('click', () => setMenu(false, false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (menuOpen) setMenu(false);
      $$('.accessibility[open]').forEach(d => { d.open = false; $('summary', d)?.focus(); });
    }
    if (event.key === 'Tab' && menuOpen && mobileNav) {
      const items = [toggle, ...$$('a, button', mobileNav)].filter(Boolean);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  const wide = matchMedia('(min-width: 651px)');
  wide.addEventListener('change', e => { if (e.matches && menuOpen) setMenu(false, false); });

  // Optional reading preferences; storage may be unavailable in private mode.
  const FONT_KEY = 'kaya_font_v2', CONTRAST_KEY = 'kaya_contrast_v2';
  const scales = [1, 1.125, 1.25];
  const savedFont = Number(read(FONT_KEY) || 0);
  let fontLevel = Number.isInteger(savedFont) && savedFont >= 0 && savedFont < scales.length ? savedFont : 0;
  let contrast = read(CONTRAST_KEY) === '1';
  function applyReading() {
    root.style.setProperty('--scale', scales[fontLevel]);
    root.classList.toggle('high-contrast', contrast);
    const label = $('#font-level');
    if (label) label.textContent = `${Math.round(scales[fontLevel] * 100)} %`;
    const minus = $('#font-minus'), plus = $('#font-plus');
    if (minus) minus.disabled = fontLevel === 0;
    if (plus) plus.disabled = fontLevel === scales.length - 1;
    const button = $('#contrast-toggle');
    if (button) { button.setAttribute('aria-pressed', String(contrast)); button.textContent = contrast ? 'An' : 'Aus'; }
  }
  applyReading();
  $('#font-minus')?.addEventListener('click', () => { fontLevel = Math.max(0, fontLevel - 1); write(FONT_KEY, String(fontLevel)); applyReading(); });
  $('#font-plus')?.addEventListener('click', () => { fontLevel = Math.min(scales.length - 1, fontLevel + 1); write(FONT_KEY, String(fontLevel)); applyReading(); });
  $('#contrast-toggle')?.addEventListener('click', () => { contrast = !contrast; write(CONTRAST_KEY, contrast ? '1' : '0'); applyReading(); });
  $('#reading-reset')?.addEventListener('click', () => { fontLevel = 0; contrast = false; remove(FONT_KEY); remove(CONTRAST_KEY); applyReading(); });

  // Berlin time, including CET/CEST. The status explicitly refers to regular hours.
  function updateHours(now = new Date()) {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
      const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
      const hours = Number(p.hour), minutes = hours * 60 + Number(p.minute);
      const open = minutes >= 660 && minutes < 1200;
      $$('[data-opening-state]').forEach(el => { el.textContent = open ? 'Regulär jetzt geöffnet · bis 20 Uhr' : minutes < 660 ? 'Regulär heute ab 11 Uhr geöffnet' : 'Regulär morgen ab 11 Uhr geöffnet'; });
      $$('[data-weekday]').forEach(el => { el.dataset.today = String(el.dataset.weekday === p.weekday); });
    } catch { /* Static opening hours remain visible. */ }
  }
  updateHours();
  setInterval(updateHours, 60000);

  // Google Maps never receives a request before an affirmative choice.
  const MAP_KEY = 'kaya_maps_v2';
  const stage = $('#map-stage'), placeholder = $('#map-placeholder');
  const dialog = $('#privacy-dialog');
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const parseConsent = raw => {
    try { const v = JSON.parse(raw); return v && ['yes', 'no'].includes(v.choice) && Number.isFinite(v.at) && Date.now() - v.at < MAX_AGE && v.at <= Date.now() ? v.choice : null; } catch { return null; }
  };
  let consent = parseConsent(read(MAP_KEY));
  let frame = null;
  let settingsTrigger = null;
  function displayConsent() {
    $$('[data-consent-status]').forEach(el => { el.textContent = consent === 'yes' ? 'Google Maps ist freigegeben.' : 'Google Maps ist deaktiviert.'; });
    const revoke = $('#map-revoke');
    if (revoke) revoke.hidden = consent !== 'yes';
  }
  function loadMap() {
    if (!stage || frame || consent !== 'yes') return;
    frame = document.createElement('iframe');
    frame.title = 'KAYA Döner, Rote Wiese 2 in Himmelstadt – Google Maps';
    frame.referrerPolicy = 'no-referrer';
    frame.src = 'https://www.google.com/maps?q=Rote+Wiese+2,+97267+Himmelstadt&output=embed&hl=de&z=16';
    frame.setAttribute('allowfullscreen', '');
    if (placeholder) placeholder.hidden = true;
    stage.append(frame);
  }
  function chooseMaps(choice) {
    consent = choice;
    write(MAP_KEY, JSON.stringify({ choice, at: Date.now() }));
    if (choice === 'yes') loadMap();
    else { frame?.remove(); frame = null; if (placeholder) placeholder.hidden = false; }
    displayConsent();
    if (dialog?.open) dialog.close();
  }
  $$('[data-load-map]').forEach(button => button.addEventListener('click', () => chooseMaps('yes')));
  $('#map-revoke')?.addEventListener('click', () => chooseMaps('no'));
  $$('[data-privacy-settings]').forEach(button => button.addEventListener('click', () => {
    settingsTrigger = button;
    displayConsent();
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
    else location.href = 'datenschutz.html#karte';
  }));
  $('#privacy-accept')?.addEventListener('click', () => chooseMaps('yes'));
  $('#privacy-decline')?.addEventListener('click', () => chooseMaps('no'));
  $('#privacy-close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('close', () => settingsTrigger?.focus());
  window.addEventListener('storage', e => {
    if (e.key !== MAP_KEY && e.key !== null) return;
    consent = e.key === null ? null : parseConsent(e.newValue);
    if (consent !== 'yes') { frame?.remove(); frame = null; if (placeholder) placeholder.hidden = false; }
    else loadMap();
    displayConsent();
  });
  displayConsent();
  if (consent === 'yes') loadMap();

  // Category links are real fragment links and work without scripts.
  const categoryLinks = $$('.category-nav a');
  const sections = $$('.menu-section');
  const markCategory = id => categoryLinks.forEach(a => a.setAttribute('aria-current', String(a.hash === `#${id}`)));
  categoryLinks.forEach(a => a.addEventListener('click', () => markCategory(a.hash.slice(1))));
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) markCategory(visible[0].target.id);
    }, { rootMargin: '-150px 0px -55% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
  }
  $('#print-menu')?.addEventListener('click', () => window.print());
})();
