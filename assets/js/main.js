/* ==========================================================================
   NOBRAINS — site behaviour
   ========================================================================== */

/* Paste a form endpoint here (Formspree, Netlify Forms, Basin, your own API)
   to send enquiries straight to an inbox. Left empty, the form opens the
   visitor's email app with the message filled in. */
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbynIzJ_ls-OSw92x_Bzb5WzUvk-yHCpPLhJz8CzwbWxQyltIrXRU_7J96SLl-amsDk/exec";
const CONTACT_EMAIL = "nobrainscollective@gmail.com";

(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Header ---------------------------------------------------- */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Mobile menu ----------------------------------------------- */
  const menuBtn = $(".menu-btn");
  const setMenu = (open) => {
    root.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    $(".menu-btn .lbl").textContent = open ? "Close" : "Menu";
    $(".mobile-menu").toggleAttribute("inert", !open);
  };
  if (menuBtn) {
    $(".mobile-menu").setAttribute("inert", "");
    menuBtn.addEventListener("click", () => setMenu(!root.classList.contains("menu-open")));
    addEventListener("keydown", (e) => { if (e.key === "Escape" && root.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); } });
  }

  addEventListener("pageshow", (e) => { if (e.persisted) root.classList.remove("menu-open"); });

  /* ---------- Fade in on scroll ----------------------------------------- */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    $$(".page-hero .wrap > *, main .section .wrap > *, .site-footer .wrap > *:not(.footer-base)").forEach((el) => { el.classList.add("fade"); io.observe(el); });
  }

  /* ---------- In-page anchors (e.g. services.html#stage-2) -------------
     Images and fonts above the anchor load after the browser's first jump
     and push it down, so jump again once everything has loaded. */
  let target = null;
  if (location.hash.length > 1) {
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { /* malformed hash */ }
  }
  addEventListener("load", () => setTimeout(() => {
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
  }, 60));

  /* ---------- Links to a section on the same page glide there ------------- */
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let glide = null; /* the running animation frame, if any */
    const stopGlide = () => { if (glide) { cancelAnimationFrame(glide); glide = null; } };
    ["wheel", "touchstart", "keydown"].forEach((t) => addEventListener(t, stopGlide, { passive: true })); /* the visitor takes over */
    document.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href").length < 2) return;
      let dest = null;
      try { dest = document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1))); } catch (err) { /* malformed hash */ }
      if (!dest) return;
      e.preventDefault();
      stopGlide();
      const from = scrollY;
      const to = Math.max(0, dest.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(dest).scrollMarginTop) || 0));
      const distance = to - from;
      const duration = Math.min(1400, Math.max(650, Math.abs(distance) * 0.55));
      const start = performance.now();
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); /* slow in, slow out */
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        scrollTo(0, from + distance * ease(t));
        glide = t < 1 ? requestAnimationFrame(step) : null;
      };
      glide = requestAnimationFrame(step);
      history.pushState(null, "", "#" + dest.id);
    });
  }

  /* ---------- Portfolio --------------------------------------------------- */
  const P = window.NB_PROJECTS || [];
  const D = window.NB_DEFAULTS || {};
  const CATS = window.NB_CATEGORIES || {};
  const get = (p, k) => (p[k] !== undefined && p[k] !== "" ? p[k] : D[k]);

  const SHAPES = {
    pill: '<rect x="5" y="30" width="90" height="40" rx="20" fill="none" stroke="currentColor" stroke-width="8"/>',
    ring: '<circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" stroke-width="8"/>',
    star: '<path d="M50 6l11 33 33 11-33 11-11 33-11-33-33-11 33-11z" fill="currentColor"/>',
    play: '<path d="M26 14l62 36-62 36z" fill="currentColor"/>'
  };
  const art = (p, { img, label = "Image", pos = 0, wide = false } = {}) => {
    if (img) return `<img class="art" src="${esc(img)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover">`;
    const [bg, fg] = p.theme || ["#93161c", "#f6ecde"];
    return `<div class="art${wide ? " art--wide" : ""}${pos ? " s-pos-" + pos : ""}" style="--bg:${bg};--fg:${fg}" role="img" aria-label="${esc(label)} placeholder"><span class="art__label">${esc(label)}</span><svg viewBox="0 0 100 100" aria-hidden="true">${SHAPES[p.shape] || SHAPES.pill}</svg></div>`;
  };
  const card = (p, i) => `
    <a class="card" href="project.html#${encodeURIComponent(p.id)}">
      <div class="card__media">${art(p, { img: p.images && p.images.cover, label: "Cover image" })}${p.images && p.images.video ? `<video class="card__video" src="${esc(p.images.video)}" muted loop playsinline preload="none"></video>` : ""}<span class="card__view">View project <span class="arr" aria-hidden="true">→</span></span></div>
      <div class="card__meta"><h3>${esc(p.name)}</h3><span>${esc(CATS[p.category] || "")}</span></div>
      <p class="card__tags">${esc((p.services || []).join(" · "))}</p>
    </a>`;

  /* a card with a clip plays it while the pointer is over the card */
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const hoverCard = (e) => {
      const c = e.target.closest && e.target.closest(".card");
      return c && !c.contains(e.relatedTarget) ? c : null;
    };
    document.addEventListener("mouseover", (e) => {
      const c = hoverCard(e), v = c && c.querySelector("video");
      if (v) { v.play().catch(() => {}); c.classList.add("is-playing"); }
    });
    document.addEventListener("mouseout", (e) => {
      const c = hoverCard(e), v = c && c.querySelector("video");
      if (v) { c.classList.remove("is-playing"); v.pause(); v.currentTime = 0; }
    });
  }

  const renderGrid = (grid, list) => { grid.innerHTML = list.map(card).join(""); };

  $$("[data-work-grid]").forEach((grid) => {
    const limit = +grid.dataset.limit || P.length;
    renderGrid(grid, P.slice(0, limit));
  });

  const filters = $(".filters");
  if (filters) {
    const grid = $("[data-work-grid]");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter"); if (!b || b.getAttribute("aria-pressed") === "true") return;
      $$(".filter", filters).forEach((x) => x.setAttribute("aria-pressed", x === b));
      const cat = b.dataset.cat;
      const list = cat === "all" ? P : P.filter((p) => p.category === cat);
      renderGrid(grid, list);
      $(".work-count").textContent = list.length;
    });
  }

  /* ---------- Case study -------------------------------------------------- */
  const cs = $("#case-study");
  if (cs && P.length) {
    const id = decodeURIComponent(location.hash.slice(1)) || new URLSearchParams(location.search).get("id");
    addEventListener("hashchange", () => location.reload());
    const idx = Math.max(0, P.findIndex((p) => p.id === id));
    const p = P[idx];
    const imgs = p.images || {};
    const gal = imgs.gallery || [];
    let g = 0;
    document.title = `${p.name} — NOBRAINS`;
    const meta = [CATS[p.category], ...(p.services || []), p.year, p.country].filter(Boolean);
    const points = (title, items) => `<div><h2>${title}</h2><ol>${items.map((x, i) => `<li><span class="num">0${i + 1}</span><div><b>${esc(x.t)}</b><p>${esc(x.d)}</p></div></li>`).join("")}</ol></div>`;
    const photo = (src, alt, eager) => `<img class="art" src="${esc(src)}" alt="${esc(alt || "")}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} style="width:100%;height:100%;object-fit:cover">`;
    const browser = (s, sc) => `<figure class="browser"><div class="browser__bar" aria-hidden="true"><span></span><span></span><span></span><em>${esc(s.url || "")}</em></div><img src="${esc(sc.src)}" alt="${esc(sc.alt || "")}" loading="lazy"></figure>`;
    const ICON_REEL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
    const ICON_POST = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="3" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 7v12a2 2 0 0 0 2 2h12" fill="none" stroke="currentColor" stroke-width="2"/></svg>';

    const body = (s) => {
      const kit = (s.palette || s.fonts) ? `<div class="brandkit">
          <span class="eyebrow">Colour &amp; type</span>
          <ul class="swatches" style="--n:${(s.palette || []).length || 4}">${(s.palette || []).map((c) => `<li><span style="background:${esc(c.hex)}"></span><b>${esc(c.name)}</b><small>${esc(c.hex)}</small></li>`).join("")}</ul>
          <ul class="specimens">${(s.fonts || []).map((f) => `<li><span class="aa"${f.lang ? ` lang="${esc(f.lang)}"` : ""} style="font-family:${f.family};font-style:${f.style || "normal"};font-weight:${f.weight || 400}${f.color ? `;color:${esc(f.color)}` : ""}">${esc(f.sample || "Aa")}</span><div><b>${esc(f.name)}</b><small>${esc(f.role)}</small></div></li>`).join("")}</ul>
        </div>` : "";
      if (s.type === "brand") {
        return `<div class="brand-row">${s.image ? `<figure class="brand-fig"><img src="${esc(s.image.src)}" alt="${esc(s.image.alt || "")}" loading="lazy"></figure>` : ""}${kit}</div>`;
      }
      if (s.type === "website") {
        const [first, ...rest] = s.screens || [];
        return `<div class="web-grid">${first ? browser(s, first) : ""}${rest.map((sc) => browser(s, sc)).join("")}</div>
          <div class="web-row">${s.mobile ? `<figure class="phone"><img src="${esc(s.mobile.src)}" alt="${esc(s.mobile.alt || "")}" loading="lazy"></figure>` : ""}${kit}</div>`;
      }
      if (s.type === "instagram") {
        return `<div class="ig">
          <div class="ig-head"><span class="ig-avatar" aria-hidden="true">${s.avatarImg ? `<img src="${esc(s.avatarImg)}" alt="">` : esc(s.avatar || "")}</span><div><b>@${esc(s.handle)}</b><small>${esc(s.bio || "")}</small></div>
          <a class="btn btn--ghost" href="https://www.instagram.com/${esc(s.handle)}/" target="_blank" rel="noopener">View on Instagram <span class="arr" aria-hidden="true">↗</span></a></div>
          <div class="ig-grid ig-grid--${s.posts.length}">${s.posts.map((x) => {
            const inner = `<img src="${esc(x.img)}" alt="" loading="lazy"><span class="ig-type">${x.kind === "reel" ? ICON_REEL : ICON_POST}</span><span class="ig-hover">${x.kind === "reel" ? "Watch reel" : "View post"}</span>`;
            const label = x.kind === "reel" ? "Play reel" : "Open post";
            return window.NB_EMBEDS === false
              ? `<a class="ig-tile" href="https://www.instagram.com/${x.kind === "reel" ? "reel" : "p"}/${esc(x.code)}/" target="_blank" rel="noopener" aria-label="${label} on Instagram">${inner}</a>`
              : `<button class="ig-tile" type="button" data-kind="${esc(x.kind)}" data-code="${esc(x.code)}" aria-label="${label}">${inner}</button>`;
          }).join("")}</div>
        </div>`;
      }
      if (s.type === "images" && s.images) {
        const n = Math.min(3, s.images.length);
        return `<div class="cs-gallery cs-gallery--${n}">${s.images.slice(0, 3).map((im) => `<div class="cs-media">${photo(im.src, im.alt)}</div>`).join("")}</div>`;
      }
      const n = Math.min(3, Math.max(1, s.gallery || 1));
      return `<div class="cs-gallery cs-gallery--${n}">${Array.from({ length: n }, (_, k) => `<div class="cs-media">${art(p, { img: gal[g++], label: `Image ${k + 1}`, pos: (k % 4) + 1, wide: n === 1 })}</div>`).join("")}</div>`;
    };

    const sections = get(p, "sections").map((s) => `<section class="section--tight${s.bg === "cream" ? " bg-cream cs-band" : ""}"><div class="wrap">
        <div class="cs-block"><div><span class="eyebrow">${esc(s.label)}</span></div><div><h2>${esc(s.title)}</h2><p class="t-body-l muted" style="margin-top:22px;max-width:52ch">${esc(s.text)}</p></div></div>
        ${body(s)}</div></section>`).join("");
    const others = [1, 2, 3].map((k) => P[(idx + k) % P.length]).filter((x) => x !== p);
    const link = get(p, "link");
    const links = p.links || (link ? [{ label: "Visit the live project", url: link }] : []);

    cs.innerHTML = `
      <section class="cs-hero"><div class="wrap">
        <a class="cs-back" href="work.html"><span class="arr" aria-hidden="true">←</span> All work</a>
        <div class="meta-row">${meta.map((m) => `<span class="chip">${esc(m)}</span>`).join("")}</div>
        <h1><span class="ln"><span>${esc(p.name)}</span></span></h1>
        <p class="cs-tagline">${esc(get(p, "tagline"))}</p>
      </div></section>
      <div class="wrap"><div class="cs-media cs-media--hero">${imgs.hero ? photo(imgs.hero, `${p.name}, hero image`, true) : art(p, { label: "Hero image", wide: true })}</div></div>
      <section class="section"><div class="wrap">
        <div class="cs-info">
          <dl class="cs-facts">
            <div><dt>Client</dt><dd>${esc(get(p, "client"))}</dd></div>
            <div><dt>Industry</dt><dd>${esc(get(p, "industry"))}</dd></div>
            <div><dt>Services</dt><dd>${esc((p.services || []).join(", "))}</dd></div>
            <div><dt>Year</dt><dd>${esc(get(p, "year"))}</dd></div>
          </dl>
          <p class="t-lead">${esc(get(p, "intro"))}</p>
        </div>
        <div class="cs-points">${points("Challenges", get(p, "challenges"))}${points("Our contribution", get(p, "contribution"))}</div>
      </div></section>
      ${imgs.full ? `<div class="wrap"><div class="cs-media cs-media--full">${photo(imgs.full, `${p.name}, full-width image`)}</div></div>`
        : p.images ? "" : `<div class="wrap"><div class="cs-media cs-media--full">${art(p, { label: "Full-width image", pos: 3 })}</div></div>`}
      ${sections}
      <section class="section bg-red cs-outcome"><div class="wrap">
        <span class="eyebrow">Outcome</span>
        <h2>${links.length ? "Want to see it in action?" : "What changed for the client."}</h2>
        <p>${esc(get(p, "outcome"))}</p>
        <div class="cs-links">${links.length
          ? links.map((l, i) => `<a class="btn ${i ? "btn--ghost" : "btn--light"}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <span class="arr" aria-hidden="true">↗</span></a>`).join("")
          : `<a class="btn btn--light" href="contact.html">Start a project like this</a>`}</div>
      </div></section>
      <section class="section"><div class="wrap">
        <div class="sec-head"><h2 class="t-l">More work</h2><a class="link" href="work.html">View all work</a></div>
        <div class="grid-work grid-work--3">${others.map(card).join("")}</div>
      </div></section>`;

    /* Instagram posts and reels open in a pop-up using Instagram's own embed player */
    if ($("button.ig-tile", cs)) {
      const dlg = document.createElement("dialog");
      dlg.className = "ig-modal";
      dlg.innerHTML = `<button class="ig-close" type="button" aria-label="Close">×</button><iframe title="Instagram post" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><a class="ig-open" target="_blank" rel="noopener">Open on Instagram ↗</a>`;
      document.body.appendChild(dlg);
      const frame = $("iframe", dlg);
      const close = () => { dlg.close(); };
      dlg.addEventListener("close", () => { frame.src = "about:blank"; });
      $(".ig-close", dlg).addEventListener("click", close);
      dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
      cs.addEventListener("click", (e) => {
        const t = e.target.closest(".ig-tile"); if (!t) return;
        const path = `https://www.instagram.com/${t.dataset.kind === "reel" ? "reel" : "p"}/${t.dataset.code}/`;
        frame.src = path + "embed/";
        $(".ig-open", dlg).href = path;
        dlg.showModal();
      });
    }
  }

  /* ---------- Contact form ---------------------------------------------- */
  const form = $("#enquiry");
  if (form) {
    const stages = $$('input[name="stages"]', form);

    const msgs = { name: "Tell us your name.", email: "Enter a valid email address.", phone: "Enter your phone number.", message: "Tell us a little about the project." };
    const status = $(".form-status", form);
    const thanks = $("#thanks");
    const showThanks = (title, text) => {
      if (!thanks) { status.classList.add("ok"); status.textContent = text; return; }
      $("[data-thanks-title]", thanks).textContent = title;
      $("[data-thanks-text]", thanks).textContent = text;
      form.hidden = true; thanks.hidden = false;
      thanks.scrollIntoView({ block: "center" });
      thanks.focus({ preventScroll: true });
    };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.elements._gotcha && form.elements._gotcha.value) return; /* a bot filled the hidden field */
      let first = null;
      for (const k in msgs) {
        const el = form.elements[k];
        const bad = !el.value.trim() || (k === "email" && !/^\S+@\S+\.\S+$/.test(el.value.trim())) || (k === "phone" && !/^[+\d][\d\s().-]{5,}$/.test(el.value.trim()));
        el.setAttribute("aria-invalid", bad);
        $(`#err-${k}`).textContent = bad ? msgs[k] : "";
        if (bad && !first) first = el;
      }
      status.className = "form-status";
      if (first) { first.focus(); status.textContent = "Please check the highlighted fields."; return; }

      const v = form.elements;
      /* country code + number, e.g. "+20 100 123 4567" (a leading 0 is dropped; a number typed with its own + is left alone) */
      const rawPhone = v.phone.value.trim();
      const fullPhone = rawPhone.startsWith("+") ? rawPhone : `${v.phone_code.value} ${rawPhone.replace(/^[0\s]+/, "").replace(/\s+/g, " ")}`;
      const stageLabels = stages.filter((s) => s.checked).map((s) => s.dataset.label).join(", ") || "Not specified";
      if (FORM_ENDPOINT) {
        if (form.classList.contains("is-sending")) return; /* already on its way */
        const btn = $("button[type=submit]", form);
        const label = btn.textContent;
        const started = Date.now();
        const stop = () => { form.classList.remove("is-sending"); btn.classList.remove("is-loading"); btn.disabled = false; btn.textContent = label; };
        form.classList.add("is-sending"); btn.classList.add("is-loading"); btn.disabled = true; btn.textContent = "Sending";
        const timer = new AbortController();
        const giveUp = setTimeout(() => timer.abort(), 30000);
        try {
          /* sent as a plain form post, which Google Apps Script, Formspree and most form services all accept */
          const data = new URLSearchParams();
          for (const [k, val] of new FormData(form)) if (k !== "stages") data.append(k, val);
          data.set("stages", stageLabels);
          data.delete("phone_code"); data.set("phone", fullPhone);
          const r = await fetch(FORM_ENDPOINT, { method: "POST", body: data, signal: timer.signal });
          const reply = await r.json().catch(() => ({ ok: r.ok }));
          if (!r.ok || reply.ok === false) throw new Error(reply.error || r.status);
          /* keep the sending state on screen for a moment so a fast reply doesn't just flash */
          await new Promise((res) => setTimeout(res, Math.max(0, 1100 - (Date.now() - started))));
          form.reset(); status.textContent = "";
          stop();
          showThanks("Thank you.", "Your message is with us, and a confirmation is on its way to your inbox. We'll be in touch soon.");
        } catch (err) {
          stop();
          status.textContent = `That didn't go through. Please try again, or email us at ${CONTACT_EMAIL}.`;
        } finally { clearTimeout(giveUp); }
        return;
      }
      const body = `Name: ${v.name.value}\nEmail: ${v.email.value}\nPhone: ${fullPhone}\nCompany or brand: ${v.company.value || "-"}\nLocation: ${v.location.value || "-"}\nServices: ${stageLabels}\n\n${v.message.value}`;
      location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Project enquiry from " + v.name.value)}&body=${encodeURIComponent(body)}`;
      showThanks("One more step.", `Your email app should have opened with everything filled in. Press send there and it's with us. If nothing opened, write to ${CONTACT_EMAIL}.`);
    });
  }

  /* ---------- Footer year ------------------------------------------------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

})();
