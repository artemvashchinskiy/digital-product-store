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
            (b) => `
              <a href="/pages/product-page.html?id=${b.id}"
                class="bg-white shadow rounded-xl p-6 hover:shadow-md transition
                        flex flex-col h-full">

                <!-- Image wrapper (fixed ratio) -->
                <div class="w-full aspect-[4/3] overflow-hidden rounded-md mb-4 bg-gray-100">
                  <img src="${b.image}"
                      alt="${b.title}"
                      class="w-full h-full object-cover" />
                </div>

                <h3 class="text-xl font-semibold mb-2">${b.title}</h3>
                <p class="text-gray-600 mb-4">${b.description}</p>

                <!-- Button pinned to bottom -->
                <div class="mt-auto">
                  <div class="inline-flex items-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm">
                    View Block
                  </div>
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
