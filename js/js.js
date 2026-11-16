function initArticleCarousel() {
  const section = document.querySelector("#articles");
  if (!section) return;

  const cards = [...section.querySelectorAll(".article-card")];
  const prev = section.querySelector(".article-prev");
  const next = section.querySelector(".article-next");
  const counter = section.querySelector("#article-counter");
  const progress = section.querySelector("#article-progress-bar");

  if (!cards.length || !prev || !next) return;

  let active = 0;

  function render() {
    const total = cards.length;

    cards.forEach((card, i) => {
      let offset = i - active;

      // Keep the shortest distance when wrapping around.
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const distance = Math.abs(offset);
      const narrow = window.innerWidth <= 600;
      const direction = document.documentElement.dir === "rtl" ? -1 : 1;
      const x = direction * offset * Math.min(narrow ? 55 : 205, section.clientWidth * (narrow ? 0.15 : 0.21));
      const y = distance * 7;
      const rotation = direction * offset * -10;
      const scale = Math.max(0.68, 1 - distance * 0.13);
      const opacity = distance > (narrow ? 1 : 2) ? 0 : 1 - distance * (narrow ? 0.38 : 0.12);
      const zIndex = total - distance;

      card.style.transform =
        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ` +
        `rotate(${rotation}deg) scale(${scale})`;

      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.pointerEvents = distance === 0 ? "auto" : "none";
      card.setAttribute("aria-hidden", String(distance !== 0));
      card.inert = distance !== 0;
    });

    if (counter) {
      counter.textContent =
        `${String(active + 1).padStart(2, "0")} — ` +
        `${String(total).padStart(2, "0")}`;
      if (document.documentElement.lang === "fa") counter.textContent = counter.textContent.replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
    }

    if (progress) {
      progress.style.width = `${((active + 1) / total) * 100}%`;
    }
  }

  prev.addEventListener("click", () => {
    active = (active - 1 + cards.length) % cards.length;
    render();
  });

  next.addEventListener("click", () => {
    active = (active + 1) % cards.length;
    render();
  });

  // Keyboard navigation when the article section is focused.
  section.tabIndex = 0;
  section.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      active = (active + (document.documentElement.dir === "rtl" ? 1 : -1) + cards.length) % cards.length;
      render();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      active = (active + (document.documentElement.dir === "rtl" ? -1 : 1) + cards.length) % cards.length;
      render();
    }
  });

  window.addEventListener("resize", render);
  document.addEventListener("portfolio:languagechange", render);
  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initArticleCarousel);
} else {
  initArticleCarousel();
}


const aboutPhotoArea = document.querySelector(
  ".about-me__photo-area"
);

const aboutPhotoFrame = document.querySelector(
  ".about-me__frame"
);

if (aboutPhotoArea && aboutPhotoFrame) {
  aboutPhotoArea.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 850 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = aboutPhotoArea.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const angle = 3 + x * 5;

    aboutPhotoFrame.style.animation = "none";
    aboutPhotoFrame.style.transform = `rotate(${angle}deg)`;
  });

  aboutPhotoArea.addEventListener("mouseleave", () => {
    aboutPhotoFrame.style.transform = "";
    aboutPhotoFrame.style.animation = "";
  });
}
