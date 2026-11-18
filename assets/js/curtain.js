/* ==========================================================================
   NOBRAINS: page curtain. A maroon screen with the logo covers the page while
   it loads, lifts away once it is ready, and slides back down when a link to
   another page is clicked. Skipped for visitors who have turned animations off.
   The home page has its own stamp intro, so it only uses the curtain when you
   arrive from another page.
   ========================================================================== */

(() => {
  const root = document.documentElement;
  const curtain = document.querySelector(".page-curtain");
  if (!curtain) return;

  /* arrival: wait until the page has loaded, then lift */
  if (root.classList.contains("curtain-on")) {
    const minimum = root.classList.contains("curtain-nav") ? 250 : 1000;
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r, { once: true })));
    loaded.then(() => setTimeout(() => {
      curtain.classList.add("is-lifting");
      setTimeout(() => { root.classList.remove("curtain-on", "curtain-nav"); curtain.classList.remove("is-lifting"); }, 800);
    }, Math.max(0, minimum - performance.now())));
  }

  /* departure: slide down over the page, then go */
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (!/^https?:$/.test(url.protocol) || url.origin !== location.origin) return;
    /* same page or an in-page anchor; "/about" and "/about.html" count as the same page */
    const plain = (p) => p.replace(/index\.html$/, "").replace(/\.html$/, "");
    if (plain(url.pathname) === plain(location.pathname) && url.search === location.search) return;
    e.preventDefault();
    try { sessionStorage.setItem("nbNav", "1"); } catch (err) { /* private mode: no transition on arrival */ }
    root.classList.add("curtain-leaving");
    setTimeout(() => { location.href = url.href; }, 560);
    setTimeout(() => root.classList.remove("curtain-leaving"), 4000); /* navigation failed: uncover the page */
  });

  /* back/forward restores the page from memory: make sure it is not left covered */
  addEventListener("pageshow", (e) => { if (e.persisted) root.classList.remove("curtain-leaving", "curtain-on", "curtain-nav"); });
})();
