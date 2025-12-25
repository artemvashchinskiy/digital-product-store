// ----------------------------
// 1) Fix section links on non-index pages
// ----------------------------
function fixLinksForSubpages() {
  const path = window.location.pathname || "";
  const isIndex =
    path === "/" ||
    path === "" ||
    path.endsWith("index.html");
  const isInPages = path.includes("/pages/");

  document.querySelectorAll("[data-link]").forEach(link => {
    const id = link.dataset.link;

    if (!isIndex) {
      const prefix = isInPages ? "../" : "";
      link.href = `${prefix}index.html#${id === "free" ? "get-your-block" : id}`;
    }
  });

  // Fix logo link on subpages
  if (!isIndex) {
    const logo = document.querySelector('a[href="index.html"], a[href="/"]');
    if (logo) {
      const prefix = isInPages ? "../" : "";
      logo.href = `${prefix}index.html`;
    }
  }

  // Fix "Store" links on subpages so they always point to /pages/store-page.html
  document.querySelectorAll('a[href$="store-page.html"]').forEach(link => {
    if (!isIndex) {
      const prefix = isInPages ? "../" : "";
      link.href = `${prefix}pages/store-page.html`;
    }
  });
}

// ----------------------------
// 2) Mobile nav init (your exact code)
// ----------------------------
const initMobileNav = () => {
  const btn = document.querySelector('#burgerBtn');
  const menu = document.querySelector('#mobileMenu');

  if (!btn || !menu) return;

  let isOpen = false;

  const openMenu = () => {
    menu.classList.remove("-translate-x-full");
    menu.classList.add("translate-x-0");
    isOpen = true;
  };

  const closeMenu = () => {
    menu.classList.remove("translate-x-0");
    menu.classList.add("-translate-x-full");
    isOpen = false;
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener("click", (e) => {
    if (isOpen && !menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => closeMenu());
  });

  observer.disconnect();
};

// ----------------------------
// 3) MutationObserver to wait for nav
// ----------------------------
const observer = new MutationObserver(() => {
  const btn = document.querySelector('#burgerBtn');
  if (btn) {
    fixLinksForSubpages();
    initMobileNav();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
