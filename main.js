/* ECS landing · interactions & motion (vanilla, no dependencies) */
(() => {
  const root = document.documentElement;
  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motion = !reduceMQ.matches;
  if (motion) root.classList.add('motion');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const T = window.ecsT || (s => s);
  const rtl = root.dir === "rtl";

  /* ---------- text splitting ---------- */
  // Wrap every word of the element's text nodes, keeping inner markup.
  function splitWords(el, wrap) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let i = 0;
    nodes.forEach(node => {
      const parts = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
        frag.appendChild(wrap(p, i++));
      });
      node.replaceWith(frag);
    });
    return i;
  }

  // Scroll-linked word reveal for headings / statement
  const wordBlocks = $$('[data-words]').map(el => {
    el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
    splitWords(el, (t) => {
      const s = document.createElement('span');
      s.className = 'w'; s.textContent = t; s.setAttribute('aria-hidden', 'true');
      return s;
    });
    return { el, words: $$('.w', el), marks: $$('.hl', el).map(m => ({ m, last: $$('.w', m).pop() })), visible: false };
  });

  // Hero H1: masked word rise on load
  const heroTitle = $('[data-split]');
  if (heroTitle) {
    heroTitle.setAttribute('aria-label', heroTitle.textContent.trim());
    splitWords(heroTitle, (t, i) => {
      const m = document.createElement('span'); m.className = 'split-mask'; m.setAttribute('aria-hidden', 'true');
      const w = document.createElement('span'); w.className = 'split-word'; w.style.setProperty('--i', i); w.textContent = t;
      m.appendChild(w); return m;
    });
  }
  $$('[data-intro]').forEach((el, i) => el.style.setProperty('--d', 450 + i * 110));
  /* ---------- intro: idea → team → launch, then fly through the "C" ---------- */
  const hero = $('.hero');
  const heroImg = $('.hero__img img');
  const startHero = () => hero.classList.add('is-loaded');
  if (root.classList.contains('has-intro')) {
    const intro = $('.intro');
    const line = $('.intro__line', intro), word = $('.intro__word', intro), num = $('.intro__num', intro);
    const dots = $$('.intro__dots i', intro);
    const svg = $('.intro__knock', intro), texts = $$('text', svg);
    const wait = ms => new Promise(r => setTimeout(r, ms));
    let skipped = false, zooming = false;
    // The knockout shows the hero through the letters, so always start at the top.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    scrollTo(0, 0);

    // Size the ECS knockout to the viewport and aim the zoom at the left stroke of the "C".
    const layout = () => {
      const w = innerWidth, h = innerHeight;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const fs = Math.min(w * .34, h * .62);
      texts.forEach(t => { t.setAttribute('x', w / 2); t.setAttribute('y', h / 2); t.setAttribute('font-size', fs); });
      let ox = w / 2, oy = h / 2;
      try {
        const c = texts[1].getExtentOfChar(1);
        ox = c.x + c.width * .14; oy = c.y + c.height * .5;
      } catch (e) {}
      svg.style.transformOrigin = `${ox}px ${oy}px`;
      svg.style.setProperty('--zoom', Math.ceil(Math.max(w, h) / (fs * .06)));
    };

    const finish = () => {
      if (zooming) return; zooming = true;
      layout();
      intro.classList.add('is-knockout', 'is-zoom');
      startHero(); root.classList.add('intro-done');
      try { sessionStorage.setItem('ecs-intro', '1'); } catch (e) {}
      setTimeout(() => root.classList.add('intro-gone'), 1100);
    };
    intro.addEventListener('click', () => { skipped = true; finish(); });
    addEventListener('keydown', e => { if (!zooming && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) { skipped = true; finish(); } });

    const type = async (txt, speed) => { for (const ch of txt) { if (skipped) return; word.textContent += ch; await wait(speed); } };
    const erase = async speed => { while (word.textContent && !skipped) { word.textContent = word.textContent.slice(0, -1); await wait(speed); } };

    (async () => {
      const steps = [T('idea'), T('team'), T('launch')];
      await wait(250);
      for (let i = 0; i < steps.length && !skipped; i++) {
        num.textContent = '0' + (i + 1); dots[i].classList.add('on');
        line.classList.add('is-typing');
        await type(steps[i], 55);
        line.classList.remove('is-typing');
        if (i < steps.length - 1) { await wait(320); line.classList.add('is-typing'); await erase(28); }
      }
      if (skipped) return;
      word.classList.add('is-final');
      await wait(260);
      await (document.fonts ? document.fonts.ready : Promise.resolve());
      if (skipped) return;
      layout();
      intro.classList.add('is-knockout');
      await wait(1050);
      finish();
    })();
    addEventListener('resize', () => { if (!root.classList.contains('intro-gone')) layout(); });
  } else {
    requestAnimationFrame(() => requestAnimationFrame(startHero));
  }

  // subtle mouse parallax on the hero photo
  if (motion && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('pointermove', e => {
      const x = e.clientX / window.innerWidth - .5, y = e.clientY / window.innerHeight - .5;
      heroImg.style.setProperty('--mx', `${(-x * 28).toFixed(1)}px`);
      heroImg.style.setProperty('--my', `${(-y * 18).toFixed(1)}px`);
    });
  }

  /* ---------- reveal on scroll ---------- */
  // Calm fade-up for section heads and repeated items that don't opt in themselves.
  $$('.section .head, .impact .head, .formats__aside, .format, .faq__grid > *, .stat, .join__grid > *, .partners .head, .footer__top > *')
    .forEach(el => { if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', ''); });
  const groups = new Map();
  $$('[data-reveal]').forEach(el => {
    const key = el.parentElement;
    const n = groups.get(key) || 0;
    el.style.setProperty('--stagger', n);
    groups.set(key, n + 1);
  });
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } });
  }, { threshold: .15, rootMargin: '0px 0px -5% 0px' });
  $$('[data-reveal]').forEach(el => revealIO.observe(el));

  const wordIO = new IntersectionObserver(entries => {
    entries.forEach(e => { const b = wordBlocks.find(x => x.el === e.target); if (b) b.visible = e.isIntersecting; });
    requestTick();
  }, { rootMargin: '10% 0px' });
  wordBlocks.forEach(b => wordIO.observe(b.el));

  /* ---------- parallax images ---------- */
  const parallax = $$('[data-parallax]').map(el => ({ el, visible: false }));
  const parIO = new IntersectionObserver(entries => {
    entries.forEach(e => { const p = parallax.find(x => x.el === e.target); if (p) p.visible = e.isIntersecting; });
  });
  parallax.forEach(p => parIO.observe(p.el));

  /* ---------- photo settle: image eases from 1.18× to 1× as it scrolls in ---------- */
  const zooms = $$('[data-zoom]').map(el => ({ el, visible: false }));
  const zoomIO = new IntersectionObserver(entries => {
    entries.forEach(e => { const z = zooms.find(x => x.el === e.target); if (z) z.visible = e.isIntersecting; });
    requestTick();
  }, { rootMargin: '10% 0px' });
  zooms.forEach(z => zoomIO.observe(z.el));
  /* ---------- curtain reveal: content of [data-emerge] sections lags behind the scroll ---------- */
  // Only the marked inner content moves (e.g. Journey text, not its full-bleed photo).
  const emerges = $$('[data-emerge]').map(el => {
    const marked = $$('[data-emerge-target]', el);
    return { el, kids: marked.length ? marked : [...el.children] };
  });
  function updateEmerges(vh) {
    if (!motion) return;
    const shift = Math.min(170, vh * .2);
    emerges.forEach(({ el, kids }) => {
      const r = el.getBoundingClientRect();
      if (r.top > vh || r.top < -vh) return;
      const off = -shift * clamp(r.top / vh);
      kids.forEach(k => { k.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`; });
    });
  }

  function updateZooms(vh) {
    if (!motion) return;
    zooms.forEach(({ el, visible }) => {
      if (!visible) return;
      const r = el.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh * .55 + r.height * .5));
      el.style.setProperty('--z', (1.18 - .18 * p).toFixed(4));
    });
  }

  const stepsList = $('.join__steps');
  const stepCards = $$('.step-card');

  /* ---------- community: horizontal scroll ---------- */
  const community = $('.community');
  const track = $('.community__track');
  const win = $('.community__window');
  const shots = $$('.shot', track);
  const fill = $('.progress__fill');
  const count = $('.progress__count');
  const hint = $('.progress__hint');
  const total = shots.filter(s => s.tagName === 'FIGURE').length;
  let pinned = false, distance = 0;

  function layoutCommunity() {
    pinned = motion && window.innerWidth >= 1080;
    community.classList.toggle('is-pinned', pinned);
    track.style.transform = '';
    if (pinned) {
      distance = Math.max(0, track.scrollWidth - win.clientWidth);
      community.style.height = `calc(100svh + ${distance}px)`;
      hint.textContent = T('Scroll to explore');
    } else {
      community.style.height = '';
      hint.textContent = T('Swipe to explore');
    }
  }

  function setProgress(p) {
    fill.style.setProperty('--p', Math.max(1 / total, p));
    const idx = clamp(Math.round(p * (total - 1)) + 1, 1, total);
    count.textContent = `${String(idx).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  // Window parallax: every photo is 3× wider than its frame and slides the opposite way
  // to the track, from 0.7 frame-widths left to 0.7 right over the whole gallery.
  const imgs = shots.map(s => s.querySelector('img')).filter(Boolean);
  let galleryP = 0;
  function shotParallax() {
    if (!motion || !imgs.length) return;
    const w = imgs[0].parentElement.offsetWidth;
    const sx = `${((-0.7 + 1.4 * galleryP) * w).toFixed(1)}px`;
    imgs.forEach(img => img.style.setProperty('--sx', sx));
  }

  track.addEventListener('scroll', () => {
    if (pinned) return;
    const max = track.scrollWidth - track.clientWidth;
    galleryP = max > 0 ? Math.abs(track.scrollLeft) / max : 0;
    setProgress(galleryP);
    requestAnimationFrame(shotParallax);
  }, { passive: true });

  // Keyboard focus inside the pinned gallery: scroll the page so the item is visible
  track.addEventListener('focusin', e => {
    if (!pinned) return;
    const item = e.target.closest('.shot'); if (!item) return;
    const offset = item.offsetLeft / Math.max(1, track.scrollWidth - item.offsetWidth);
    window.scrollTo({ top: community.offsetTop + offset * distance, behavior: 'auto' });
  });

  /* ---------- one rAF loop for all scroll-linked effects ---------- */
  let ticking = false;
  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  function update() {
    ticking = false;
    const vh = window.innerHeight;

    if (motion) {
      // word reveal: progress from element top at 88% → 30% of viewport
      wordBlocks.forEach(({ el, words, marks, visible }) => {
        if (!visible) return;
        const r = el.getBoundingClientRect();
        const start = vh * .9, end = vh * .3;
        const p = clamp((start - r.top) / (start - end + r.height * .6));
        const n = words.length, spread = 2.5; // how many words are mid-fade at once
        words.forEach((w, i) => {
          const local = clamp(p * (n + spread) - i, 0, spread) / spread;
          w.style.setProperty('--o', (.16 + .84 * local).toFixed(3));
        });
        // lime highlight sweeps in once its phrase is fully lit
        marks.forEach(({ m, last }) => m.classList.toggle('is-on', parseFloat(last.style.getPropertyValue('--o')) > .92));
      });

      // join steps fill their dashed slots one after another
      if (stepsList) {
        const top = stepsList.getBoundingClientRect().top;
        stepCards.forEach((s, i) => s.classList.toggle('is-filled', top < vh * (.85 - i * .11)));
      }

      parallax.forEach(({ el, visible }) => {
        if (!visible) return;
        const r = el.getBoundingClientRect();
        const c = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty('--py', `${(c * -28).toFixed(1)}px`);
      });
      updateZooms(vh);
      updateFormats(vh);
      updateEmerges(vh);
    }

    if (pinned) {
      const r = community.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, distance));
      track.style.transform = `translate3d(${((rtl ? p : -p) * distance).toFixed(1)}px,0,0)`;
      setProgress(p);
      galleryP = p;
    }
    shotParallax();

    // nav compact
    nav.classList.toggle('is-compact', window.scrollY > 80);
  }

  /* ---------- nav ---------- */
  const nav = $('#nav');
  const burger = $('.nav__burger');
  const mobile = $('#mobile-menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', T(open ? 'Close menu' : 'Open menu'));
    mobile.hidden = !open;
  }
  burger.addEventListener('click', () => setMenu(mobile.hidden));
  mobile.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobile.hidden) { setMenu(false); burger.focus(); } });

  // scroll-spy
  const navLinks = $$('.nav__links a');
  const spyIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) spyIO.observe(s); });

  /* ---------- single-open lists: formats + journey levels ---------- */
  $$('[data-switch]').forEach(group => {
    const items = $$('[data-switch-item]', group);
    const imgs = $$('[data-switch-img]', group);
    const counter = $('[data-switch-count]', group.closest('section'));
    const open = i => {
      items.forEach((it, j) => {
        const on = j === i;
        it.classList.toggle('is-open', on);
        const btn = $('[aria-expanded]', it);
        btn.setAttribute('aria-expanded', String(on));
        const panel = $('#' + btn.getAttribute('aria-controls'));
        if (panel) panel.inert = !on;
      });
      imgs.forEach((im, j) => im.classList.toggle('is-active', j === i));
      if (counter) counter.textContent = String(i + 1).padStart(2, '0');
      $$('.formats__bars i', group.closest('section')).forEach((b, j) => b.classList.toggle('on', j <= i));
      group.current = i;
    };
    group.open = open;
    items.forEach((it, i) => $('[aria-expanded]', it).addEventListener('click', () => {
      // In the pinned formats section a click scrolls to that item's slot, so scroll and state stay in sync.
      if (group.goTo) group.goTo(i); else open(i);
    }));
    open(Math.max(0, items.findIndex(it => it.classList.contains('is-open'))));
  });

  /* ---------- formats: scroll opens one accordion after another (desktop) ---------- */
  const formats = $('.formats');
  const fList = $('.formats__list');
  const fCount = $$('[data-switch-item]', fList).length;
  let fScrolly = false;
  function layoutFormats() {
    fScrolly = motion && window.innerWidth > 900 && window.innerHeight > 620;
    formats.classList.toggle('is-scrolly', fScrolly);
    fList.goTo = fScrolly ? i => {
      const span = formats.offsetHeight - window.innerHeight;
      window.scrollTo({ top: formats.offsetTop + span * ((i + .5) / fCount), behavior: 'smooth' });
    } : null;
  }
  function updateFormats(vh) {
    if (!fScrolly) return;
    const r = formats.getBoundingClientRect();
    const p = clamp(-r.top / Math.max(1, r.height - vh));
    const i = Math.min(fCount - 1, Math.floor(p * fCount));
    if (i !== fList.current) fList.open(i);
  }
  layoutFormats();
  window.addEventListener('resize', layoutFormats);

  /* ---------- events: expand details ---------- */
  $$('.event__toggle').forEach(btn => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    $('.event__toggle-label', btn).textContent = T(open ? 'Hide details' : 'Event details');
    $('#' + btn.getAttribute('aria-controls')).hidden = !open;
    if (pinned) requestAnimationFrame(layoutCommunity);
  }));

  // Add to calendar (.ics download)
  $$('[data-ics]').forEach(btn => btn.addEventListener('click', () => {
    const d = JSON.parse(btn.dataset.ics);
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ECS Sapir//EN', 'BEGIN:VEVENT',
      `UID:${Date.now()}@ecs-sapir`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;TZID=Asia/Jerusalem:${d.start}`, `DTEND;TZID=Asia/Jerusalem:${d.end}`,
      `SUMMARY:${d.title}`, `LOCATION:${d.location}`, `DESCRIPTION:${d.desc}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'ecs-entrepreneurship-dinner.ics';
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast(T('Calendar file downloaded'));
  }));

  /* ---------- FAQ accordion (one open at a time) ---------- */
  const accBtns = $$('.acc button');
  accBtns.forEach(btn => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    accBtns.forEach(b => { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).hidden = true; });
    btn.setAttribute('aria-expanded', String(open));
    $('#' + btn.getAttribute('aria-controls')).hidden = !open;
    if (pinned) requestAnimationFrame(layoutCommunity);
  }));

  /* ---------- count-up: odometer reels, one per digit ---------- */
  const counters = $$('[data-count]').filter(el => /^\d+$/.test(el.dataset.count));
  if (motion) counters.forEach(el => {
    const digits = el.dataset.count.split(''), suffix = el.dataset.suffix || '';
    el.setAttribute('aria-label', el.dataset.count + suffix);
    el.classList.add('odo');
    el.innerHTML = digits.map((d, i) =>
      `<span class="odo__reel" aria-hidden="true"><span class="odo__strip" style="--d:${d};--i:${digits.length - 1 - i}">${
        Array.from({ length: 10 }, (_, n) => `<span>${n}</span>`).join('')}</span></span>`).join('') +
      (suffix ? `<span class="odo__suffix" aria-hidden="true">${suffix}</span>` : '');
  });
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      e.target.classList.add('is-counted');
    });
  }, { threshold: .6 });
  counters.forEach(el => countIO.observe(el));

  /* ---------- join form ---------- */
  const form = $('#join-form');
  const success = $('#join-success');
  const rules = {
    name: v => v.trim().length >= 2 ? '' : T('Enter your full name.'),
    phone: v => /^0(5\d)-?\d{3}-?\d{4}$/.test(v.replace(/\s/g, '')) ? '' : T('Enter a mobile number like 050-123-4567.'),
  };
  function check(input) {
    const rule = rules[input.name]; if (!rule) return true;
    const msg = rule(input.value);
    const field = input.closest('.field'), err = $('.field__err', field);
    field.classList.toggle('is-invalid', !!msg);
    input.setAttribute('aria-invalid', String(!!msg));
    err.textContent = msg; err.hidden = !msg;
    return !msg;
  }
  $$('input[required]', form).forEach(inp => {
    inp.addEventListener('blur', () => { if (inp.value) check(inp); });
    inp.addEventListener('input', () => { if (inp.closest('.field').classList.contains('is-invalid')) check(inp); });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const alert = $('.form__alert', form); alert.hidden = true;
    const invalid = $$('input[required]', form).filter(i => !check(i));
    if (invalid.length) { invalid[0].focus(); return; }
    const btn = $('button[type="submit"]', form);
    btn.classList.add('is-loading'); $('.btn__label', btn).textContent = T('Sending…');
    // Demo: replace with the real endpoint (e.g. Google Sheets / form service) before launch.
    setTimeout(() => {
      btn.classList.remove('is-loading'); $('.btn__label', btn).textContent = T('Submit and Continue');
      form.hidden = true; success.hidden = false; success.focus();
    }, 1100);
  });

  /* ---------- placeholder links (not connected yet) ---------- */
  const toastEl = $('.toast'); let toastT;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  }
  $$('[data-placeholder]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); toast(T('{x} will be connected before launch').replace('{x}', T(a.dataset.placeholder)));
  }));

  /* ---------- lifecycle ---------- */
  function onResize() { layoutCommunity(); requestTick(); }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', onResize);
  reduceMQ.addEventListener?.('change', e => { motion = !e.matches; root.classList.toggle('motion', motion); onResize(); });
  layoutCommunity(); requestTick();
})();
