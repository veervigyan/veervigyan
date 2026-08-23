/* ============================================================
   VEER VIGYAN — mission control
   Modules: loader · nav · starfield · knowledge core ·
   reveals · scramble · counters · tilt · filters · quiz ·
   countdowns · scroll bus
   ============================================================ */
(function () {
  "use strict";

  var doc = document;
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE = window.matchMedia("(pointer: fine)").matches;
  var COARSE = window.matchMedia("(pointer: coarse)").matches;
  var LOW = Math.min(window.innerWidth, window.innerHeight) < 720 ||
            (navigator.hardwareConcurrency || 8) <= 4;
  var DPR = Math.min(window.devicePixelRatio || 1, LOW ? 1.5 : 2);

  /* ================= LOADER ================= */
  var loader = $("#loader");
  var loaderDone = false;
  function hideLoader() {
    if (loaderDone) return;
    loaderDone = true;
    if (loader) {
      loader.classList.add("done");
      setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 1000);
    }
    revealInit();
  }
  if (RM) {
    hideLoader();
  } else {
    setTimeout(hideLoader, 1450);
    window.addEventListener("load", function () { setTimeout(hideLoader, 400); });
  }

  /* ================= NAV ================= */
  var navShell = $(".nav-shell");
  var navToggle = $("#navToggle");
  var navMenu = $("#navMenu");

  function closeMenu() {
    if (!navMenu || !navMenu.classList.contains("open")) return;
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    doc.body.classList.remove("no-scroll");
  }
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      doc.body.classList.toggle("no-scroll", open);
    });
    $$("#navMenu a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ================= STARFIELD ================= */
  (function () {
    var cv = $("#stars");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var W = 0, H = 0, stars = [], t = 0, last = 0, running = true;
    var meteor = null, nextMeteor = 5000;

    function build() {
      var n = Math.round((window.innerWidth * window.innerHeight) / (LOW ? 16000 : 9000));
      stars.length = 0;
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random(), y: Math.random(),
          z: 0.3 + Math.random() * 0.7,
          r: (Math.random() * 1.1 + 0.35) * DPR,
          p: Math.random() * 6.283,
          s: 0.4 + Math.random() * 0.9
        });
      }
    }
    function resize() {
      W = cv.width = Math.floor(window.innerWidth * DPR);
      H = cv.height = Math.floor(window.innerHeight * DPR);
      cv.style.width = window.innerWidth + "px";
      cv.style.height = window.innerHeight + "px";
      build();
      if (RM) drawStatic();
    }
    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        ctx.globalAlpha = 0.5 * st.z;
        ctx.fillStyle = st.z > 0.75 ? "#cfeaff" : "#8fa3c0";
        ctx.beginPath();
        ctx.arc(st.x * W, st.y * H, st.r, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function frame(ts) {
      if (!running) return;
      requestAnimationFrame(frame);
      var dt = Math.min(40, ts - last); last = ts; t += dt * 0.001;
      ctx.clearRect(0, 0, W, H);
      var sy = window.scrollY || 0;
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        var x = st.x * W + Math.sin(t * st.s + st.p) * 2 * DPR;
        var y = (st.y * H - sy * st.z * 0.07 * DPR) % H;
        if (y < 0) y += H;
        ctx.globalAlpha = (0.22 + 0.5 * (0.5 + 0.5 * Math.sin(t * st.s * 1.4 + st.p))) * st.z;
        ctx.fillStyle = st.z > 0.75 ? "#cfeaff" : "#8fa3c0";
        ctx.beginPath(); ctx.arc(x, y, st.r, 0, 6.283); ctx.fill();
      }
      /* occasional meteor */
      nextMeteor -= dt;
      if (!meteor && nextMeteor <= 0) {
        meteor = { x: W * (0.2 + Math.random() * 0.6), y: -20, vx: (Math.random() * 2 - 1.4) * DPR, vy: (5 + Math.random() * 3) * DPR, life: 1 };
        nextMeteor = 6000 + Math.random() * 8000;
      }
      if (meteor) {
        meteor.x += meteor.vx * (dt / 16); meteor.y += meteor.vy * (dt / 16); meteor.life -= dt / 1400;
        var g = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.vx * 22, meteor.y - meteor.vy * 22);
        g.addColorStop(0, "rgba(200,240,255," + (0.9 * meteor.life) + ")");
        g.addColorStop(1, "rgba(200,240,255,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.4 * DPR;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.vx * 22, meteor.y - meteor.vy * 22);
        ctx.stroke();
        if (meteor.life <= 0 || meteor.y > H + 40) meteor = null;
      }
      ctx.globalAlpha = 1;
    }
    window.addEventListener("resize", resize, { passive: true });
    resize();
    if (!RM) {
      doc.addEventListener("visibilitychange", function () {
        if (doc.hidden) { running = false; }
        else if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
      });
      requestAnimationFrame(function (ts) { last = ts; frame(ts); });
    }
  })();

  /* ================= KNOWLEDGE CORE ================= */
  (function () {
    var cv = $("#coreCanvas");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var hero = $(".hero");
    var W = 0, H = 0, cx = 0, cy = 0, R = 0;
    var N = LOW ? 110 : 175;
    var GA = Math.PI * (3 - Math.sqrt(5));
    var pts = [], pairs = [], px, py, pz;
    var rings = [
      { rf: 1.28, tilt: 0.55, m: LOW ? 44 : 68, pts: null },
      { rf: 1.50, tilt: -0.28, m: LOW ? 44 : 68, pts: null },
      { rf: 1.74, tilt: 1.08, m: LOW ? 44 : 68, pts: null }
    ];
    var sats = [
      { ring: 0, a: 0.4, s: 0.34 },
      { ring: 1, a: 2.6, s: -0.24 },
      { ring: 2, a: 4.4, s: 0.17 }
    ];
    var rotX = -0.34, rotY = 0.5, tRotX = -0.34, tRotY = 0.5;
    var mx = 0, my = 0, t = 0, last = 0, visible = true, raf = null;
    var sprite;

    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2;
      var rad = Math.sqrt(Math.max(0, 1 - y * y));
      var th = GA * i;
      pts.push({ x: Math.cos(th) * rad, y: y, z: Math.sin(th) * rad });
    }
    for (var a = 0; a < N && pairs.length < 640; a++) {
      for (var b = a + 1; b < N; b++) {
        var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y, dz = pts[a].z - pts[b].z;
        if (dx * dx + dy * dy + dz * dz < 0.085) { pairs.push(a, b); if (pairs.length >= 640) break; }
      }
    }
    px = new Float32Array(N); py = new Float32Array(N); pz = new Float32Array(N);

    rings.forEach(function (rg) {
      rg.pts = [];
      var ct = Math.cos(rg.tilt), st = Math.sin(rg.tilt);
      for (var k = 0; k <= rg.m; k++) {
        var ang = (k / rg.m) * 6.283;
        var X = Math.cos(ang) * rg.rf, Z = Math.sin(ang) * rg.rf;
        rg.pts.push({ x: X, y: -Z * st, z: Z * ct });
      }
    });

    (function makeSprite() {
      var s = doc.createElement("canvas"); s.width = s.height = 96;
      var g = s.getContext("2d");
      var gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
      gr.addColorStop(0, "rgba(235,250,255,1)");
      gr.addColorStop(0.25, "rgba(95,217,255,.65)");
      gr.addColorStop(0.6, "rgba(95,217,255,.12)");
      gr.addColorStop(1, "rgba(95,217,255,0)");
      g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
      sprite = s;
    })();

    function resize() {
      var r = cv.getBoundingClientRect();
      if (r.width < 4) return;
      W = cv.width = Math.floor(r.width * DPR);
      H = cv.height = Math.floor(r.height * DPR);
      cx = W / 2; cy = H / 2; R = Math.min(W, H) * 0.31;
      if (RM) draw(0);
    }

    var _X = 0, _Y = 0, _S = 0, _Z = 0;
    function project(x, y, z) {
      var cz = Math.cos(rotY), sz = Math.sin(rotY);
      var x1 = x * cz + z * sz, z1 = -x * sz + z * cz;
      var cy2 = Math.cos(rotX), sy2 = Math.sin(rotX);
      var y2 = y * cy2 - z1 * sy2, z2 = y * sy2 + z1 * cy2;
      var s = 2.7 / (2.7 - z2 * 0.95);
      _X = cx + x1 * R * s; _Y = cy + y2 * R * s; _S = s; _Z = z2;
    }

    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      var pulse = 1 + Math.sin(now * 1.15) * 0.035;
      var i, j, d;

      /* aura */
      d = R * 3.1 * pulse;
      ctx.globalAlpha = 0.13 + Math.sin(now * 1.15) * 0.03;
      ctx.drawImage(sprite, cx - d / 2, cy - d / 2, d, d);

      /* lattice links */
      ctx.strokeStyle = "rgba(140,215,255,1)";
      ctx.lineWidth = Math.max(1, 0.6 * DPR);
      for (i = 0; i < pairs.length; i += 2) {
        var A = pairs[i], B = pairs[i + 1];
        ctx.globalAlpha = 0.028 + 0.075 * ((pz[A] + pz[B]) * 0.5 + 1) * 0.5;
        ctx.beginPath(); ctx.moveTo(px[A], py[A]); ctx.lineTo(px[B], py[B]); ctx.stroke();
      }

      /* rings, back pass */
      ctx.lineWidth = Math.max(1, 0.8 * DPR);
      rings.forEach(function (rg) {
        ctx.strokeStyle = "rgba(120,210,255,1)";
        for (var k = 0; k < rg.m; k++) {
          var p1 = rg.pts[k], p2 = rg.pts[k + 1];
          project(p1.x, p1.y, p1.z); var ax = _X, ay = _Y, az = _Z;
          project(p2.x, p2.y, p2.z);
          if (az < 0 && _Z < 0) {
            ctx.globalAlpha = 0.04 + 0.06 * (az + 1);
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(_X, _Y); ctx.stroke();
          }
        }
      });

      /* sphere points */
      for (i = 0; i < N; i++) {
        d = (pz[i] + 1) * 0.5;
        ctx.globalAlpha = 0.18 + 0.62 * d;
        ctx.fillStyle = i % 7 === 0 ? "#9fe6ff" : "#dfe9f5";
        ctx.beginPath();
        ctx.arc(px[i], py[i], (0.9 + 1.5 * d) * DPR, 0, 6.283);
        ctx.fill();
      }

      /* rings, front pass */
      rings.forEach(function (rg) {
        for (var k = 0; k < rg.m; k++) {
          var p1 = rg.pts[k], p2 = rg.pts[k + 1];
          project(p1.x, p1.y, p1.z); var ax = _X, ay = _Y, az = _Z;
          project(p2.x, p2.y, p2.z);
          if (az >= 0 || _Z >= 0) {
            ctx.globalAlpha = 0.05 + 0.16 * ((az + 1) * 0.5);
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(_X, _Y); ctx.stroke();
          }
        }
      });

      /* satellites */
      sats.forEach(function (sm) {
        var rg = rings[sm.ring];
        var ang = sm.a + now * sm.s;
        var ct = Math.cos(rg.tilt), st = Math.sin(rg.tilt);
        var X = Math.cos(ang) * rg.rf, Z = Math.sin(ang) * rg.rf;
        project(X, -Z * st, Z * ct);
        var sz = (13 + 5 * ((_Z + 1) * 0.5)) * DPR * _S * 0.62;
        ctx.globalAlpha = 0.5 + 0.4 * ((_Z + 1) * 0.5);
        ctx.drawImage(sprite, _X - sz / 2, _Y - sz / 2, sz, sz);
      });

      /* nucleus */
      d = R * 0.85 * pulse;
      ctx.globalAlpha = 0.5;
      ctx.drawImage(sprite, cx - d / 2, cy - d / 2, d, d);
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "#eef8ff";
      ctx.beginPath(); ctx.arc(cx, cy, 3.2 * DPR, 0, 6.283); ctx.fill();
      ctx.globalAlpha = 1;
    }

    function frame(ts) {
      raf = null;
      if (!visible || doc.hidden) return;
      var dt = Math.min(0.05, (ts / 1000 - last) || 0.016);
      last = ts / 1000;
      t += dt;
      rotY = t * 0.1 + mx * 0.5 + (window.scrollY || 0) * 0.0004;
      rotX = lerp(rotX, tRotX + my * 0.3, 0.06);

      for (var i = 0; i < N; i++) { project(pts[i].x, pts[i].y, pts[i].z); px[i] = _X; py[i] = _Y; pz[i] = _Z; }
      draw(t);
      raf = requestAnimationFrame(frame);
    }
    function start() { if (!raf && visible && !doc.hidden) { last = performance.now() / 1000; raf = requestAnimationFrame(frame); } }

    if (FINE && !RM && hero) {
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - 0.5;
        my = (e.clientY - r.top) / r.height - 0.5;
      }, { passive: true });
    }
    window.addEventListener("resize", resize, { passive: true });

    if (RM) {
      resize();
      for (var q = 0; q < N; q++) { project(pts[q].x, pts[q].y, pts[q].z); px[q] = _X; py[q] = _Y; pz[q] = _Z; }
      draw(0.8);
    } else {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) start();
      }, { threshold: 0 }).observe(cv);
      doc.addEventListener("visibilitychange", start);
      resize();
      start();
    }
  })();

  /* ================= SCRAMBLE ================= */
  var SCRAMBLE_CHARS = "ΔΨΩΣΦλπ∞∫·01×+";
  function scramble(el) {
    var final_ = el.getAttribute("data-text") || el.textContent;
    el.setAttribute("data-text", final_);
    var f = 0, total = Math.max(16, Math.round(final_.length * 1.7));
    (function step() {
      f++;
      var reveal = Math.floor((f / total) * final_.length), out = "";
      for (var i = 0; i < final_.length; i++) {
        var ch = final_[i];
        out += (i < reveal || ch === " ") ? ch : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      el.textContent = out;
      if (f < total) requestAnimationFrame(step);
      else el.textContent = final_;
    })();
  }

  /* ================= COUNTERS ================= */
  function countUp(el) {
    var end = parseFloat(el.getAttribute("data-count")) || 0;
    var suf = el.getAttribute("data-suffix") || "";
    if (RM) { el.textContent = end + suf; return; }
    var t0 = performance.now(), dur = 1500;
    (function u(now) {
      var p = clamp((now - t0) / dur, 0, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + suf;
      if (p < 1) requestAnimationFrame(u);
    })(t0);
  }

  /* ================= REVEALS ================= */
  var revealStarted = false;
  function revealInit() {
    if (revealStarted) return;
    revealStarted = true;
    var targets = $$(".reveal, .tcard, .mask-grp, [data-scramble], [data-count]");
    if (RM || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in"); });
      $$("[data-count]").forEach(function (el) {
        el.textContent = (el.getAttribute("data-count") || "0") + (el.getAttribute("data-suffix") || "");
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add("in");
        if (el.hasAttribute("data-scramble")) scramble(el);
        if (el.hasAttribute("data-count")) countUp(el);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ================= 3D TILT ================= */
  (function () {
    var cards = $$(".tcard");
    if (!cards.length) return;

    if (FINE && !RM) {
      cards.forEach(function (c) {
        var raf = 0, ev = null;
        c.addEventListener("pointerenter", function () { c.classList.add("hot"); });
        c.addEventListener("pointermove", function (e) {
          ev = e;
          if (raf) return;
          raf = requestAnimationFrame(function () {
            raf = 0;
            var r = c.getBoundingClientRect();
            var pxr = (ev.clientX - r.left) / r.width - 0.5;
            var pyr = (ev.clientY - r.top) / r.height - 0.5;
            c.style.setProperty("--ry", (pxr * 9).toFixed(2) + "deg");
            c.style.setProperty("--rx", (-pyr * 9).toFixed(2) + "deg");
            c.style.setProperty("--ty", "-9px");
            c.style.setProperty("--s", "1.02");
            c.style.setProperty("--mx", ((pxr + 0.5) * 100).toFixed(1) + "%");
            c.style.setProperty("--my", ((pyr + 0.5) * 100).toFixed(1) + "%");
          });
        }, { passive: true });
        c.addEventListener("pointerleave", function () {
          c.classList.remove("hot");
          c.style.setProperty("--rx", "0deg");
          c.style.setProperty("--ry", "0deg");
          c.style.setProperty("--ty", "0px");
          c.style.setProperty("--s", "1");
        });
      });
    } else if (COARSE) {
      var active = null;
      function release() {
        if (active) { active.classList.remove("hot", "lift"); active = null; }
      }
      cards.forEach(function (c) {
        c.addEventListener("touchstart", function () {
          if (active === c) return;
          release();
          c.classList.add("hot", "lift");
          active = c;
        }, { passive: true });
      });
      doc.addEventListener("touchstart", function (e) {
        if (active && !active.contains(e.target)) release();
      }, { passive: true });
    }
  })();

  /* ================= NOTES FILTER ================= */
  (function () {
    var chips = $$(".chip-btn");
    var cards = $$(".ncard");
    var countEl = $("#filterCount");
    if (!chips.length || !cards.length) return;
    chips.forEach(function (ch) {
      ch.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        ch.classList.add("active");
        var f = ch.getAttribute("data-filter"), n = 0;
        cards.forEach(function (c) {
          var show = f === "all" || c.getAttribute("data-subject") === f;
          c.classList.toggle("hide", !show);
          if (show) n++;
        });
        if (countEl) countEl.textContent = "Showing " + n + " of " + cards.length + " decks";
      });
    });
  })();

  /* ================= QUIZ ENGINE ================= */
  (function () {
    var modal = $("#quizModal");
    if (!modal) return;
    var QUIZ = {
      cosmic: [
        { q: "Which planet has the most confirmed moons?", a: ["Jupiter", "Saturn", "Neptune", "Uranus"], c: 1 },
        { q: "A light-year is a unit of…", a: ["Time", "Brightness", "Distance", "Speed"], c: 2 },
        { q: "The hottest planet in our solar system is…", a: ["Mercury", "Venus", "Mars", "Jupiter"], c: 1 }
      ],
      equation: [
        { q: "The derivative of x² with respect to x is…", a: ["x", "2x", "x²⁄2", "2"], c: 1 },
        { q: "π rounded to two decimal places is…", a: ["3.12", "3.14", "3.16", "3.18"], c: 1 },
        { q: "The solutions of x² = 49 are…", a: ["7 only", "−7 only", "±7", "±49"], c: 2 }
      ],
      element: [
        { q: "The symbol Au stands for…", a: ["Silver", "Aluminium", "Gold", "Argon"], c: 2 },
        { q: "The atomic number of oxygen is…", a: ["6", "8", "12", "16"], c: 1 },
        { q: "The most abundant gas in Earth’s atmosphere is…", a: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], c: 2 }
      ],
      body: [
        { q: "The largest organ of the human body is the…", a: ["Liver", "Skin", "Brain", "Lungs"], c: 1 },
        { q: "Oxygen is carried in blood by…", a: ["White blood cells", "Platelets", "Red blood cells", "Plasma proteins"], c: 2 },
        { q: "The powerhouse of the cell is the…", a: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi body"], c: 2 }
      ],
      quantum: [
        { q: "A photon is the quantum ofâ€¦", a: ["Charge", "Electromagnetic radiation", "Mass", "Gravity"], c: 1 },
        { q: "Position and momentum cannot both be known exactly â€” this is theâ€¦", a: ["Pauli principle", "Heisenberg uncertainty principle", "Superposition law", "Photoelectric law"], c: 1 },
        { q: "The speed of light in vacuum is approximatelyâ€¦", a: ["3Ã—10â¶ m/s", "3Ã—10â¸ m/s", "3Ã—10Â¹â° m/s", "3Ã—10âµ m/s"], c: 1 }
      ],
      pioneers: [
        { q: "Who won Nobel Prizes in two different sciences?", a: ["Isaac Newton", "Marie Curie", "Niels Bohr", "C.V. Raman"], c: 1 },
        { q: "The general theory of relativity was proposed byâ€¦", a: ["Albert Einstein", "Max Planck", "Galileo Galilei", "Stephen Hawking"], c: 0 },
        { q: "â€œOn the Origin of Speciesâ€ was written byâ€¦", a: ["Alfred Wallace", "Charles Darwin", "Thomas Huxley", "Gregor Mendel"], c: 1 }
      ]
    };
    var stepEl = $("#qmStep"), qEl = $("#qmQ"), optsEl = $("#qmOpts"),
        feedEl = $("#qmFeed"), barEl = $("#qmBar"), closeBtn = $("#qmClose");
    var round = null, idx = 0, score = 0, lastFocus = null;

    function open(id) {
      round = QUIZ[id];
      if (!round) return;
      idx = 0; score = 0; lastFocus = doc.activeElement;
      modal.hidden = false;
      requestAnimationFrame(function () { modal.classList.add("show"); });
      doc.body.classList.add("no-scroll");
      render();
      closeBtn.focus();
    }
    function close() {
      modal.classList.remove("show");
      modal.hidden = true;
      doc.body.classList.remove("no-scroll");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function render() {
      var q = round[idx];
      stepEl.textContent = "Question " + (idx + 1) + " of " + round.length;
      qEl.textContent = q.q;
      optsEl.innerHTML = "";
      feedEl.textContent = "";
      barEl.style.width = (idx / round.length * 100) + "%";
      q.a.forEach(function (o, i) {
        var b = doc.createElement("button");
        b.type = "button";
        b.className = "qm-opt";
        b.textContent = o;
        b.addEventListener("click", function () { answer(b, i); });
        optsEl.appendChild(b);
      });
    }
    function answer(btn, i) {
      var q = round[idx];
      $$(".qm-opt", modal).forEach(function (b) { b.disabled = true; });
      if (i === q.c) {
        btn.classList.add("ok");
        score++;
        feedEl.textContent = "Correct â€” signal strengthened.";
      } else {
        btn.classList.add("no");
        optsEl.children[q.c].classList.add("ok");
        feedEl.textContent = "Recalibrated â€” the correct orbit is highlighted.";
      }
      barEl.style.width = ((idx + 1) / round.length * 100) + "%";
      setTimeout(function () {
        idx++;
        if (idx < round.length) render(); else finish();
      }, 1150);
    }
    function finish() {
      stepEl.textContent = "Transmission received";
      qEl.textContent = "Round complete â€” " + score + " / " + round.length;
      optsEl.innerHTML = "";
      feedEl.textContent = score === round.length
        ? "Perfect orbit. Flawless recall."
        : score >= Math.ceil(round.length * 0.6)
          ? "Strong signal. Keep the streak alive."
          : "Weak signal â€” revisit the notes and return.";
      var again = doc.createElement("button");
      again.type = "button"; again.className = "btn btn-neon sm"; again.textContent = "Replay round";
      again.addEventListener("click", function () { idx = 0; score = 0; render(); });
      var done = doc.createElement("button");
      done.type = "button"; done.className = "btn btn-ghost sm"; done.textContent = "Close";
      done.addEventListener("click", close);
      optsEl.appendChild(again);
      optsEl.appendChild(done);
      barEl.style.width = "100%";
    }
    $$(".js-quiz").forEach(function (b) {
      b.addEventListener("click", function () { open(b.getAttribute("data-quiz")); });
    });
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) close(); });
  })();

  /* ================= COUNTDOWNS ================= */
  (function () {
    var cd = $("#cd");
    if (cd) {
      var target = new Date("2026-09-15T09:00:00+05:30").getTime();
      var dE = $("#cdD"), hE = $("#cdH"), mE = $("#cdM"), sE = $("#cdS");
      function pad(n) { return (n < 10 ? "0" : "") + n; }
      function tick() {
        var diff = target - Date.now();
        if (diff <= 0) {
          dE.textContent = hE.textContent = mE.textContent = sE.textContent = "00";
          $(".cd-title", cd).textContent = "Season 04 is live";
          return;
        }
        var d = Math.floor(diff / 864e5); diff -= d * 864e5;
        var h = Math.floor(diff / 36e5); diff -= h * 36e5;
        var m = Math.floor(diff / 6e4); diff -= m * 6e4;
        var s = Math.floor(diff / 1e3);
        dE.textContent = pad(d); hE.textContent = pad(h);
        mE.textContent = pad(m); sE.textContent = pad(s);
        setTimeout(tick, 1000);
      }
      tick();
    }
    var daily = $("#dailyCd");
    if (daily) {
      function pad2(n) { return (n < 10 ? "0" : "") + n; }
      function tick() {
        var now = new Date();
        var left = 86400 - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
        var h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
        daily.textContent = pad2(h) + ":" + pad2(m) + ":" + pad2(s);
        setTimeout(tick, 1000);
      }
      tick();
    }
  })();

  /* ================= SCROLL BUS ================= */
  (function () {
    var parEls = [];
    if (FINE && !RM && !LOW) {
      $$("[data-par]").forEach(function (el) {
        parEls.push({ el: el, f: parseFloat(el.getAttribute("data-par")) || 0.05, top: 0 });
      });
      function measure() {
        parEls.forEach(function (p) {
          var r = p.el.getBoundingClientRect();
          p.top = r.top + (window.scrollY || 0);
        });
      }
      window.addEventListener("resize", measure, { passive: true });
      measure();
    }
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = window.scrollY || 0;
        if (navShell) navShell.classList.toggle("scrolled", y > 26);
        for (var i = 0; i < parEls.length; i++) {
          var p = parEls[i];
          p.el.style.transform = "translate3d(0," + ((y - p.top) * p.f).toFixed(1) + "px,0)";
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();
