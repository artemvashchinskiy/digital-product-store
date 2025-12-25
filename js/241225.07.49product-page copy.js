// product-page.js

const content = document.getElementById("content");
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

async function loadProduct() {
  if (isNaN(id)) {
    content.innerHTML = `<p class="text-red-600">Invalid product ID.</p>`;
    return;
  }

  try {
    const res = await fetch("/data/blocks.json");
    const blocks = await res.json();

    const block = blocks[id];
    if (!block) {
      content.innerHTML = `<p class="text-red-600">Block not found.</p>`;
      return;
    }

    content.innerHTML = `
      <div class="mb-8">
        <a href="/pages/store-page.html"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg
                  hover:bg-blue-600 hover:text-white transition">
          ← Back to Store
        </a>
      </div>

      <div class="flex flex-col lg:flex-row gap-10 items-start">
        
        <img src="${block.image}"
             class="w-full lg:w-1/2 rounded-xl shadow" />

        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-4">${block.title}</h1>
          <p class="text-gray-700 mb-6">${block.description}</p>

          <a href="/demos/blue-dashboard-ui/index.html"
             class="bg-gray-900 text-white px-6 py-3 rounded-md block w-max mb-4">
             Go to block demo
          </a>

          <div class="text-gray-500 text-sm">
            More advanced version coming soon.
          </div>
        </div>

      </div>
    `;
  } catch (err) {
    console.error("Product load error:", err);
    content.innerHTML = `<p class="text-red-600">Failed to load product.</p>`;
  }
}

loadProduct();
