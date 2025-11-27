// Wait until nav gets inserted dynamically
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

  // Toggle on burger
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });

  // Close when clicking outside menu
  document.addEventListener("click", (e) => {
    if (isOpen && !menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close when clicking a link inside menu
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  observer.disconnect();
};

// Mutation observer — waits until #burgerBtn appears
const observer = new MutationObserver(() => {
  const btn = document.querySelector('#burgerBtn');
  if (btn) initMobileNav();
});

observer.observe(document.body, { childList: true, subtree: true });






