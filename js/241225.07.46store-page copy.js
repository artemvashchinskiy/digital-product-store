// store-page.js

const content = document.getElementById("content");

async function loadStore() {
  try {
    const res = await fetch("/data/blocks.json");
    const blocks = await res.json();

    const featured = blocks.filter(b => b.featured);

    content.innerHTML = `
      <h2 class="text-3xl font-bold mb-8">UI Blocks Store</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        ${featured
          .map(
            (b, i) => `
          <a href="/pages/product-page.html?id=${i}"
             class="bg-white shadow rounded-xl p-6 hover:shadow-md transition">
            <img src="${b.image}" class="rounded-md mb-4" />
            <h3 class="text-xl font-semibold mb-2">${b.title}</h3>
            <p class="text-gray-600 mb-4">${b.description}</p>
            <div class="inline-flex items-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm">
              View Block
            </div>
          </a>
        `
          )
          .join("")}
      </div>
    `;
  } catch (err) {
    console.error("Store load error:", err);
    content.innerHTML = `<p class="text-red-600">Failed to load store.</p>`;
  }
}

loadStore();
