/* ==========================================================================
   NOBRAINS — intro: the logo is stamped onto the page, holds, then the
   screen lifts away. Plays once, when a visitor first enters the site in a
   browser tab (index.html sets data-intro="stamp"), unless they have turned
   animations off on their device.
   ========================================================================== */

(() => {
  const root = document.documentElement;
  const layer = document.querySelector(".intro-layer");
  if (!layer || root.dataset.intro !== "stamp") return;
  let finished = false;
  const finish = () => {
    if (finished) return; finished = true;
    delete root.dataset.intro;
    layer.remove();
  };
  const lift = () => { layer.classList.add("is-leaving"); setTimeout(finish, 720); };
  layer.addEventListener("click", finish);
  addEventListener("keydown", finish, { once: true });
  setTimeout(finish, 5000); /* never hold anyone longer than this */
  /* lift once the page has loaded and the stamp has had its moment */
  Promise.all([
    new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r, { once: true }))),
    new Promise((r) => setTimeout(r, 1700))
  ]).then(lift);
})();
