const components = ["nav", "hero", "slider", "gallery", "store", "get-your-block", "footer"];

components.forEach(async (name) => {
  try {
    const container = document.getElementById(name);
    const res = await fetch(`/blocks/${name}.html`);
    const html = await res.text();
    container.innerHTML = html;

    if (name === "slider") initSlider();
    if (name === "gallery") initGallery();

  } catch (e) {
    console.error(`Error loading ${name}:`, e);
  }
});
