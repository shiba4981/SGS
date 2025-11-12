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

    /* ---------------------------
       2) Schedule renderer (modern)
       --------------------------- */
    const scheduleData = {
      "1": [
        { time: "10:00 AM", title: "Inauguration & Welcome Address", desc: "Opening ceremony with esteemed guests." },
        { time: "11:00 AM", title: "Yuva Swadeshi Navachar Pradarshani", desc: "Interactive exhibition of student and startup innovations." },
        { time: "05:00 PM", title: "Keynote: Jeff J Hunter", desc: "Leveraging Remote Teams & AI" },
        { time: "08:35 PM", title: "Star Musical Night", desc: "An unforgettable performance by Sunidhi Chauhan / Ankit Tiwari." }
      ],
      "2": [
        { time: "09:30 AM", title: "Panel: Policy & Governance", desc: "Experts discuss AI policy and governance." },
        { time: "11:00 AM", title: "Student Pitch Round", desc: "Selected student startups pitch to mentors." },
        { time: "02:00 PM", title: "Hands-on Labs & Mentorship", desc: "Practical sessions on responsible AI." },
        { time: "06:00 PM", title: "Fireside Chats", desc: "Informal conversations with leaders." }
      ],
      "3": [
        { time: "10:00 AM", title: "Awards & Prize Distribution", desc: "Recognising outstanding contributions." },
        { time: "01:00 PM", title: "Hackathon Demos", desc: "Short demos from hackathon finalists." },
        { time: "03:00 PM", title: "Closing Remarks", desc: "Summation and next steps." },
        { time: "05:00 PM", title: "Cultural Farewell", desc: "A cultural send-off." }
      ]
    };

    const tabs = Array.from(document.querySelectorAll('.date-tab'));
    const daySlots = document.getElementById('daySlots');

    function renderSlots(day) {
      if (!daySlots) return;
      const items = scheduleData[day] || [];
      daySlots.innerHTML = '';
      if (!items.length) {
        daySlots.innerHTML = '<div class="slot empty">No schedule for this day.</div>';
        return;
      }
      items.forEach(it => {
        const el = document.createElement('div');
        el.className = 'slot';
        el.innerHTML = `
          <div class="slot-time">${escapeHtml(it.time)}</div>
          <div class="slot-body">
            <div class="slot-title">${escapeHtml(it.title)}</div>
            <div class="slot-desc">${escapeHtml(it.desc)}</div>
          </div>
        `;
        daySlots.appendChild(el);
      });
    }

    function setActiveTab(targetBtn) {
      if (!tabs.length) return;
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      targetBtn.classList.add('active');
      targetBtn.setAttribute('aria-selected', 'true');
    }

    if (tabs.length && daySlots) {
      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
          setActiveTab(btn);
          renderSlots(btn.getAttribute('data-day'));
          if (window.innerWidth < 900) {
            daySlots.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });

      const active = document.querySelector('.date-tab.active') || tabs[0];
      if (active) {
        setActiveTab(active);
        renderSlots(active.getAttribute('data-day'));
      }
    }

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
          title: "Vice President & Head Odisha, JSW ",
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
if (sp.name && /Ashesh\s+Padhy/i.test(sp.name)) {
  card.classList.add('fix-name');
}

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
   (function initFAQAccordionPermanent(){
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  if(!faqItems.length) return;

  function closeAll(except){
    faqItems.forEach(it=>{
      if(it === except) return;
      it.classList.remove('open');
      const a = it.querySelector('.a');
      const b = it.querySelector('.q');
      if(a){
        a.style.transition = 'max-height 360ms cubic-bezier(.2,.9,.3,1), opacity 220ms ease';
        a.style.maxHeight = a.scrollHeight + 'px';
        requestAnimationFrame(()=>{ a.style.maxHeight = '0px'; a.style.opacity = '0'; });
        a.addEventListener('transitionend', function hide(e){ if(e.propertyName==='max-height'){ a.style.display='none'; a.removeEventListener('transitionend', hide); }});
      }
      if(b) b.setAttribute('aria-expanded','false');
    });
  }

  faqItems.forEach(item=>{
    const btn = item.querySelector('.q');
    const ans = item.querySelector('.a');
    if(!btn || !ans) return;

    ans.style.overflow = 'hidden';
    ans.style.maxHeight = '0px';
    ans.style.opacity = '0';
    ans.style.display = 'none';
    ans.setAttribute('aria-hidden','true');
    btn.setAttribute('aria-expanded','false');

    btn.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const isOpen = item.classList.contains('open');
      closeAll(isOpen ? null : item);
      if(!isOpen){
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        ans.setAttribute('aria-hidden','false');
        ans.style.display = 'block';
        const natural = ans.scrollHeight;
        ans.style.maxHeight = '0px';
        ans.style.opacity = '0';
        ans.style.transition = 'max-height 360ms cubic-bezier(.2,.9,.3,1), opacity 220ms ease';
        requestAnimationFrame(()=>{ ans.style.maxHeight = natural + 'px'; ans.style.opacity='1'; });
        ans.addEventListener('transitionend', function opened(e){ if(e.propertyName==='max-height'){ ans.style.maxHeight = 'none'; ans.removeEventListener('transitionend', opened); }});
        const r = item.getBoundingClientRect();
        if(r.top < 120) window.scrollBy({ top: r.top - 100, behavior: 'smooth' });
      } else {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        ans.setAttribute('aria-hidden','true');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        requestAnimationFrame(()=>{ ans.style.maxHeight = '0px'; ans.style.opacity='0'; });
        ans.addEventListener('transitionend', function closed(e){ if(e.propertyName==='max-height'){ ans.style.display = 'none'; ans.removeEventListener('transitionend', closed); }});
      }
    });

    btn.addEventListener('keydown', (ev)=>{ if(ev.key==='Enter' || ev.key===' '){ ev.preventDefault(); btn.click(); }});
    window.addEventListener('resize', ()=>{ if(item.classList.contains('open')){ ans.style.maxHeight = ans.scrollHeight + 'px'; setTimeout(()=> ans.style.maxHeight='none', 350); }});
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
