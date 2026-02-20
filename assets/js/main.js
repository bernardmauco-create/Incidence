/* ==========================================================================
   Patrimoine Photos — mini-site statique (GitHub Pages)
   - Menu responsive (menu en haut / drawer mobile)
   - Active link state
   - Reveal animations (IntersectionObserver)
   - Before/After slider
   - YouTube embeds "légers" (chargement au clic)
   - Config centralisée : changez ici vos URLs (MyPortfolio / YouTube / Email / Tally)
   ========================================================================== */

const SITE = {
  // Base URL (utile pour sitemap/canonicals — gardez cohérent si domaine custom)
  baseUrl: "https://bernardmauco-create.github.io/Incidence/",

  // Galerie à conserver
  myPortfolioUrl: "https://patrimoine-photos.myportfolio.com/",

  // Chaîne YouTube (mettez l’URL de la chaîne)
  youtubeChannelUrl: "https://www.youtube.com/@VOTRE-CHAINE",

  // Email de contact
  email: "incidence.image@gmail.com",

  // Contact — Tally : remplacez XXXX par votre ID (ex: https://tally.so/r/abc123)
  // NOTE : l’iframe est aussi directement dans contact.html (vous pouvez mettre la vraie URL au même endroit).
  tallyEmbedUrl: "https://tally.so/r/XXXXXX"
};

(function init() {
  bindNav();
  setActiveNav();
  hydrateLinks();
  setYear();
  revealOnScroll();
  initBeforeAfter();
  initYouTube();
})();

function bindNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const body = document.body;
  const nav = document.querySelector("[data-nav]");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = body.getAttribute("data-nav-open") === "true";
    body.setAttribute("data-nav-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close menu when clicking a link (mobile)
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (window.matchMedia("(max-width: 979px)").matches) {
      body.setAttribute("data-nav-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    body.setAttribute("data-nav-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  });
}

function setActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav__link[href]"));
  if (!links.length) return;

  const path = normalizePath(location.pathname);
  links.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    // Resolve relative href to a comparable pathname
    const url = new URL(href, location.href);
    const hrefPath = normalizePath(url.pathname);

    // Special case: articles index folder
    const isArticlesIndex = href.includes("articles/index.html") && path.endsWith("/articles/");
    const exactMatch = hrefPath === path;
    if (exactMatch || isArticlesIndex) a.classList.add("is-active");
  });
}

function normalizePath(p) {
  // GitHub pages may serve /Incidence/ or /Incidence/index.html
  return p
    .replace(/index\.html$/i, "")
    .replace(/\/+$/g, "/");
}

function hydrateLinks() {
  // Replace YouTube placeholder links
  document.querySelectorAll("[data-youtube-link]").forEach((a) => {
    a.setAttribute("href", SITE.youtubeChannelUrl);
  });

  // Replace email placeholders
  document.querySelectorAll("[data-email]").forEach((a) => {
    a.textContent = SITE.email;
    a.setAttribute("href", `mailto:${SITE.email}`);
  });

  document.querySelectorAll("[data-email-link]").forEach((a) => {
    a.textContent = SITE.email;
    a.setAttribute("href", `mailto:${SITE.email}`);
  });

  // Replace MyPortfolio link if needed
  // (You can add data-myportfolio on elements if you want to hydrate them too.)
}

function setYear() {
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
}

function revealOnScroll() {
  // Respect reduced motion
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach((el) => io.observe(el));
}

function initBeforeAfter() {
  const components = Array.from(document.querySelectorAll("[data-ba]"));
  if (!components.length) return;

  components.forEach((wrap) => {
    const stage = wrap.querySelector(".ba__stage");
    const range = wrap.querySelector("[data-ba-range]");
    if (!stage || !range) return;

    const setPos = () => {
      const val = Number(range.value || 50);
      stage.style.setProperty("--pos", `${val}%`);
    };

    range.addEventListener("input", setPos);
    setPos();
  });
}

function initYouTube() {
  const blocks = Array.from(document.querySelectorAll(".yt[data-youtube]"));
  if (!blocks.length) return;

  blocks.forEach((block) => {
    const btn = block.querySelector(".yt__btn");
    const id = block.getAttribute("data-youtube");
    if (!btn || !id) return;

    btn.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.width = "560";
      iframe.height = "315";
      iframe.loading = "lazy";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "no-referrer";

      // "nocookie" for privacy
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;

      // Replace block content
      block.innerHTML = "";
      block.appendChild(iframe);
    }, { once: true });
  });
}
