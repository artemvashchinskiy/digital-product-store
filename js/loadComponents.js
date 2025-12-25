export async function loadComponent(path, root) {
  const res = await fetch(path);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  root.appendChild(wrapper);
}

async function loadHomeBlocks() {
  const components = ["nav", "hero", "slider", "gallery", "store", "get-your-block", "footer"];

  for (const name of components) {
    const container = document.getElementById(name);
    if (!container) continue;

    try {
      const res = await fetch(`/blocks/${name}.html`);
      const html = await res.text();
      container.innerHTML = html;

      // 🔥 EMIT EVENT WHEN STORE IS READY
      if (name === "store") {
        document.dispatchEvent(new Event("store:loaded"));
      }

    } catch (e) {
      console.error(`Error loading ${name}:`, e);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadHomeBlocks);
