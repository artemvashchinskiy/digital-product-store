const slides = [
  { title: "Hero Block", image: "/assets/img/gallery/block1.png" },
  { title: "Card Section", image: "/assets/img/gallery/block2.png" },
  { title: "Navigation", image: "/assets/img/gallery/block3.png" },
  { title: "Footer Block", image: "/assets/img/gallery/block4.png" },
];

let currentIndex = 0;
let sliderTrack, dots, labelBox;
let autoplayInterval;

function initSlider() {
  sliderTrack = document.getElementById("slider-track");
  dots = document.getElementById("slider-dots");
  labelBox = document.getElementById("slider-labels");

  slides.forEach((slide, index) => {
    const slideEl = document.createElement("div");

    // EXACT hero preview proportions and behavior
    slideEl.className = `
      flex-shrink-0 w-full relative
      px-6 py-6
    `;

    slideEl.innerHTML = `
      <div class="h-56 sm:h-72 md:h-80 bg-gradient-to-br from-gray-100 to-gray-50
                  flex items-center justify-center rounded-xl overflow-hidden">
        <img src="${slide.image}"
             alt="${slide.title}"
             class="max-h-full object-contain opacity-90" />
      </div>
    `;

    sliderTrack.appendChild(slideEl);

    // DOTS
    const dot = document.createElement("button");
    dot.className = "w-3 h-3 rounded-full bg-gray-300";
    dot.addEventListener("click", () => goToSlide(index));
    dots.appendChild(dot);
  });

  updateSlider();

  // Controls
  document.getElementById("prev-slide").addEventListener("click", prevSlide);
  document.getElementById("next-slide").addEventListener("click", nextSlide);

  // Autoplay for mobile
  if (window.innerWidth < 768) {
    autoplayInterval = setInterval(nextSlide, 3500);
    sliderTrack.parentElement.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
    sliderTrack.parentElement.addEventListener("mouseleave", () => autoplayInterval = setInterval(nextSlide, 3500));
  }
}

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Dots active state
  Array.from(dots.children).forEach((dot, i) => {
    dot.classList.toggle("bg-gray-900", i === currentIndex);
    dot.classList.toggle("bg-gray-300", i !== currentIndex);
  });

  // Preview label (same as hero card)
  labelBox.innerHTML = `
    <span>${slides[currentIndex].title}</span>
    <span>PNG preview</span>
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
