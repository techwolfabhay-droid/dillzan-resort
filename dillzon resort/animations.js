/* ════════════════════════════════════════
   DILLZAN RESORT — ANIMATIONS.JS
   Fun & Vibrant Effects Layer
   Add <script src="animations.js"></script>
   just BEFORE </body>
════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. INJECT FLOATING BUBBLES INTO HERO ── */
  function injectBubbles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Avoid duplicate inject
    if (hero.querySelector('.dz-bubbles')) return;

    const wrap = document.createElement('div');
    wrap.className = 'dz-bubbles';

    for (let i = 0; i < 12; i++) {
      const b = document.createElement('div');
      b.className = 'dz-bubble';
      wrap.appendChild(b);
    }

    // Insert after hero-slider so it's above the slider but below overlay
    const slider = hero.querySelector('.hero-slider');
    if (slider) {
      slider.insertAdjacentElement('afterend', wrap);
    } else {
      hero.prepend(wrap);
    }
  }

  /* ── 2. CURSOR SPARKLE TRAIL ── */
  function initSparkleTrail() {
    // Only desktop
    if (window.innerWidth < 768) return;

    const colors = ['#FFD700', '#F5C842', '#A67C10', '#fff8dc', '#ffe066'];
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTime < 55) return; // throttle
      lastTime = now;

      const spark = document.createElement('div');
      const size = Math.random() * 8 + 4;
      spark.style.cssText = `
        position: fixed;
        z-index: 99998;
        pointer-events: none;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - size / 2}px;
        top:  ${e.clientY - size / 2}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        opacity: 0.85;
        transition: transform 0.6s ease, opacity 0.6s ease;
      `;
      document.body.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${(Math.random() - 0.5) * 40}px, ${-Math.random() * 40 - 10}px) scale(0.1)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 650);
    });
  }

  /* ── 3. HERO TITLE LETTER-BY-LETTER EFFECT ── */
  function initHeroLetters() {
    const main = document.querySelector('.ht-main');
    if (!main || main.dataset.animated) return;
    main.dataset.animated = '1';

    const text = main.textContent.trim();
    main.innerHTML = text
      .split('')
      .map((ch, i) =>
        `<span style="display:inline-block;
          animation: heroLetterPop 0.5s cubic-bezier(.22,.68,0,1.35) ${0.75 + i * 0.06}s both;">
          ${ch === ' ' ? '&nbsp;' : ch}
        </span>`
      )
      .join('');

    // Inject keyframe if not already
    if (!document.getElementById('dzLetterKF')) {
      const s = document.createElement('style');
      s.id = 'dzLetterKF';
      s.textContent = `
        @keyframes heroLetterPop {
          from { opacity:0; transform: translateY(24px) scale(0.6) rotate(-8deg); }
          to   { opacity:1; transform: translateY(0)  scale(1)   rotate(0deg);   }
        }
      `;
      document.head.appendChild(s);
    }
  }

  /* ── 4. STAT NUMBERS BOUNCE WHEN VISIBLE ── */
  function initStatBounce() {
    const statsBar = document.getElementById('statsBar');
    if (!statsBar) return;

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.stat').forEach((s, i) => {
          setTimeout(() => {
            s.style.animation = 'none';
            void s.offsetWidth; // reflow
            s.style.animation = `statPop 0.6s cubic-bezier(.22,.68,0,1.35) both`;
          }, i * 120);
        });
        obs.disconnect();
      }
    }, { threshold: 0.4 });

    obs.observe(statsBar);
  }

  /* ── 5. ROOM CARDS STAGGERED ENTRANCE ── */
  function initRoomStagger() {
    const cards = document.querySelectorAll('.rc');
    if (!cards.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const idx = Array.from(cards).indexOf(card);
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, idx * 80);
          obs.unobserve(card);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.95)';
      card.style.transition = 'opacity 0.55s cubic-bezier(.22,.68,0,1.2), transform 0.55s cubic-bezier(.22,.68,0,1.2)';
      obs.observe(card);
    });
  }

  /* ── 6. GALLERY ITEMS STAGGERED ── */
  function initGalleryStagger() {
    // Re-run whenever gallery is re-rendered
    const observer = new MutationObserver(() => {
      const items = document.querySelectorAll('.gal-item:not([data-dz-anim])');
      items.forEach((item, i) => {
        item.dataset.dzAnim = '1';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.88) rotate(-1deg)';
        item.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s cubic-bezier(.22,.68,0,1.2) ${i * 0.05}s`;

        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1) rotate(0deg)';
        }, 80 + i * 50);
      });
    });

    const galGrid = document.getElementById('galGrid');
    if (galGrid) observer.observe(galGrid, { childList: true });
  }

  /* ── 7. SECTION WAVE DIVIDERS ── */
  function injectWaveDividers() {
    const sections = [
      { id: 'about',     color: '#F5F0E8' },
      { id: 'owner',     color: '#F5F0E8' },
      { id: 'rooms',     color: '#EDE8DF' },
      { id: 'amenities', color: '#F5F0E8' },
    ];

    sections.forEach(({ id, color }) => {
      const sec = document.getElementById(id);
      if (!sec || sec.querySelector('.dz-wave-top')) return;

      const wave = document.createElement('div');
      wave.className = 'dz-wave-top';
      wave.style.cssText = `
        position: absolute;
        top: -1px; left: 0; right: 0;
        overflow: hidden;
        line-height: 0;
        pointer-events: none;
        z-index: 1;
      `;
      wave.innerHTML = `
        <svg viewBox="0 0 1200 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style="display:block;width:100%;height:24px;">
          <path d="M0,12 C200,24 400,0 600,12 C800,24 1000,0 1200,12 L1200,0 L0,0 Z"
            fill="${color}" opacity="0.8"/>
        </svg>`;

      sec.style.position = 'relative';
      sec.prepend(wave);
    });
  }

  /* ── 8. SCROLL PROGRESS BAR (Top of page) ── */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'dzScrollBar';
    bar.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg, #8B6508, #FFD700, #A67C10);
      z-index: 10001;
      transition: width 0.1s linear;
      pointer-events: none;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (scrollTop / docHeight * 100) + '%';
    }, { passive: true });
  }

  /* ── 9. MEGA MENU ITEMS STAGGER ── */
  function initMegaStagger() {
    document.querySelectorAll('.nav-mega-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        setTimeout(() => {
          const items = document.querySelectorAll('.mega-menu.open .mega-item');
          items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-12px)';
            item.style.transition = `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`;
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            });
          });
        }, 30);
      });
    });
  }

  /* ── 10. OWNER PHOTO ENTRANCE ── */
  function initOwnerAnim() {
    const photo = document.getElementById('ownerPhoto');
    if (!photo) return;

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        photo.style.animation = 'ownerReveal 0.9s cubic-bezier(.22,.68,0,1.2) forwards';

        if (!document.getElementById('dzOwnerKF')) {
          const s = document.createElement('style');
          s.id = 'dzOwnerKF';
          s.textContent = `
            @keyframes ownerReveal {
              from { opacity:0; transform: scale(0.8) rotate(-6deg); filter: blur(6px); }
              to   { opacity:1; transform: scale(1)   rotate(0deg);  filter: blur(0);  }
            }
          `;
          document.head.appendChild(s);
        }
        obs.disconnect();
      }
    }, { threshold: 0.3 });

    obs.observe(photo);
  }

  /* ── INIT ALL ── */
  function init() {
    injectBubbles();
    initHeroLetters();
    initStatBounce();
    initRoomStagger();
    initGalleryStagger();
    injectWaveDividers();
    initScrollProgress();
    initMegaStagger();
    initOwnerAnim();

    // Sparkle trail — desktop only, slight delay
    setTimeout(initSparkleTrail, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();