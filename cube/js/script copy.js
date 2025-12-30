/* ==================================================
   HAMBURGER MENU (TABLET / MOBILE)
================================================== */
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
});

/* ==================================================
   IMAGE GALLERY
================================================== */
const images = [
  "assets/images/product-1.png",
  "assets/images/product-2.png",
  "assets/images/product-3.png",
  "assets/images/bottle-1.jpg",
  "assets/images/bottle-2.jpg",
  "assets/images/bottle-3.jpg",
  "assets/images/bottle-4.jpg",
  "assets/images/bottle-lily.jpg",
  "assets/images/bottle-rose.jpg",
  "/assets/images/collection.jpg"


];
console.log(images);

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");
const thumbnails = document.querySelectorAll(".gallery-thumbnails img");

function updateGallery(index) {
  currentIndex = index;
  mainImage.src = images[currentIndex];

  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

prevBtn.addEventListener("click", () => {
  const index = (currentIndex - 1 + images.length) % images.length;
  updateGallery(index);
});

nextBtn.addEventListener("click", () => {
  const index = (currentIndex + 1) % images.length;
  updateGallery(index);
});

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    updateGallery(Number(dot.dataset.index));
  });
});

thumbnails.forEach(thumb => {
  thumb.addEventListener("click", () => {
    updateGallery(Number(thumb.dataset.index));
  });
});

/* ==================================================
   RADIO OPTIONS → ADD TO CART LINK (9 VARIATIONS)
================================================== */
const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
const addToCartBtn = document.getElementById("addToCart");

function updateAddToCartLink() {
  const fragrance = document.querySelector(
    'input[name="fragrance"]:checked'
  ).value;

  const purchase = document.querySelector(
    'input[name="purchase"]:checked'
  ).value;

  addToCartBtn.href = `https://dummycart.com/${fragrance}-${purchase}`;
}

[...fragranceRadios, ...purchaseRadios].forEach(radio => {
  radio.addEventListener("change", updateAddToCartLink);
});

updateAddToCartLink();

/* ==================================================
   EXPANDABLE SUBSCRIPTION SECTIONS
================================================== */
const singleSub = document.querySelector(".single-sub");
const doubleSub = document.querySelector(".double-sub");

function toggleSubscriptions() {
  const purchase = document.querySelector(
    'input[name="purchase"]:checked'
  ).value;

  singleSub.style.display = purchase === "single" ? "block" : "none";
  doubleSub.style.display = purchase === "double" ? "block" : "none";
}

purchaseRadios.forEach(radio => {
  radio.addEventListener("change", toggleSubscriptions);
});

toggleSubscriptions();
/* ==================================================
   ACCORDION
================================================== */
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const isOpen = item.classList.contains("active");

    document.querySelectorAll(".accordion-item").forEach(i => {
      i.classList.remove("active");
      i.querySelector(".icon").textContent = "+";
    });

    if (!isOpen) {
      item.classList.add("active");
      header.querySelector(".icon").textContent = "−";
    }
  });
});

/* ==================================================
   STATS COUNTER ANIMATION ON SCROLL
================================================== */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = Number(entry.target.dataset.target);
        let count = 0;

        const interval = setInterval(() => {
          count++;
          entry.target.textContent = count;

          if (count === target) {
            clearInterval(interval);
          }
        }, 20);

        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => counterObserver.observe(counter));
