
const glitchBtn = document.getElementById("glitchBtn");
const cursorCross = document.getElementById("cursorCross");

glitchBtn.addEventListener("click", () => {
  document.body.classList.toggle("glitch-mode");

  const active = document.body.classList.contains("glitch-mode");
  glitchBtn.textContent = active
    ? "[ GLITCH MODE: ON ]"
    : "[ GLITCH MODE ]";
});

// Custom cursor
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    cursorCross.style.left = `${event.clientX}px`;
    cursorCross.style.top = `${event.clientY}px`;
  });
} else {
  cursorCross.style.display = "none";
}

// Random analog interference
const hero = document.querySelector(".hero");

function glitchFlash() {
  if (document.body.classList.contains("glitch-mode")) return;

  hero.style.filter = Math.random() > 0.5
    ? "brightness(1.12) contrast(1.1)"
    : "none";

  setTimeout(() => {
    hero.style.filter = "none";
  }, 90);
}

setInterval(glitchFlash, 3200);

// Slow, subtle collage movement
const movingElements = document.querySelectorAll(
  ".hero-character, .handwritten, .sticker-01, .sticker-02"
);

window.addEventListener("mousemove", (event) => {
  if (window.innerWidth < 760) return;

  const x = (event.clientX / window.innerWidth - 0.5);
  const y = (event.clientY / window.innerHeight - 0.5);

  movingElements.forEach((element, index) => {
    const depth = (index + 1) * 3;

    element.style.marginLeft = `${x * depth}px`;
    element.style.marginTop = `${y * depth}px`;
  });
});

// Reveal sections as they enter the viewport
const revealElements = document.querySelectorAll(
  ".section-heading, .fake-document, .dossier-text, " +
  ".evidence, .timeline-entry, .ada-image-wrap"
);

revealElements.forEach((element) => {
  element.style.transition =
    "opacity .65s ease, transform .65s ease";
  element.style.opacity = "0.12";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.style.opacity = "1";
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.12
});

revealElements.forEach((element) => observer.observe(element));

// Clicking the hero image creates a brief distortion
const leonImage = document.querySelector(".leon-img");

leonImage.addEventListener("click", () => {
  document.body.classList.add("glitch-mode");

  setTimeout(() => {
    document.body.classList.remove("glitch-mode");
  }, 650);
});

// Console easter egg
console.log(
  "%c LEON.EXE ",
  "background:#b8ff00;color:#080908;font-size:20px;font-weight:bold;"
);

console.log("MEMORY CORRUPTED.");
console.log("IF YOU CAN READ THIS, YOU ARE ALREADY INSIDE.");
