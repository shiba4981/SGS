// script.js
// Students Global Summit — interactive behaviors
// Author: ChatGPT (edited for your project)

(function () {
  'use strict';

  /* ---------------------------
     Utility: escape HTML
     --------------------------- */
  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ---------------------------
     DOM ready
     --------------------------- */
  document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------
       1) Header: shrink on scroll
       --------------------------- */
    const header = document.getElementById('header');
    function handleHeaderScroll() {
      if (!header) return;
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
    // simple mobile nav toggle (put inside DOMContentLoaded)
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(!toggle || !nav) return;
  function openNav(){
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '12px';
    nav.style.position = 'fixed';
    nav.style.top = '64px';
    nav.style.right = '12px';
    nav.style.background = 'rgba(3,3,8,0.98)';
    nav.style.padding = '14px';
    nav.style.borderRadius = '12px';
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav(){
    nav.style.display = '';
    nav.style.position = '';
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  toggle.addEventListener('click', ()=> {
    if (toggle.getAttribute('aria-expanded') === 'true') closeNav();
    else openNav();
  });
  // close when clicking a link
  nav.addEventListener('click', (e)=> {
    if(e.target.tagName === 'A') closeNav();
  });
  // close on escape
  document.addEventListener('keydown', (e)=> {
    if(e.key === 'Escape') closeNav();
  });
})();


    /* ---------------------------
       1.1) Registration button / modal behavior
       --------------------------- */
    const openRegBtn = document.getElementById('openRegisterTop');
    const registerModal = document.getElementById('registerModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (openRegBtn) {
      openRegBtn.addEventListener('click', (e) => {
        if (registerModal) {
          registerModal.classList.add('show');
          setTimeout(() => {
            const first = registerModal.querySelector('input, textarea, select, button');
            if (first) first.focus();
          }, 100);
        } else {
          window.location.href = 'register.html';
        }
      });
    }
    if (closeModalBtn && registerModal) {
      closeModalBtn.addEventListener('click', () => registerModal.classList.remove('show'));
      registerModal.addEventListener('click', (ev) => {
        if (ev.target === registerModal) registerModal.classList.remove('show');
      });
      document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && registerModal.classList.contains('show')) {
          registerModal.classList.remove('show');
        }
      });
    }

    /* ===== Defensive Cinematic Schedule (replace older schedule JS) =====
   - Will log helpful errors if something blocks execution
   - Non-conflicting (IIFE), no global variables leaked
   - Requires an element with id="cardsPlayer" and .day-btn buttons
*/
(function DefensiveCinematicSchedule() {
  try {
    const scheduleData = {
      "1": [
        { time: "10:00 AM", title: "Inauguration & Welcome Address", desc: "Opening ceremony with esteemed guests." },
        { time: "11:00 AM", title: "Yuva Swadeshi Navachar Pradarshani", desc: "Interactive exhibition of student and startup innovations." },
        { time: "03:00 pm", title: "Voices of Future ", desc: "It will transform students into global voices shaping AI's future." },
        { time: "05:00 PM", title: "Keynote: Bodhisattwa Sanghapriya", desc: "Founder & CEO, IG Drones" },
        { time: "08:35 PM", title: "Star Musical Night", desc: "An unforgettable performance." }
      ],
      "2": [
        { time: "09:30 AM", title: "Panel: Policy & Governance", desc: "Experts discuss AI policy and governance." },
        { time: "11:00 AM", title: "Student Pitch Round", desc: "Selected student startups pitch to mentors." },
        { time: "02:00 PM", title: "Hands-on Labs & Mentorship", desc: "Practical sessions on responsible AI." },
        { time: "05:00 PM", title: "Keynote: Dr. Ramesh Kumar Mishra", desc: "Professor of cognitive science at the University of Hyderabad" },
        { time: "06:00 PM", title: "Fireside Chats", desc: "Informal conversations with leaders." }
      ],
      "3": [
        { time: "10:00 AM", title: "Awards & Prize Distribution", desc: "Recognising outstanding contributions." },
        { time: "01:00 PM", title: "Hackathon Demos", desc: "Short demos from hackathon finalists." },
        { time: "03:00 PM", title: "Closing Remarks", desc: "Summation and next steps." },
        { time: "05:00 PM", title: "Cultural Farewell", desc: "A cultural send-off." }
      ]
    };

    // Run immediately (assumes outer script loaded inside DOMContentLoaded)
    const player = document.getElementById('cardsPlayer');
    const dayBtns = Array.from(document.querySelectorAll('.day-btn'));

    if (!player) {
      console.error('[Schedule] Missing #cardsPlayer element.');
      return;
    }

    if (!dayBtns.length) {
      console.warn('[Schedule] No .day-btn elements found.');
    }

    console.log('[Schedule] available keys:', Object.keys(scheduleData));

    const GAP = 20;
    let track = null;
    let currentIndex = 0;

    function escapeHtml(s) {
      return String(s || '').replace(/&/g, '&amp;')
                             .replace(/"/g, '&quot;')
                             .replace(/'/g, '&#39;')
                             .replace(/</g, '&lt;')
                             .replace(/>/g, '&gt;');
    }

    function getCardWidth() {
      const first = track?.querySelector('.card');
      if (!first) return 640;
      return Math.round(first.getBoundingClientRect().width);
    }

    function centerCard(index = 0, instant = false) {
      if (!track) return;
      const cards = Array.from(track.children);
      if (!cards.length) return;
      index = Math.max(0, Math.min(index, cards.length - 1));
      currentIndex = index;
      const cardW = getCardWidth();
      const offset = -(index * (cardW + GAP)) + (player.clientWidth - cardW) / 2;
      track.style.transition = instant ? 'none' : 'transform 620ms cubic-bezier(.2,.9,.3,1)';
      track.style.transform = `translateX(${offset}px)`;
      cards.forEach((c, i) => c.classList.toggle('center', i === index));
      if (instant) requestAnimationFrame(() => { track.style.transition = ''; });
    }

    function buildTrackFor(dayKeyRaw) {
      // normalize key to string to avoid number/string mismatch
      const dayKey = (typeof dayKeyRaw === 'number') ? String(dayKeyRaw) : String(dayKeyRaw || '1');
      console.log('[Schedule] buildTrackFor called with:', dayKeyRaw, '=> normalized:', dayKey);

      const data = scheduleData[dayKey] || scheduleData[Number(dayKey)] || scheduleData[String(dayKey)];
      if (!data || !data.length) {
        console.warn('[Schedule] No data for day', dayKey, ' — scheduleData keys: ', Object.keys(scheduleData));
        player.innerHTML = `<div style="color:rgba(255,255,255,0.6);padding:20px">No schedule for day ${escapeHtml(dayKey)}</div>`;
        return;
      }

      player.innerHTML = '';
      track = document.createElement('div');
      track.className = 'cards-track';
      player.appendChild(track);
      

      data.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-index', i);
        card.innerHTML = `
          <div class="card-layer">
            <div class="time">${escapeHtml(item.time)}</div>
            <div class="title">${escapeHtml(item.title)}</div>
            <div class="desc">${escapeHtml(item.desc)}</div>
          </div>
        `;
        track.appendChild(card);
      });

      attachCardInteractions();
      setTimeout(()=> centerCard(0, true), 60);
    }

    function attachCardInteractions() {
      if (!track) return;
      const cards = Array.from(track.children);
      cards.forEach(c => { c.onpointermove = c.onpointerleave = c.onclick = c.onmouseenter = c.onmouseleave = null; });

      cards.forEach((card, idx) => {
        card.addEventListener('click', () => { if (window.innerWidth > 900) centerCard(idx); });
        card.addEventListener('mouseenter', () => { if (window.innerWidth > 900) card._hoverTimeout = setTimeout(()=> centerCard(idx), 220); });
        card.addEventListener('mouseleave', () => clearTimeout(card._hoverTimeout));
        card.addEventListener('pointermove', (ev) => {
          if (window.innerWidth <= 900) return;
          const r = card.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const px = (ev.clientX - cx) / (r.width / 2);
          const py = (ev.clientY - cy) / (r.height / 2);
          const rx = (py * 6).toFixed(2), ry = (px * -8).toFixed(2);
          card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
          const layer = card.querySelector('.card-layer');
          if (layer) layer.style.transform = `translate3d(${px * -8}px, ${py * -6}px, 0)`;
          card.classList.add('tilt');
        });
        card.addEventListener('pointerleave', () => {
          card.style.transform = '';
          const layer = card.querySelector('.card-layer');
          if (layer) layer.style.transform = '';
          card.classList.remove('tilt');
        });
      });

      // include your swipe/drag logic or keep simple click/hover for now
      // (If you want, paste your initSwipeDrag here — it will work the same.)
    }

    // wire day buttons: protect if none found
    dayBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dayBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        buildTrackFor(btn.getAttribute('data-day') || '1');
      });
    });

    // init default
    buildTrackFor('1');

    // re-center on resize
    window.addEventListener('resize', () => setTimeout(()=> centerCard(currentIndex, true), 60), { passive: true });

  } catch (err) {
    console.error('[Schedule] Unexpected error:', err);
  }
})();



    /* ---------------------------
       3) Speakers: build rich cards
       --------------------------- */
    (function buildSpeakerCards(){
      const speakersData = [
        {
          name: "Dr. Ramesh Kumar Mishra",
          title: "Professor of cognitive science at the University of Hyderabad",
          topText: 'Cognitive science, with research interests in attention, consciousness, perception, and bilingualism',
          img: "Prof.Ramesh_Mishra.png",
          
        },
        {
          name: "Bodhisattwa Sanghapriya",
          title: "Founder & CEO, IG Drones",
          topText: 'Building a range of drones for surveillance & combat, with a focus on indigenous strength & global standards ',
          img: "IG-Drones.png",
          
        },
        {
          name: "Dr. Ashesh Padhy",
          title: "Executive Vice President & Head Odisha, JSW ",
          topText: 'Currently, heading Mining and Steel projects of JSW Steel in Odisha',
          img: "JSW.png",
    
        },
      ];

      const grid = document.getElementById('speakerGrid');
      if (!grid) return;
      grid.innerHTML = '';

      speakersData.forEach(sp => {
        const card = document.createElement('article');
        card.className = 'speaker-card';
        card.innerHTML = `
          <div class="top">
            <div class="top-copy">${sp.topText}</div>
          </div>
          <div class="meta">
            <div class="info">
              <h3>${escapeHtml(sp.name)}</h3>
              <p>${escapeHtml(sp.title)}</p>
            </div>
          </div>
          <img class="portrait" src="${escapeHtml(sp.img)}" alt="${escapeHtml(sp.name)} portrait" />
          
          </div>`;
        grid.appendChild(card);
      });
    })();

    /* ---------------------------
       FAQ accordion (permanent): single-open, smooth height animation, keyboard support
       --------------------------- */
   /* ===== Elegant FAQ accordion (single-open) ===== */
