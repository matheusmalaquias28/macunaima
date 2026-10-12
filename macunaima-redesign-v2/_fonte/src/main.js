/* Macunaíma — interações (vanilla, sem dependências) */
(() => {
  const d = document, w = window, root = d.documentElement;
  const RM = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
  root.classList.add('js');

  /* ---------- vídeos: carregam só quando visíveis ---------- */
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) {
      if (!v.src && v.dataset.src && !RM) { v.src = v.dataset.src; }
      if (!RM) v.play().catch(() => {});
    } else if (v.src) v.pause();
  }), { rootMargin: '200px' });
  $$('video[data-src]').forEach(v => vio.observe(v));
  requestAnimationFrame(() => $('.hero')?.classList.add('is-ready'));

  /* ---------- reveal ---------- */
  const rio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px', threshold: .01 });
  $$('[data-rv],[data-clip],h1,h2,.origem__h,[data-viz]').forEach(el => rio.observe(el));
  // headings with .ln outside h2 (h1) — trigger immediately on load
  setTimeout(() => $('.hero__title')?.classList.add('is-in'), 120);

  /* ---------- contadores ---------- */
  const fmt = (n, el) => el.dataset.fmt === 'pt' ? n.toLocaleString('pt-BR') : String(n);
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.count; cio.unobserve(el);
    if (RM) { el.textContent = fmt(to, el); return; }
    const dur = 1800 + Math.min(to, 500) * 1.2, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), k = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(to * k), el);
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = fmt(0, el); requestAnimationFrame(tick);
  }), { threshold: .4 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------- 150 marcas: 1 marca = 1 tonelada/dia ---------- */
  const ticks = $('[data-ticks]');
  if (ticks) {
    const n = +ticks.dataset.ticks; ticks.innerHTML = '<i></i>'.repeat(n);
    const is = $$('i', ticks);
    new IntersectionObserver((es, o) => es.forEach(e => {
      if (!e.isIntersecting) return; o.disconnect();
      is.forEach((t, i) => RM ? t.classList.add('on') : setTimeout(() => t.classList.add('on'), 200 + i * 11));
    }), { threshold: .3 }).observe(ticks);
  }

  /* ---------- header: sólido, esconde ao descer, seção atual, progresso ---------- */
  const hdr = $('[data-hdr]'), prog = $('[data-progress]');
  const idx = $('[data-sec-idx]'), nm = $('[data-sec-name]');
  const navLinks = $$('.hdr__nav a');
  let lastY = 0;
  const secs = $$('[data-sec]');
  const sio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const s = e.target;
    if (idx) idx.textContent = s.dataset.sec;
    if (nm) nm.textContent = s.dataset.name;
    navLinks.forEach(a => a.classList.toggle('is-cur', s.id && a.getAttribute('href') === '#' + s.id));
  }), { rootMargin: '-45% 0px -54% 0px' });
  secs.forEach(s => sio.observe(s));

  /* ---------- menu mobile ---------- */
  const burger = $('[data-burger]'), menu = $('[data-menu]');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', open);
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open')); d.body.style.overflow = 'hidden'; hdr.classList.remove('is-hidden'); }
    else { menu.classList.remove('is-open'); d.body.style.overflow = ''; setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 800); }
  };
  burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') setMenu(false); });

  /* ---------- caminho do fruto: scroll horizontal fixado ---------- */
  const path = $('[data-path]'), track = $('[data-path-track]'), fill = $('[data-path-fill]');
  const rail = $$('.path__rail li');
  const pathOn = () => path && !RM && w.innerWidth > 900;
  const sizePath = () => {
    if (!path) return;
    if (!pathOn()) { path.style.removeProperty('--ph'); track.style.transform = ''; return; }
    const dist = track.scrollWidth - w.innerWidth;
    path.style.setProperty('--ph', (dist + w.innerHeight * 1.15) + 'px');
    path._dist = dist;
  };

  /* ---------- AÇAÍ: ajusta a palavra à largura total ---------- */
  const fitAcai = () => {
    const s = $('.acai__knock span'); if (!s) return;
    s.style.setProperty('--fs', '100px'); s.style.setProperty('--ks', 1);
    const wd = s.getBoundingClientRect().width;
    const pe = s.parentElement, cs = getComputedStyle(pe), av = pe.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    s.style.setProperty('--fs', (100 * av * .97 / wd).toFixed(2) + 'px');
  };
  fitAcai(); d.fonts?.ready.then(fitAcai);

  /* ---------- parallax + palavra AÇAÍ ---------- */
  const pars = $$('[data-par]');
  const acai = $('[data-acai] .acai__knock span');

  let ticking = false;
  const onScroll = () => {
    const y = w.scrollY, vh = w.innerHeight;
    hdr.classList.toggle('is-solid', y > 40);
    if (burger?.getAttribute('aria-expanded') !== 'true') hdr.classList.toggle('is-hidden', y > lastY && y > vh * .9);
    lastY = y;
    const max = root.scrollHeight - vh; prog?.style.setProperty('--p', max > 0 ? y / max : 0);

    if (pathOn() && path._dist) {
      const r = path.getBoundingClientRect();
      const span = path.offsetHeight - vh;
      const p = Math.min(Math.max(-r.top / span, 0), 1);
      track.style.transform = `translate3d(${-p * path._dist}px,0,0)`;
      fill?.style.setProperty('--pp', p);
      const a = Math.min(4, Math.round(p * 4));
      rail.forEach((li, i) => li.classList.toggle('is-on', i <= a));
    }
    if (!RM) {
      pars.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const c = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty('--py', (c * -100 * (+el.dataset.par || .1) * 2).toFixed(1) + 'px');
      });
      if (acai) {
        const r = acai.parentElement.getBoundingClientRect();
        const p = Math.min(Math.max(1 - (r.top + r.height * .5) / vh, 0), 1);
        acai.style.setProperty('--ks', (1.0 - p * .06).toFixed(4));
      }
    }
    ticking = false;
  };
  w.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  w.addEventListener('resize', () => { fitAcai(); sizePath(); onScroll(); });
  w.addEventListener('load', () => { sizePath(); onScroll(); });
  sizePath(); onScroll();

  /* ---------- qualidade: lista ↔ imagem ---------- */
  const ql = $('[data-qlist]'), qf = $('[data-qframe]');
  if (ql && qf) {
    ql.classList.add('is-js');
    const rows = $$('.qrow', ql), imgs = $$('img', qf), qn = $('[data-qn]', qf);
    const setQ = i => {
      rows.forEach((r, j) => r.classList.toggle('is-on', i === j));
      imgs.forEach((im, j) => im.classList.toggle('is-on', i === j));
      if (qn) qn.textContent = String(i + 1).padStart(2, '0') + '/05';
    };
    rows.forEach((r, i) => r.addEventListener('mouseenter', () => setQ(i)));
    const qio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setQ(rows.indexOf(e.target)); }), { rootMargin: '-48% 0px -48% 0px' });
    rows.forEach(r => qio.observe(r));
  }

  /* ---------- produtos: tabs ---------- */
  const px = $('[data-px]');
  if (px) {
    const tabs = $$('[role=tab]', px), panels = $$('.pp', px), pct = $('[data-px-pct]', px), pctBox = pct?.parentElement;
    const vals = ['8', '12', '12', '14'];
    const sel = (i, focus) => {
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', i === j); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => { const on = i === j; p.classList.toggle('is-on', on); p.hidden = !on; });
      if (pct && pct.textContent !== vals[i]) {
        pctBox.classList.add('is-swap'); pct.textContent = vals[i];
        requestAnimationFrame(() => requestAnimationFrame(() => pctBox.classList.remove('is-swap')));
      }
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => sel(i));
      t.addEventListener('keydown', e => {
        const k = e.key; let n = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') n = (i + 1) % tabs.length;
        if (k === 'ArrowLeft' || k === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
        if (k === 'Home') n = 0; if (k === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); sel(n, true); }
      });
    });
  }

  /* ---------- sorbet ---------- */
  const sb = $('[data-sorbet]');
  if (sb) {
    const bt = $$('.flavors button', sb), im = $$('.sorbet__img img', sb), nmEl = $('[data-fname]', sb);
    const tints = ['#efe8dc', '#f4e3c4', '#f3ebc6', '#f3dbe6', '#dcebf2'];
    let cur = 0;
    const set = i => {
      if (i === cur) return;
      bt.forEach((b, j) => b.setAttribute('aria-selected', i === j));
      im.forEach(x => x.classList.remove('was-on'));
      im[cur].classList.remove('is-on'); im[cur].classList.add('was-on'); im[i].classList.add('is-on');
      sb.style.setProperty('--tint', tints[i]);
      nmEl.classList.add('is-swap');
      setTimeout(() => { nmEl.textContent = bt[i].textContent; nmEl.classList.remove('is-swap'); }, 260);
      cur = i;
    };
    sb.style.setProperty('--tint', tints[0]);
    bt.forEach((b, i) => { b.addEventListener('click', () => set(i)); if (FINE) b.addEventListener('mouseenter', () => set(i)); });
  }

  /* ---------- mapa do Brasil: anéis no centro do Pará ---------- */
  const pa = $('#br-pa'), rings = $('[data-br-rings]');
  if (pa && rings) {
    const b = pa.getBBox();
    rings.setAttribute('transform', `translate(${b.x + b.width * .52} ${b.y + b.height * .42})`);
  }

  /* ---------- relógio do Pará (America/Belem) ---------- */
  const clock = $('[data-clock]');
  if (clock) {
    const f = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Belem', hour: '2-digit', minute: '2-digit' });
    const upd = () => clock.textContent = 'Pará · ' + f.format(new Date()) + ' BRT';
    upd(); setInterval(upd, 15000);
  }

  /* ---------- marquee: duplica faixa para loop contínuo ---------- */
  $$('[data-marquee]').forEach(m => { const t = $('.marquee__track', m); const c = t.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $$('img', c).forEach(i => i.alt = ''); m.appendChild(c); });

  /* ---------- cursor + botão magnético ---------- */
  if (FINE && !RM) {
    const cur = $('[data-cursor]'); let x = -100, y = -100, cx = x, cy = y;
    d.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; cur.classList.add('is-on'); }, { passive: true });
    d.addEventListener('pointerleave', () => cur.classList.remove('is-on'));
    d.addEventListener('pointerover', e => cur.classList.toggle('is-link', !!e.target.closest('a,button')));
    const loop = () => { cx += (x - cx) * .2; cy += (y - cy) * .2; cur.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop); };
    loop();
    $$('[data-magnet]').forEach(b => {
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .12}px,${(e.clientY - r.top - r.height / 2) * .2}px)`; });
      b.addEventListener('pointerleave', () => b.style.transform = '');
      b.style.transition = 'transform .6s cubic-bezier(.2,.7,.1,1), color .5s';
    });
  }
})();
