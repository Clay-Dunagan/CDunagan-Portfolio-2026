const dropdownItem = document.querySelector(".site-nav__item--dropdown");
const dropdownToggle = document.querySelector(".site-nav__dropdown-toggle");

if (dropdownItem && dropdownToggle) {
  let closeTimeout;

  const openDropdown = () => {
    clearTimeout(closeTimeout);
    dropdownItem.classList.add("is-open");
    dropdownToggle.setAttribute("aria-expanded", "true");
  };

  const closeDropdown = () => {
    dropdownItem.classList.remove("is-open");
    dropdownToggle.setAttribute("aria-expanded", "false");
  };

  const closeDropdownWithDelay = () => {
    closeTimeout = setTimeout(() => {
      closeDropdown();
    }, 120);
  };

  dropdownItem.addEventListener("mouseenter", openDropdown);
  dropdownItem.addEventListener("mouseleave", closeDropdownWithDelay);

  dropdownToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen = dropdownItem.classList.contains("is-open");

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  document.addEventListener("click", function (event) {
    if (!dropdownItem.contains(event.target)) {
      closeDropdown();
    }
  });
}

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox__close");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

if (lightbox && lightboxImage && lightboxClose && lightboxOverlay && lightboxTriggers.length > 0) {
  lightboxTriggers.forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("is-active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-active")) {
      closeLightbox();
    }
  });

  document.querySelectorAll(".bb-case-final-design").forEach((section) => {
  const track = section.querySelector(".bb-case-final-design__track");
  const slides = Array.from(section.querySelectorAll(".bb-case-final-design__slide"));
  const prevBtn = section.querySelector(".bb-case-final-design__arrow--left");
  const nextBtn = section.querySelector(".bb-case-final-design__arrow--right");
  const dotsContainer = section.querySelector(".bb-case-final-design__dots");

  if (!track || !slides.length || !prevBtn || !nextBtn || !dotsContainer) return;

  const slidesPerPage = 3;
  const totalPages = Math.ceil(slides.length / slidesPerPage);
  let currentPage = 0;

  function getGapValue() {
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return Number.isNaN(gap) ? 0 : gap;
  }

  function buildDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalPages; i += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "bb-case-final-design__dot";
      dot.setAttribute("aria-label", `Go to slide group ${i + 1}`);

      if (i === currentPage) {
        dot.classList.add("bb-case-final-design__dot--active");
      }

      dot.addEventListener("click", () => {
        currentPage = i;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".bb-case-final-design__dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("bb-case-final-design__dot--active", index === currentPage);
    });
  }

  function updateButtons() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
  }

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = getGapValue();
    const offset = currentPage * ((slideWidth * slidesPerPage) + (gap * slidesPerPage));

    track.style.transform = `translateX(-${offset}px)`;

    updateDots();
    updateButtons();
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage -= 1;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);

  buildDots();
  updateCarousel();
});
}