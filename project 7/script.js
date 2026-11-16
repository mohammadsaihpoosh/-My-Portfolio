
"use strict";

/* =========================================
   GRAFFITI RIOT — INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const coarsePointer = window.matchMedia(
    "(pointer: coarse)"
  );

  /* -----------------------------------------
     1. MOBILE NAVIGATION
     ----------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mainNav.classList.remove("is-open");
  }

  function openMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    mainNav.classList.add("is-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        mainNav.classList.contains("is-open") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------
     2. SCROLL REVEAL
     IntersectionObserver avoids checking
     every element on every scroll event.
     ----------------------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      // Small stagger for neighboring elements.
      if (
        element.closest(".comic-strip") ||
        element.closest(".gallery-grid") ||
        element.closest(".culture-collage")
      ) {
        element.style.transitionDelay =
          `${Math.min(index % 4, 3) * 65}ms`;
      }

      revealObserver.observe(element);
    });
  }

  /* -----------------------------------------
     3. GALLERY LIGHTBOX
     Uses the native HTML dialog element.
     ----------------------------------------- */

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const lightboxCounter = document.querySelector(".lightbox-counter");
  const lightboxClose = document.querySelector(".lightbox-close");

  const artCards = Array.from(
    document.querySelectorAll(".art-card")
  );

  let previouslyFocusedElement = null;

  function openArtwork(card, index) {
    if (
      !lightbox ||
      !lightboxImage ||
      !lightboxTitle ||
      !lightboxCaption
    ) {
      return;
    }

    const thumbnail = card.querySelector("img");
    const fullImage = card.dataset.full || thumbnail?.src;

    if (!fullImage) return;

    previouslyFocusedElement = document.activeElement;

    lightboxImage.src = fullImage;
    lightboxImage.alt = thumbnail?.alt || "Selected artwork";

    lightboxTitle.textContent =
      card.dataset.title || "Selected artwork";

    lightboxCaption.textContent =
      card.dataset.caption || "";

    if (lightboxCounter) {
      lightboxCounter.textContent =
        `${String(index + 1).padStart(2, "0")} / ` +
        `${String(artCards.length).padStart(2, "0")}`;
    }

    if (!lightbox.open) {
      lightbox.showModal();
    }

    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  artCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      openArtwork(card, index);
    });
  });

  function closeArtwork() {
    if (lightbox?.open) {
      lightbox.close();
    }
  }

  lightboxClose?.addEventListener("click", closeArtwork);

  lightbox?.addEventListener("click", (event) => {
    // Clicking the dark backdrop closes the dialog.
    if (event.target === lightbox) {
      closeArtwork();
    }
  });

  lightbox?.addEventListener("close", () => {
    if (
      previouslyFocusedElement &&
      document.contains(previouslyFocusedElement)
    ) {
      previouslyFocusedElement.focus();
    }
  });

  lightboxImage?.addEventListener("error", () => {
    lightboxCaption.textContent =
      "This image could not be loaded. Check your internet connection.";
  });

  /* -----------------------------------------
     4. CUSTOM CURSOR
     Only runs for fine-pointer devices.
     ----------------------------------------- */

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  const canUseCustomCursor =
    cursorDot &&
    cursorRing &&
    !coarsePointer.matches &&
    !reducedMotion.matches;

  let pointerX = -100;
  let pointerY = -100;
  let ringX = -100;
  let ringY = -100;
  let cursorFrame = 0;

  function updateCursor() {
    // Smooth the larger ring behind the real pointer.
    ringX += (pointerX - ringX) * 0.22;
    ringY += (pointerY - ringY) * 0.22;

    cursorDot.style.transform =
      `translate3d(${pointerX - 3}px, ${pointerY - 3}px, 0)`;

    cursorRing.style.transform =
      `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;

    cursorFrame = requestAnimationFrame(updateCursor);
  }

  if (canUseCustomCursor) {
    document.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
    });

    document.addEventListener("pointerover", (event) => {
      if (event.pointerType !== "mouse") return;

      const target = event.target;

      if (
        target instanceof Element &&
        target.closest("a, button, .art-card")
      ) {
        cursorRing.classList.add("is-hovering");
      } else {
        cursorRing.classList.remove("is-hovering");
      }
    });

    document.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget) {
        cursorDot.style.opacity = "0";
        cursorRing.style.opacity = "0";
      }
    });

    cursorFrame = requestAnimationFrame(updateCursor);
  }

  /* -----------------------------------------
     5. SHORT PAINT TRAIL
     A few temporary DOM elements, not a
     continuously running particle system.
     ----------------------------------------- */

  const trailColors = [
    "#ff2d8d",
    "#f7ff00",
    "#00d9ff",
    "#ff3030"
  ];

  let lastTrailTime = 0;
  let trailIndex = 0;

  if (!coarsePointer.matches && !reducedMotion.matches) {
    document.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      const now = performance.now();

      // Limit element creation to roughly 15 times per second.
      if (now - lastTrailTime < 65) return;

      lastTrailTime = now;

      // Do not generate trails over clickable interface elements.
      const target = event.target;

      if (
        target instanceof Element &&
        target.closest("a, button, .lightbox")
      ) {
        return;
      }

      const mark = document.createElement("span");

      mark.setAttribute("aria-hidden", "true");
      mark.className = "paint-trail-mark";

      const size = 4 + Math.random() * 8;
      const rotation = Math.random() * 90 - 45;
      const color =
        trailColors[trailIndex % trailColors.length];

      trailIndex++;

      mark.style.cssText = `
        position: fixed;
        z-index: 29;
        pointer-events: none;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        width: ${size}px;
        height: ${size * 1.7}px;
        border-radius: 2px 6px 3px 7px;
        background: ${color};
        transform: translate(-50%, -50%) rotate(${rotation}deg);
        opacity: .8;
        transition: opacity .35s ease, transform .35s ease;
      `;

      document.body.appendChild(mark);

      // Start the fade on the next animation frame.
      requestAnimationFrame(() => {
        mark.style.opacity = "0";
        mark.style.transform += " scale(.3)";
      });

      window.setTimeout(() => {
        mark.remove();
      }, 450);
    });
  }

  /* -----------------------------------------
     6. COMIC PANEL REACTIONS
     Sound effects pop briefly on pointer entry.
     On touch devices, the story remains readable.
     ----------------------------------------- */

  const comicPanels = document.querySelectorAll(".comic-panel");

  comicPanels.forEach((panel) => {
    const soundEffect = panel.querySelector(".sound-effect");

    if (!soundEffect) return;

    const popSound = () => {
      if (reducedMotion.matches) return;

      soundEffect.animate(
        [
          {
            transform: "scale(.45) rotate(-12deg)",
            opacity: 0
          },
          {
            transform: "scale(1.2) rotate(5deg)",
            opacity: 1,
            offset: 0.65
          },
          {
            transform: "scale(1) rotate(0deg)",
            opacity: 1
          }
        ],
        {
          duration: 280,
          easing: "cubic-bezier(.2,.8,.2,1)"
        }
      );
    };

    panel.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") {
        popSound();
      }
    });

    panel.addEventListener("click", popSound);
  });

  /* -----------------------------------------
     7. OPTIONAL IMAGE FALLBACK
     If an external image fails, keep the card
     usable and display a clear visual fallback.
     ----------------------------------------- */

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("image-unavailable");
      img.alt = img.alt
        ? `${img.alt} (image unavailable)`
        : "Image unavailable";

      // A visible fallback instead of a broken-image icon.
      img.style.display = "none";

      const parent = img.parentElement;

      if (parent && !parent.querySelector(".image-fallback")) {
        const fallback = document.createElement("span");

        fallback.className = "image-fallback";
        fallback.textContent = "ARTWORK OFFLINE ✳";
        fallback.setAttribute("role", "status");

        parent.appendChild(fallback);
      }
    });
  });

  /* -----------------------------------------
     8. CLEANUP
     ----------------------------------------- */

  window.addEventListener("pagehide", () => {
    if (cursorFrame) {
      cancelAnimationFrame(cursorFrame);
    }
  });
});
