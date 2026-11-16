/* Navigation, project filtering, scroll reveals, and accessible contact-form handling. */
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  nav.classList.toggle("open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

// Project category filter: each button controls the cards with a matching data-category.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

// Mark the current navigation destination while scrolling.
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));

  // Progressive reveal is disabled for reduced-motion preferences.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealTargets = document.querySelectorAll(
      ".intro-grid, .manifesto-art, .manifesto-copy, .project-card, .skills-grid, .timeline, .contact-copy"
    );
    revealTargets.forEach((element) => element.classList.add("reveal"));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => revealObserver.observe(element));
  }
}

// There is no backend here. Validate inputs, then prepare a draft in the visitor's email app.
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please complete all three fields before continuing.";
    formNote.style.color = "#df3026";
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formNote.textContent = "Please enter a valid email address.";
    formNote.style.color = "#df3026";
    document.querySelector("#contact-email").focus();
    return;
  }

  // Replace this placeholder with your real address before publishing.
  const recipient = "hello@example.com";
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`From: ${name}\nReply to: ${email}\n\n${message}`);
  formNote.textContent = "Opening your email app with a prepared draft. Replace hello@example.com in script.js with your real email before publishing.";
  formNote.style.color = "#d8c5a0";
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
