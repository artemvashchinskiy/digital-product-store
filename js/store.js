async function loadStoreImages() {
  const leftImg = document.getElementById("storeImgLeft");
  const rightImg = document.getElementById("storeImgRight");

  if (!leftImg || !rightImg) return;

  try {
    const res = await fetch("/data/blocks.json");
    const blocks = await res.json();

    if (!Array.isArray(blocks) || blocks.length === 0) return;

    const dayIndex = Math.floor(Date.now() / 86400000);

    const leftBlock = blocks[dayIndex % blocks.length];
    const rightBlock = blocks[(dayIndex + 1) % blocks.length];

    // fade out
    leftImg.style.opacity = 0;
    rightImg.style.opacity = 0;

    leftImg.onload = () => (leftImg.style.opacity = 1);
    rightImg.onload = () => (rightImg.style.opacity = 1);

    leftImg.src = leftBlock.image;
    leftImg.alt = leftBlock.title;

    rightImg.src = rightBlock.image;
    rightImg.alt = rightBlock.title;

  } catch (err) {
    console.error("Store image load error:", err);
  }
}

document.addEventListener("store:loaded", loadStoreImages);

