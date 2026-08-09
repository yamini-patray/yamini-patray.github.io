/* ============================================================
   Yamini Patray — Portfolio interactions
   ============================================================ */
(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Split hero title into chars ---------- */
  document.querySelectorAll("[data-split]").forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.style.setProperty("--d", String(120 + i * 45));
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
    });
  });

  /* ---------- Entrance ---------- */
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));

  /* ---------- Scroll reveals with stagger ---------- */
  const groups = new Map();
  document.querySelectorAll(".reveal").forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    el.style.setProperty("--rd", String(groups.get(parent) * 90));
    groups.set(parent, groups.get(parent) + 1);
  });

  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

  /* ---------- Masked line reveals for section titles ---------- */
  document.querySelectorAll(".lines").forEach((el) => {
    el.querySelectorAll(".line").forEach((line, i) => {
      line.style.setProperty("--ld", String(i * 110));
    });
    revealIO.observe(el);
  });

  /* ---------- Animated counters ---------- */
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) {
      el.textContent = prefix + target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- Journey accordion ---------- */
  const jobs = document.querySelectorAll(".job");
  jobs.forEach((job) => {
    const head = job.querySelector(".job__head");
    head.addEventListener("click", () => {
      const isOpen = job.classList.contains("is-open");
      jobs.forEach((j) => {
        j.classList.remove("is-open");
        j.querySelector(".job__head").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        job.classList.add("is-open");
        head.setAttribute("aria-expanded", "true");
        setTimeout(() => {
          head.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "nearest" });
        }, 420);
      }
    });
  });
  if (jobs.length) {
    jobs[0].classList.add("is-open");
    jobs[0].querySelector(".job__head").setAttribute("aria-expanded", "true");
  }

  /* ---------- Header state ---------- */
  const header = document.getElementById("header");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    header.classList.toggle("is-hidden", y > lastY && y > 320 && !document.body.classList.contains("menu-open"));
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  const navLinks = document.querySelectorAll(".header__link");
  const sectionIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  ["profile", "journey", "expertise", "education"].forEach((id) => {
    const s = document.getElementById(id);
    if (s) sectionIO.observe(s);
  });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menuOverlay");
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuToggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- Custom cursor ---------- */
  if (finePointer && !prefersReduced) {
    document.body.classList.add("has-cursor");
    const cursor = document.querySelector(".cursor");
    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    let mx = -100, my = -100, rx = -100, ry = -100;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });

    (function follow() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(follow);
    })();

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
    document.querySelectorAll(".job__head").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-job"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-job"));
    });
    window.addEventListener("mousedown", () => cursor.classList.add("is-down"));
    window.addEventListener("mouseup", () => cursor.classList.remove("is-down"));
  }

  /* ---------- Magnetic elements ---------- */
  if (finePointer && !prefersReduced) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
        el.style.transform = "";
        setTimeout(() => (el.style.transition = ""), 500);
      });
    });
  }

  /* ---------- Hero talent-network canvas ---------- */
  const canvas = document.getElementById("netCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const ACCENT = "224, 83, 43";
    const CREAM = "242, 237, 227";
    let nodes = [];
    let w = 0, h = 0, dpr = 1;
    let mouse = { x: -9999, y: -9999 };
    let running = false;
    let rafId = null;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 16000), 90);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.8,
        hot: Math.random() < 0.14,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const linkDist = Math.min(w, h) * 0.16 + 60;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const o = (1 - d / linkDist) * 0.14;
            ctx.strokeStyle = `rgba(${a.hot || b.hot ? ACCENT : CREAM}, ${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 140) {
          const o = (1 - md / 140) * 0.35;
          ctx.strokeStyle = `rgba(${ACCENT}, ${o})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = a.hot ? `rgba(${ACCENT}, 0.95)` : `rgba(${CREAM}, 0.55)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const setRunning = (on) => {
      if (prefersReduced) { draw(); return; }
      if (on && !running) { running = true; loop(); }
      else if (!on && running) { running = false; cancelAnimationFrame(rafId); }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const hero = canvas.closest(".hero");
    hero.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }, { passive: true });
    hero.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });

    const heroIO = new IntersectionObserver(
      (entries) => setRunning(entries[0].isIntersecting && !document.hidden),
      { threshold: 0.05 }
    );
    heroIO.observe(hero);
    document.addEventListener("visibilitychange", () => {
      setRunning(!document.hidden && !prefersReduced);
      if (document.hidden) setRunning(false);
    });
    if (prefersReduced) draw();
  }

  /* ---------- Eased anchor scrolling ---------- */
  document.documentElement.style.scrollBehavior = "auto";
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const smoothTo = (targetY) => {
    const startY = window.scrollY;
    const dist = targetY - startY;
    if (prefersReduced || Math.abs(dist) < 2) {
      window.scrollTo(0, targetY);
      return;
    }
    const dur = Math.min(1250, 480 + Math.abs(dist) * 0.28);
    let t0 = 0;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      window.scrollTo(0, startY + dist * easeInOut(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (a.classList.contains("skip-link")) return;
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const el = id.length > 1 ? document.querySelector(id) : null;
      e.preventDefault();
      const y = el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - 68) : 0;
      smoothTo(y);
      if (id.length > 1) history.pushState(null, "", id);
    });
  });

  /* ---------- Scroll progress + hero parallax + stack depth ---------- */
  const progress = document.getElementById("progress");
  const heroSec = document.querySelector(".hero");
  const heroInner = document.querySelector(".hero__inner");
  const stackPanels = [...document.querySelectorAll(".panel")];
  let panelTops = [];
  const cachePanelTops = () => {
    panelTops = stackPanels.map((p) => parseFloat(getComputedStyle(p).top) || 0);
  };
  cachePanelTops();
  window.addEventListener("resize", cachePanelTops, { passive: true });
  let fxQueued = false;
  const scrollFx = () => {
    fxQueued = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (!prefersReduced && heroSec && y < heroSec.offsetHeight * 1.25) {
      const p = Math.min(y / heroSec.offsetHeight, 1);
      heroInner.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      heroInner.style.opacity = String(1 - p * 0.9);
      if (canvas) canvas.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
    }
    if (!prefersReduced && stackPanels.length > 1) {
      const vh = window.innerHeight;
      for (let i = 0; i < stackPanels.length - 1; i++) {
        const nextTop = stackPanels[i + 1].getBoundingClientRect().top;
        const pr = Math.min(Math.max((vh - nextTop) / (vh - panelTops[i] - 40), 0), 1);
        stackPanels[i].style.transform = pr > 0 ? `scale(${1 - pr * 0.045})` : "";
        stackPanels[i].style.filter = pr > 0 ? `brightness(${1 - pr * 0.08})` : "";
      }
    }
  };
  window.addEventListener("scroll", () => {
    if (!fxQueued) {
      fxQueued = true;
      requestAnimationFrame(scrollFx);
    }
  }, { passive: true });
  scrollFx();

  /* ---------- Scroll-velocity marquees ---------- */
  if (!prefersReduced) {
    const rows = [];
    document.querySelectorAll(".marquee__track").forEach((el) => rows.push({ el, dir: -1, base: 0.6, boost: 0.14 }));
    document.querySelectorAll(".strip__row--left").forEach((el) => rows.push({ el, dir: -1, base: 0.4, boost: 0.06 }));
    document.querySelectorAll(".strip__row--right").forEach((el) => rows.push({ el, dir: 1, base: 0.4, boost: 0.06 }));
    const measure = () => rows.forEach((r) => {
      r.half = r.el.scrollWidth / 2;
      if (typeof r.x !== "number") r.x = r.dir === 1 ? -r.half : 0;
    });
    measure();
    window.addEventListener("resize", measure, { passive: true });
    let lastYY = window.scrollY;
    let vel = 0;
    (function marqueeLoop() {
      const y = window.scrollY;
      vel = vel * 0.88 + Math.min(Math.abs(y - lastYY), 80) * 0.12;
      lastYY = y;
      for (const r of rows) {
        if (!r.half) continue;
        r.x += r.dir * (r.base + vel * r.boost * 4);
        if (r.x <= -r.half) r.x += r.half;
        else if (r.dir === 1 && r.x >= 0) r.x -= r.half;
        r.el.style.transform = `translate3d(${r.x}px, 0, 0)`;
      }
      requestAnimationFrame(marqueeLoop);
    })();
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
