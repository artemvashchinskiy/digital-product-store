function initGallery() {
  const container = document.querySelector("#galleryGrid");
  const btn = document.querySelector("#galleryToggleBtn");
  if (!container || !btn) return;

  fetch("data/blocks.json")
    .then(res => res.json())
    .then(blocks => {
      // First show only 3 blocks
      renderBlocks(blocks, 3);

      let expanded = false;

      btn.addEventListener("click", () => {
        expanded = !expanded;

        if (expanded) {
          renderBlocks(blocks, blocks.length);
          btn.textContent = "Show Less";
        } else {
          renderBlocks(blocks, 3);
          btn.textContent = "Show More";
        }
      });
    })
    .catch(err => console.error("Gallery load error:", err));
}

function renderBlocks(blocks, limit) {
  const container = document.querySelector("#galleryGrid");
  container.innerHTML = blocks
    .slice(0, limit)
    .map(block => `
      <div class="rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">
        <img src="${block.image}" alt="${block.title}" class="w-full h-56 object-cover">
        <div class="p-4">
          <p class="text-sm font-medium text-gray-800">${block.title}</p>
          <p class="text-xs text-gray-500 mt-1">${block.description}</p>
        </div>
      </div>
    `)
    .join("");
}

// Wait until the gallery block has been injected, then initialize
const galleryObserver = new MutationObserver(() => {
  const container = document.querySelector("#galleryGrid");
  const btn = document.querySelector("#galleryToggleBtn");

  if (container && btn) {
    galleryObserver.disconnect();
    initGallery();
  }
});

galleryObserver.observe(document.body, { childList: true, subtree: true });