(function elegantFAQ() {
  const faqRoot = document.querySelector('.faq-list');
  if (!faqRoot) return;

  const items = Array.from(faqRoot.querySelectorAll('.faq-item'));

  // helper: collapse element
  function collapse(item) {
    const panel = item.querySelector('.faq-a');
    if (!panel) return;
    panel.style.maxHeight = panel.scrollHeight + 'px'; // ensure current height set before collapse
    requestAnimationFrame(() => {
      panel.style.maxHeight = '0px';
      panel.style.opacity = '0';
    });
    item.classList.remove('open');
    const btn = item.querySelector('.faq-q');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  // helper: expand
  function expand(item) {
    const panel = item.querySelector('.faq-a');
    if (!panel) return;
    // close other items
    items.forEach(it => { if (it !== item) collapse(it); });
    item.classList.add('open');
    const btn = item.querySelector('.faq-q');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    panel.style.display = 'block';
    // set exact height for smooth animation
    const natural = panel.scrollHeight;
    panel.style.maxHeight = '0px';
    panel.style.opacity = '0';
    requestAnimationFrame(() => {
      panel.style.maxHeight = natural + 'px';
      panel.style.opacity = '1';
    });
    panel.setAttribute('aria-hidden', 'false');

    // ensure it is visible enough for reading
    setTimeout(() => {
      const rect = item.getBoundingClientRect();
      if (rect.top < 80 || rect.bottom > (window.innerHeight - 80)) {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 260);
  }

  // click & keyboard handlers
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;

    // initialize hidden state
    panel.style.overflow = 'hidden';
    panel.style.maxHeight = '0px';
    panel.style.opacity = '0';
    panel.style.display = 'block'; // allow measurement; animation will collapse to 0
    panel.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.classList.contains('open')) collapse(item);
      else expand(item);
    });

    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        btn.click();
      } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        const next = items[(items.indexOf(item) + 1) % items.length];
        next.querySelector('.faq-q').focus();
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        const prev = items[(items.indexOf(item) - 1 + items.length) % items.length];
        prev.querySelector('.faq-q').focus();
      }
    });
  });

  // optionally open first FAQ by default (comment/uncomment)
  // if (items[0]) expand(items[0]);

  // responsive: recompute open panel heights on resize
  window.addEventListener('resize', () => {
    items.forEach(it => {
      if (it.classList.contains('open')) {
        const panel = it.querySelector('.faq-a');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
})();

    /* ---------------------------
       5) Simple reveal-on-scroll
       --------------------------- */
    try {
      const reveals = document.querySelectorAll('section, .card, .speaker, .price');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-active');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach(r => observer.observe(r));
    } catch (err) {}

    /* ---------------------------
       6) Optional: purchase button demo behavior
       --------------------------- */
    Array.from(document.querySelectorAll('.btn-glow, .btn-outline')).forEach(btn => {
      btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#')) return;
        if (!href) {
          e.preventDefault();
          const proceed = confirm('This will redirect to the ticket checkout (demo). Continue?');
          if (proceed) {
            const schedule = document.getElementById('schedule');
            if (schedule) schedule.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    /* ---------------------------
       7) Accessibility: Tabs roles & keyboard
       --------------------------- */
    if (tabs.length) {
      tabs.forEach((btn, idx) => {
        btn.setAttribute('role', 'tab');
        btn.setAttribute('tabindex', btn.classList.contains('active') ? '0' : '-1');
        btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');

        btn.addEventListener('keydown', (ev) => {
          if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
            ev.preventDefault();
            const currentIndex = tabs.indexOf(document.activeElement);
            let nextIndex = currentIndex;
            if (ev.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
            else nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            tabs[nextIndex].focus();
            tabs[nextIndex].click();
          }
        });

        btn.addEventListener('click', () => {
          tabs.forEach(b => b.setAttribute('tabindex', '-1'));
          btn.setAttribute('tabindex', '0');
        });
      });
    }

    /* ---------------------------
       8) Perks Section Scroll Line Animation
       --------------------------- */
    document.addEventListener('scroll', () => {
      const perks = document.querySelector('.perks-section');
      const bar = document.querySelector('.perks-right');

      if (!perks || !bar) return;

      const rect = perks.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      const scrollStart = windowHeight * 0.1;
      const scrollEnd = windowHeight * 0.8;
      const visible = Math.min(Math.max((windowHeight - rect.top - scrollStart) / (rect.height - scrollEnd), 0), 1);

      // Apply to CSS variable
      bar.style.setProperty('--line-progress', `${visible * 100}%`);
    });

  }); // DOMContentLoaded end

})();

// Reorders speaker card DOM and removes badges/logos.
// Run once (include at bottom of your script.js or run in browser console).
(function normalizeSpeakerCards(){
  const cards = document.querySelectorAll('.speaker-card');
  cards.forEach(card => {
    // Remove bottom badge/logo if present
    const badge = card.querySelector('.badge');
    if (badge) badge.remove();

    // Locate portrait and meta blocks
    const portrait = card.querySelector('.portrait');
    const meta = card.querySelector('.meta');

    // If portrait exists, ensure it's moved before meta so name/title will be below it
    if (portrait && meta) {
      // move portrait into the flow: append before meta
      // if portrait currently absolute, keep it but still reorder DOM to simplify CSS
      meta.parentNode.insertBefore(portrait, meta);
    }

    // Make sure meta is block and centered (in case earlier JS set flex)
    if (meta) {
      meta.style.display = 'block';
      meta.style.textAlign = 'center';
    }
  });
})();
/* ===== Final hero aurora + glass parallax ===== */
(function finalHeroEnhance(){
  const canvas = document.getElementById('final-aurora');
  const glass = document.getElementById('glassCard');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w=0,h=0, raf;

  function resize(){
    w = canvas.clientWidth || canvas.parentElement.clientWidth || window.innerWidth;
    h = canvas.clientHeight || canvas.parentElement.clientHeight || window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  // moving bands and soft blobs
  const blobs = Array.from({length: 20}, ()=>({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 40 + Math.random()*140,
    hue: 180 + Math.random()*140,
    a: 0.02 + Math.random()*0.12,
    vx: (Math.random()-0.5)*0.12,
    vy: -0.02 - Math.random()*0.08
  }));
  let t = 0;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function draw(){
    ctx.clearRect(0,0,w,h);

    // dark base
    const base = ctx.createLinearGradient(0,0,0,h);
    base.addColorStop(0, '#04060a'); base.addColorStop(1, '#020308');
    ctx.fillStyle = base; ctx.fillRect(0,0,w,h);

    // flowing translucent bands
    for(let i=0;i<3;i++){
      const amplitude = 30 + i*30;
      const speed = 0.0009 + i*0.0007;
      ctx.beginPath();
      const baseY = h*0.6 - i*30;
      ctx.moveTo(0,h);
      for(let x=0;x<=w;x+=18){
        const y = baseY + Math.sin((x*0.004) + t*speed + i) * (amplitude + Math.cos(t*0.001+i)*20);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w,h); ctx.closePath();

      const g = ctx.createLinearGradient(0, baseY-90, 0, h);
      if (i===0) { g.addColorStop(0, 'rgba(212,0,255,0.06)'); g.addColorStop(0.5,'rgba(0,198,255,0.03)'); g.addColorStop(1,'rgba(0,0,0,0)'); }
      else if (i===1){ g.addColorStop(0,'rgba(90,10,120,0.05)'); g.addColorStop(0.6,'rgba(0,140,200,0.02)'); g.addColorStop(1,'rgba(0,0,0,0)'); }
      else { g.addColorStop(0,'rgba(14,6,22,0.04)'); g.addColorStop(0.6,'rgba(0,75,120,0.015)'); g.addColorStop(1,'rgba(0,0,0,0)'); }
      ctx.fillStyle = g; ctx.fill();
    }

    // blobs
    for(let b of blobs){
      const rg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      rg.addColorStop(0, `hsla(${b.hue},85%,55%,${b.a})`);
      rg.addColorStop(0.3, `hsla(${b.hue},75%,55%,${b.a*0.28})`);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.fill();
      if(!reduced){
        b.x += b.vx + Math.sin((t+b.r)*0.0004)*0.12;
        b.y += b.vy;
        if (b.y + b.r < -80) { b.y = h + 40; b.x = Math.random()*w; }
        if (b.x < -120) b.x = w + 120;
        if (b.x > w + 120) b.x = -120;
      }
    }

    // vignette
    const vign = ctx.createRadialGradient(w/2,h/2, Math.min(w,h)*0.15, w/2,h/2, Math.max(w,h));
    vign.addColorStop(0, 'rgba(0,0,0,0)');
    vign.addColorStop(1, 'rgba(0,0,0,0.46)');
    ctx.fillStyle = vign; ctx.fillRect(0,0,w,h);

    t += 16;
  }

  if (!reduced) {
    (function loop(){ draw(); raf = requestAnimationFrame(loop); })();
  } else {
    draw();
  }

  // subtle parallax & tilt on glass card (mouse and deviceorientation fallback)
  if (glass && !reduced) {
    const limiter = 0.15;
    let rx = 0, ry = 0, tx = 0, ty = 0;

    function onMove(e){
      const rect = glass.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
      const clientY = (e.touches ? e.touches[0].clientY : e.clientY);
      const dx = (clientX - cx) / rect.width;
      const dy = (clientY - cy) / rect.height;
      ry = dx * 12; rx = -dy * 8;
      tx = -dx * 8; ty = -dy * 8;
    }
    let rafPar = null;
    function animateParallax(){
      if (!glass) return;
      glass.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
      glass.style.boxShadow = `0 30px 90px rgba(2,6,20,0.6), ${Math.abs(ry)*0.8}px ${Math.abs(rx)*0.8}px 40px rgba(0,0,0,0.28)`;
      rafPar = requestAnimationFrame(animateParallax);
    }
    window.addEventListener('mousemove', onMove, {passive:true});
    window.addEventListener('touchmove', onMove, {passive:true});
    animateParallax();

    // slight idle reset for motion stability
    let idle;
    function resetIdle(){
      clearTimeout(idle);
      idle = setTimeout(()=>{ rx=0; ry=0; tx=0; ty=0; }, 1200);
    }
    window.addEventListener('mousemove', resetIdle, {passive:true});
  }

  // cleanup handlers when leaving page
  window.addEventListener('pagehide', ()=>{ if (raf) cancelAnimationFrame(raf); });
})();
