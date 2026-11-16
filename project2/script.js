const statusText = document.getElementById("statusText");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const light = document.body.classList.contains("light-mode");
  themeToggle.innerHTML = light ? "☾ <span>MODE</span>" : "☼ <span>MODE</span>";
  statusText.textContent = light ? "LIGHT MODE ENABLED" : "DARK MODE ENABLED";
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
    statusText.textContent = filter === "all" ? "SHOWING ALL PROJECTS" : `FILTER: ${button.textContent.trim().toUpperCase()}`;
  });
});

const dialog = document.getElementById("projectDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDesc = document.getElementById("dialogDesc");
const dialogTech = document.getElementById("dialogTech");
document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    dialogTitle.textContent = button.dataset.title;
    dialogDesc.textContent = button.dataset.desc;
    dialogTech.textContent = `TOOLS: ${button.dataset.tech}`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else alert(`${button.dataset.title}\n${button.dataset.desc}`);
  });
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
document.getElementById("dialogOk").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (!name || !email || !message) return;
  // Replace this address with your real email address.
  const destination = "hello@example.com";
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  document.getElementById("formHint").textContent = "Opening your email app…";
  window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".pixel-nav a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${entry.target.id}` ? "#ffe66b" : "";
      });
    }
  });
}, { rootMargin: "-30% 0px -60% 0px" });
sections.forEach(section => observer.observe(section));
