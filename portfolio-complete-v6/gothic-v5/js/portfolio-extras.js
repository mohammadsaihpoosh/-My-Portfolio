/* Bilingual portfolio, mobile menu and project archive. No dependencies. */
(() => {
  'use strict';
  const storageKey = 'portfolio-language';
  const root = document.documentElement;
  const locale = () => root.lang === 'fa' ? 'fa' : 'en';
  const digits = (n, min = 1) => String(n).padStart(min, '0').replace(/[0-9]/g, d => locale() === 'fa' ? '۰۱۲۳۴۵۶۷۸۹'[Number(d)] : d);
  function init() {
    root.classList.add('js-ready');
    const textEntries = [];
    const attrEntries = [];
    // data-fa translates the first non-whitespace direct text node; data-fa-2 the second.
    // Child links, images, spans and their listeners remain intact.
    document.querySelectorAll('body *').forEach(el => {
      const nodes = [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim());
      nodes.forEach((node, i) => {
        const fa = el.getAttribute(i === 0 ? 'data-fa' : `data-fa-${i + 1}`);
        if (fa !== null) {
          const en = node.nodeValue;
          textEntries.push({node, en, fa: en.match(/^\s*/)[0] + fa + en.match(/\s*$/)[0]});
        }
      });
      ['aria-label', 'alt', 'title'].forEach(name => {
        const fa = el.getAttribute(`data-fa-${name}`);
        if (fa !== null) attrEntries.push({el, name, en: el.getAttribute(name), fa});
      });
    });
    const titleEN = document.title;
    const desc = document.querySelector('meta[name="description"]');
    const descEN = desc?.content;
    const nav = document.querySelector('#site-nav');
    const links = [...(nav?.querySelectorAll('a[href^="#"]') || [])];
    const targets = links.map(a => document.getElementById(a.hash.slice(1)));
    function markActive() {
      const end = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const line = window.scrollY + Math.min(200, window.innerHeight * .3);
      let active = 0;
      targets.forEach((t,i) => { if (t && t.getBoundingClientRect().top + scrollY <= line) active = i; });
      if (end) active = links.length - 1;
      links.forEach((a,i) => { a.classList.toggle('active',i===active); if (i===active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
    }
    let queued = false;
    window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; markActive(); }); } }, {passive:true});
    window.addEventListener('resize',markActive);
    markActive();
    const section = document.querySelector('#projects');
    let activeFilter = 'all';
    const buttons = [...(section?.querySelectorAll('.filter-button[data-filter]') || [])];
    const cards = [...(section?.querySelectorAll('.project-card[data-category]') || [])];
    const count = section?.querySelector('#project-count');
    const empty = section?.querySelector('#project-empty');
    const matches = (card, filter) => filter === 'all' || card.dataset.category.trim().split(/\s+/).includes(filter);
    function apply(filter) {
      activeFilter = filter;
      let visible = 0;
      cards.forEach(card => {
        const show = matches(card, filter);
        card.hidden = !show;
        card.classList.toggle('is-hidden', !show);
        visible += Number(show);
      });
      buttons.forEach(button => {
        const active = button.dataset.filter === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
        const badge = button.querySelector('.filter-count');
        if (badge) badge.textContent = digits(cards.filter(card => matches(card, button.dataset.filter)).length, 2);
      });
      if (count) count.textContent = locale() === 'fa' ? `نمایش ${digits(visible)} از ${digits(cards.length)} پروژه` : `Showing ${visible} of ${cards.length} projects`;
      if (empty) empty.hidden = visible !== 0;
    }
    buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.filter)));
    section?.querySelector('#show-all-projects')?.addEventListener('click', () => { apply('all'); buttons.find(b => b.dataset.filter === 'all')?.focus(); });
    const langButtons = [...document.querySelectorAll('[data-language]')];
    function setLanguage(language) {
      const fa = language === 'fa';
      root.lang = fa ? 'fa' : 'en';
      root.dir = fa ? 'rtl' : 'ltr';
      textEntries.forEach(({node, en, fa: translation}) => { node.nodeValue = fa ? translation : en; });
      attrEntries.forEach(({el, name, en, fa: translation}) => { if (!fa && en === null) el.removeAttribute(name); else el.setAttribute(name, fa ? translation : en); });
      document.title = fa ? 'محمد سیاه‌پوش — آرشیو گوتیک' : titleEN;
      if (desc) desc.content = fa ? 'محمد سیاه‌پوش — سایت شخصی، نمونه‌کارها، مهارت‌ها و ایده‌ها.' : descEN;
      langButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.language === root.lang)));
      markActive();
      apply(activeFilter);
      const year = document.querySelector('#year');
      if (year) year.textContent = digits(new Date().getFullYear());
      document.dispatchEvent(new Event('portfolio:languagechange'));
      try { localStorage.setItem(storageKey, root.lang); } catch (_) { /* Private or restricted storage */ }
    }
    langButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
    let saved = 'en';
    try { saved = localStorage.getItem(storageKey) || 'en'; } catch (_) { /* Default English */ }
    setLanguage(saved);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
