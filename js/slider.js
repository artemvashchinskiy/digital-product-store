let slides = [];
let currentIndex = 0;
let sliderTrack, dots, labelBox;
let autoplayInterval;

/* =========================
   LOAD FEATURED SLIDES
========================= */
async function loadFeaturedSlides() {
  try {
    const res = await fetch("/data/blocks.json");
    const data = await res.json();

    slides = data
      .filter(item => item.featured === true)
      .map(item => ({
        title: item.title,
        image: item.image,
        demo: item.demo || "#",
        price: item.price || "Free"
      }));

    if (!slides.length) return;

    initSlider();
  } catch (err) {
    console.error("Slider JSON load error:", err);
  }
}

/* =========================
   INIT SLIDER
========================= */
function initSlider() {
  sliderTrack = document.getElementById("slider-track");
  dots = document.getElementById("slider-dots");
  labelBox = document.getElementById("slider-labels");

  sliderTrack.innerHTML = "";
  dots.innerHTML = "";

  slides.forEach((slide, index) => {
    const slideEl = document.createElement("div");

    slideEl.className = `
      flex-shrink-0 w-full relative px-6 py-6
    `;

    slideEl.innerHTML = `
      <a href="${slide.demo}"
         class="block h-56 sm:h-72 md:h-80 bg-gradient-to-br from-gray-100 to-gray-50
                flex items-center justify-center rounded-xl overflow-hidden
                hover:scale-[1.02] transition">
        <img src="${slide.image}"
             alt="${slide.title}"
             loading="lazy"
             class="max-h-full object-contain opacity-90" />
      </a>
    `;

    sliderTrack.appendChild(slideEl);

    // dots
    const dot = document.createElement("button");
    dot.className = "w-3 h-3 rounded-full bg-gray-300";
    dot.addEventListener("click", () => goToSlide(index));
    dots.appendChild(dot);
  });

  updateSlider();

  document.getElementById("prev-slide")?.addEventListener("click", prevSlide);
  document.getElementById("next-slide")?.addEventListener("click", nextSlide);

  // autoplay (mobile only)
  if (window.innerWidth < 768) {
    autoplayInterval = setInterval(nextSlide, 3500);

    const wrapper = sliderTrack.parentElement;
    wrapper.addEventListener("mouseenter", stopAutoplay);
    wrapper.addEventListener("mouseleave", startAutoplay);
  }
}

/* =========================
   SLIDER LOGIC
========================= */
function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  [...dots.children].forEach((dot, i) => {
    dot.classList.toggle("bg-gray-900", i === currentIndex);
    dot.classList.toggle("bg-gray-300", i !== currentIndex);
  });

  labelBox.innerHTML = `
    <span>${slides[currentIndex].title}</span>
    <span class="text-xs text-gray-500">${slides[currentIndex].price}</span>
  `;
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function goToSlide(i) {
  currentIndex = i;
  updateSlider();
}

function stopAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval);
}

function startAutoplay() {
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, 3500);
}

/* =========================
   WAIT FOR BLOCK INJECTION
========================= */
const sliderObserver = new MutationObserver(() => {
  if (
    document.getElementById("slider-track") &&
    document.getElementById("slider-dots") &&
    document.getElementById("slider-labels")
  ) {
    sliderObserver.disconnect();
    loadFeaturedSlides();
  }
});

sliderObserver.observe(document.body, {
  childList: true,
  subtree: true
});
