/* =========================================================
   Desktop / Mobile Case Studies Dropdown
========================================================= */

const dropdownItem = document.querySelector(".site-nav__item--dropdown");
const dropdownToggle = document.querySelector(".site-nav__dropdown-toggle");

if (dropdownItem && dropdownToggle) {
  let closeTimeout;
  let dropdownPinned = false;

  const openDropdown = () => {
    clearTimeout(closeTimeout);
    dropdownItem.classList.add("is-open");
    dropdownToggle.setAttribute("aria-expanded", "true");
    dropdownToggle.setAttribute("aria-label", "Close Case Studies menu");
  };

  const closeDropdown = () => {
    dropdownItem.classList.remove("is-open");
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownToggle.setAttribute("aria-label", "Open Case Studies menu");
  };

  const closeDropdownWithDelay = () => {
    closeTimeout = setTimeout(() => {
      if (!dropdownPinned) {
        closeDropdown();
      }
    }, 120);
  };

  dropdownItem.addEventListener("mouseenter", openDropdown);
  dropdownItem.addEventListener("mouseleave", closeDropdownWithDelay);
  dropdownItem.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!dropdownItem.contains(document.activeElement)) {
        closeDropdown();
      }
    }, 0);
  });

  dropdownToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen = dropdownItem.classList.contains("is-open");

    if (isOpen && dropdownPinned) {
      dropdownPinned = false;
      closeDropdown();
    } else {
      dropdownPinned = true;
      openDropdown();
    }
  });

  document.addEventListener("click", function (event) {
    if (!dropdownItem.contains(event.target)) {
      dropdownPinned = false;
      closeDropdown();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dropdownItem.classList.contains("is-open")) {
      dropdownPinned = false;
      closeDropdown();
      dropdownToggle.focus();
    }
  });
}

/* =========================================================
   Mobile Hamburger Menu
========================================================= */

const menuToggle = document.querySelector(".site-header__menu-toggle");
const primaryNav = document.querySelector("#primary-navigation");

if (menuToggle && primaryNav) {
  const closeMobileMenu = (returnFocus = false) => {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    if (returnFocus) {
      menuToggle.focus();
    }
  };

  const openMobileMenu = () => {
    primaryNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  };

  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen = primaryNav.classList.contains("is-open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  document.addEventListener("click", function (event) {
    const clickedInsideHeader = event.target.closest(".site-header");

    if (!clickedInsideHeader) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      closeMobileMenu(true);
    }
  });

  primaryNav.querySelectorAll("a").forEach((navLink) => {
    navLink.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

/* =========================================================
   Global Image Lightbox
========================================================= */

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox__close");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

if (lightbox && lightboxImage && lightboxClose && lightboxOverlay && lightboxTriggers.length > 0) {
  let lastLightboxTrigger = null;
  const getLightboxSiblings = () => Array.from(document.body.children).filter(
    (element) => element !== lightbox && element.tagName !== "SCRIPT"
  );

  function openLightbox(trigger) {
    const image = trigger.matches("img") ? trigger : trigger.querySelector("img");

    if (!image) return;

    lastLightboxTrigger = trigger;
    lightboxImage.src = trigger.dataset.full || image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-active");
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.removeAttribute("inert");
    getLightboxSiblings().forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  lightboxTriggers.forEach((trigger) => {
    if (!trigger.matches("button, a")) {
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
    }
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".lightbox-trigger");

    if (trigger) {
      openLightbox(trigger);
    }
  });

  document.addEventListener("keydown", (event) => {
    const trigger = event.target.closest(".lightbox-trigger");

    if (
      trigger &&
      !trigger.matches("button, a") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openLightbox(trigger);
    }
  });

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("inert", "");
    getLightboxSiblings().forEach((element) => {
      element.inert = false;
    });
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";

    if (lastLightboxTrigger) {
      lastLightboxTrigger.focus();
    }
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && lightbox.classList.contains("is-active")) {
      event.preventDefault();
      lightboxClose.focus();
    }

    if (event.key === "Escape" && lightbox.classList.contains("is-active")) {
      closeLightbox();
    }
  });
}

/* =========================================================
   Trinity Environmental Final Design Carousel
========================================================= */

document.querySelectorAll("[data-trinity-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".trinity-gallery__track");
  const pages = Array.from(carousel.querySelectorAll(".trinity-gallery__page"));
  const previousButton = carousel.querySelector(".trinity-gallery__arrow--previous");
  const nextButton = carousel.querySelector(".trinity-gallery__arrow--next");
  const dots = Array.from(carousel.querySelectorAll(".trinity-gallery__dots button"));
  const status = carousel.querySelector(".trinity-gallery__status");

  if (!track || pages.length < 2 || !previousButton || !nextButton) return;

  let currentPage = 0;

  function updateTrinityCarousel() {
    track.style.transform = `translateX(-${currentPage * 100}%)`;

    pages.forEach((page, index) => {
      const isHidden = index !== currentPage;
      page.setAttribute("aria-hidden", String(isHidden));
      page.inert = isHidden;
    });

    dots.forEach((dot, index) => {
      const isCurrent = index === currentPage;
      dot.classList.toggle("is-active", isCurrent);

      if (isCurrent) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length - 1;

    if (status) {
      status.textContent = `Gallery ${currentPage + 1} of ${pages.length}`;
    }
  }

  previousButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage -= 1;
      updateTrinityCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < pages.length - 1) {
      currentPage += 1;
      updateTrinityCarousel();
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentPage = index;
      updateTrinityCarousel();
    });
  });

  updateTrinityCarousel();
});

/* =========================================================
   Bianco Brothers Final Design Carousel
========================================================= */

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

/* =========================================================
   Global Back to Top Button
========================================================= */

const backToTopButton = document.createElement("button");
backToTopButton.className = "back-to-top";
backToTopButton.type = "button";
backToTopButton.setAttribute("aria-label", "Back to top");
backToTopButton.setAttribute("title", "Back to top");
backToTopButton.innerHTML = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 15L12 9L18 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
`;

document.body.appendChild(backToTopButton);

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateBackToTopButton() {
  const showButton = window.scrollY > Math.max(520, window.innerHeight * 0.75);
  backToTopButton.classList.toggle("is-visible", showButton);
}

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotionQuery.matches ? "auto" : "smooth"
  });
});

window.addEventListener("scroll", updateBackToTopButton, { passive: true });
window.addEventListener("resize", updateBackToTopButton);
updateBackToTopButton();
