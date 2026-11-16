"use strict";

/* =========================================================
   DARK BENTO PORTFOLIO — INTERACTIONS & CONFIGURATION
   ========================================================= */

/*
  EDIT YOUR PERSONAL INFORMATION HERE.

  Keep statistics honest and links connected only to real work.
  Use an empty string for links that are not available yet.
*/

const CONFIG = {
  name: "YOUR NAME",
  city: "YOUR CITY",
  university: "YOUR UNIVERSITY",
  startYear: "2025",

  email: "hello@example.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  telegram: "https://t.me/",

  statistics: {
    projects: 3,
    technologies: 8,
    certificates: 0
  }
};

/*
  Project information powers the detail modal.

  Planned technologies are intentionally separated from
  technologies used in the current implementation.
  Add repository and demo URLs only when they actually exist.
*/

const PROJECTS = {
  shenoava: {
    title: "Shenoava",
    category: "HEALTH TECH / AI CONCEPT",
    status: "IN DEVELOPMENT",
    summary:
      "A health-tech platform concept focused on occupational health, hearing wellness, and personalized digital assistance.",

    goals: [
      "Explore a user-friendly hearing-health experience.",
      "Develop a foundation for patient and specialist workflows.",
      "Investigate privacy-aware AI assistance."
    ],

    implementation: [
      "The backend uses Node.js, Express, PostgreSQL, and Prisma.",
      "The current backend work includes authentication and role-based access control.",
      "The final AI features and complete production platform are not yet claimed as finished."
    ],

    used: [
      "WordPress for earlier interface and MVP exploration.",
      "Node.js and Express for backend development.",
      "PostgreSQL and Prisma for database work.",
      "TypeScript for relevant frontend development."
    ],

    planned: [
      "Hearing-health AI assistant.",
      "Additional patient and specialist workflows.",
      "Privacy-aware deployment and integration."
    ],

    repository: "",
    demo: ""
  },

  portfolio: {
    title: "Interactive Portfolio",
    category: "CREATIVE DEVELOPMENT",
    status: "EXPERIMENTAL",
    summary:
      "An editorial personal website exploring expressive typography, responsive Bento layouts, and lightweight interactive UI.",

    goals: [
      "Create a recognizable personal digital identity.",
      "Explore asymmetric CSS Grid compositions.",
      "Make navigation and interactive elements accessible."
    ],

    implementation: [
      "Semantic HTML5 for the document structure.",
      "CSS Grid, responsive media queries, and CSS animations.",
      "Vanilla JavaScript for the navigation, dialogs, and form behavior."
    ],

    used: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Google Fonts"
    ],

    planned: [
      "Replace the profile placeholder with a real portrait.",
      "Add genuine project screenshots and repository links.",
      "Connect a custom domain when ready."
    ],

    repository: "",
    demo: ""
  },

  ai: {
    title: "AI Experiments",
    category: "ARTIFICIAL INTELLIGENCE",
    status: "EXPERIMENTAL",
    summary:
      "A developing collection of experiments around AI applications, workflow automation, and open-source models.",

    goals: [
      "Learn how AI can solve practical problems.",
      "Explore automation and API integration.",
      "Understand the deployment requirements of open-source models."
    ],

    implementation: [
      "This entry represents a research and experimentation area.",
      "Individual experiments should be documented as they are implemented.",
      "No completed AI product or published research is claimed here."
    ],

    used: [
      "Add each tool only after using it in a documented experiment."
    ],

    planned: [
      "Python-based experiments.",
      "n8n workflow prototypes.",
      "Local open-source model evaluation."
    ],

    repository: "",
    demo: ""
  }
};

/*
  Certificate entries are examples, not real credentials.

  Replace them with actual records before publishing the site.
*/

const CERTIFICATES = [
  {
    title: "Certificate Title",
    organization: "Add issuing organization",
    date: "Not provided",
    credentialId: "",
    verificationUrl: "",
    image: "",
    completed: false,
    description:
      "This is a preview placeholder. Replace it with a real certificate, issuing organization, issue date, and verification link when available."
  },
  {
    title: "Future Learning Goal",
    organization: "Planned",
    date: "Not completed",
    credentialId: "",
    verificationUrl: "",
    image: "",
    completed: false,
    description:
      "This is a planned learning goal, not a completed certificate. Update this entry after finishing a course or remove it entirely."
  }
];

/* ---------------------------------------------------------
   CONFIGURATION HELPERS
   --------------------------------------------------------- */

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function setOptionalLink(element, url) {
  if (!url) {
    element.hidden = true;
    return;
  }

  element.hidden = false;
  element.href = url;
}

function applyConfiguration() {
  setText("[data-config='name']", CONFIG.name);
  setText("[data-config='city']", CONFIG.city);
  setText("[data-config='university']", CONFIG.university);
  setText("[data-config='startYear']", CONFIG.startYear);
  setText("[data-config='email']", CONFIG.email);

  const projectStat = document.querySelector("[data-stat='projects']");
  const technologyStat = document.querySelector(
    "[data-stat='technologies']"
  );
  const certificateStat = document.querySelector(
    "[data-stat='certificates']"
  );

  if (projectStat) {
    projectStat.textContent = String(
      CONFIG.statistics.projects
    ).padStart(2, "0");
  }

  if (technologyStat) {
    technologyStat.textContent = String(
      CONFIG.statistics.technologies
    ).padStart(2, "0");
  }

  if (certificateStat) {
    certificateStat.textContent = String(
      CONFIG.statistics.certificates
    ).padStart(2, "0");
  }

  const emailLink = document.querySelector(
    "[data-contact='emailLink']"
  );

  if (emailLink) {
    emailLink.href = CONFIG.email
      ? `mailto:${CONFIG.email}`
      : "#contact";
  }

  setOptionalLink(
    document.querySelector("[data-contact='githubLink']"),
    CONFIG.github
  );

  setOptionalLink(
    document.querySelector("[data-contact='linkedinLink']"),
    CONFIG.linkedin
  );

  setOptionalLink(
    document.querySelector("[data-contact='telegramLink']"),
    CONFIG.telegram
  );

  document.title = `${CONFIG.name} — Digital Portfolio`;

  const year = document.getElementById("copyrightYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

/* ---------------------------------------------------------
   MOBILE NAVIGATION
   --------------------------------------------------------- */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function setMenuOpen(open) {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu"
  );

  navLinks.classList.toggle("is-open", open);
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    setMenuOpen(!isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setMenuOpen(false);
    }
  });
}

/* ---------------------------------------------------------
   ACTIVE SECTION INDICATOR
   --------------------------------------------------------- */

const navigationItems = [
  ...document.querySelectorAll(".nav-link")
];

const observedSections = navigationItems
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNavigation(id) {
  navigationItems.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio
        );

      if (visibleEntries.length) {
        setActiveNavigation(visibleEntries[0].target.id);
      }
    },
    {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5]
    }
  );

  observedSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* ---------------------------------------------------------
   SCROLL REVEAL ANIMATIONS
   --------------------------------------------------------- */

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  "IntersectionObserver" in window &&
  !reduceMotion
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

/* ---------------------------------------------------------
   SHARED ACCESSIBLE DETAIL DIALOG
   --------------------------------------------------------- */

const detailDialog = document.getElementById("detailDialog");
const dialogClose = document.getElementById("dialogClose");
const dialogEyebrow = document.getElementById("dialogEyebrow");
const dialogTitle = document.getElementById("dialogTitle");
const dialogSummary = document.getElementById("dialogSummary");
const dialogBody = document.getElementById("dialogBody");
const dialogActions = document.getElementById("dialogActions");

let lastDialogTrigger = null;

function addDialogButton(label, handler) {
  const button = document.createElement("button");

  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", handler);

  dialogActions.appendChild(button);
}

function addDialogLink(label, url, primary = false) {
  if (!url) return;

  const link = document.createElement("a");

  link.href = url;
  link.textContent = label;

  if (primary) {
    link.classList.add("dialog-primary");
  }

  if (/^https?:\/\//i.test(url)) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  dialogActions.appendChild(link);
}

function addDialogSection(title, items) {
  const heading = document.createElement("h3");
  heading.textContent = title;

  dialogBody.appendChild(heading);

  if (Array.isArray(items)) {
    const list = document.createElement("ul");

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.appendChild(listItem);
    });

    dialogBody.appendChild(list);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = items;
    dialogBody.appendChild(paragraph);
  }
}

function openDialog(trigger) {
  lastDialogTrigger = trigger || document.activeElement;

  if (detailDialog && !detailDialog.open) {
    detailDialog.showModal();
  }
}

function closeDialog() {
  if (detailDialog && detailDialog.open) {
    detailDialog.close();
  }
}

if (detailDialog) {
  detailDialog.addEventListener("close", () => {
    if (
      lastDialogTrigger &&
      lastDialogTrigger.isConnected &&
      typeof lastDialogTrigger.focus === "function"
    ) {
      lastDialogTrigger.focus();
    }
  });

  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) {
      closeDialog();
    }
  });
}

if (dialogClose) {
  dialogClose.addEventListener("click", closeDialog);
}

/* ---------------------------------------------------------
   PROJECT DETAILS
   --------------------------------------------------------- */

function openProjectDetails(projectId, trigger) {
  const project = PROJECTS[projectId];

  if (!project) return;

  dialogEyebrow.textContent = project.category;
  dialogTitle.textContent = project.title;
  dialogSummary.textContent = project.summary;

  dialogBody.replaceChildren();
  dialogActions.replaceChildren();

  addDialogSection("Current status", project.status);
  addDialogSection("Project goals", project.goals);
  addDialogSection("Implementation notes", project.implementation);
  addDialogSection("Technologies used / explored", project.used);
  addDialogSection("Potential next steps", project.planned);

  addDialogLink("OPEN GITHUB ↗", project.repository);
  addDialogLink("OPEN LIVE DEMO ↗", project.demo, true);

  if (!project.repository && !project.demo) {
    addDialogButton("LINKS NOT ADDED YET", () => {});
    const note = dialogActions.lastElementChild;

    if (note) {
      note.classList.add("dialog-disabled");
      note.setAttribute("aria-disabled", "true");
    }
  }

  openDialog(trigger);
}

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => {
    openProjectDetails(
      button.dataset.openProject,
      button
    );
  });
});

/*
  The project cards are keyboard accessible without making the
  nested detail button a competing click target.
*/

document.querySelectorAll(".project-card").forEach((card) => {
  const projectId = card.dataset.project;

  if (!projectId) return;

  card.addEventListener("keydown", (event) => {
    if (
      event.target !== card &&
      event.target.closest("button, a")
    ) {
      return;
    }

    if (event.key === "Enter") {
      openProjectDetails(projectId, card);
    }
  });

  card.tabIndex = 0;
  card.setAttribute(
    "aria-label",
    `Project: ${PROJECTS[projectId].title}. Press Enter for details.`
  );
});

/* ---------------------------------------------------------
   CERTIFICATE PREVIEW
   --------------------------------------------------------- */

function openCertificateDetails(index, trigger) {
  const certificate = CERTIFICATES[index];

  if (!certificate) return;

  dialogEyebrow.textContent = certificate.completed
    ? "COMPLETED CREDENTIAL"
    : "PORTFOLIO PLACEHOLDER";

  dialogTitle.textContent = certificate.title;
  dialogSummary.textContent = certificate.description;

  dialogBody.replaceChildren();
  dialogActions.replaceChildren();

  addDialogSection(
    "Issuing organization",
    certificate.organization
  );

  addDialogSection(
    "Issue date",
    certificate.date
  );

  if (certificate.credentialId) {
    addDialogSection(
      "Credential ID",
      certificate.credentialId
    );
  }

  if (certificate.completed && certificate.verificationUrl) {
    addDialogLink(
      "VERIFY CREDENTIAL ↗",
      certificate.verificationUrl,
      true
    );
  }

  if (certificate.image) {
    const image = document.createElement("img");

    image.src = certificate.image;
    image.alt = `Preview of ${certificate.title}`;
    image.loading = "lazy";
    image.style.display = "block";
    image.style.width = "100%";
    image.style.height = "auto";
    image.style.marginTop = "18px";
    image.style.borderRadius = "10px";

    dialogBody.appendChild(image);
  }

  if (!certificate.completed) {
    addDialogButton("NOT A VERIFIED CERTIFICATE", () => {
      closeDialog();
    });
  }

  openDialog(trigger);
}

document.querySelectorAll("[data-certificate]").forEach((button) => {
  button.addEventListener("click", () => {
    openCertificateDetails(
      Number(button.dataset.certificate),
      button
    );
  });
});

/* ---------------------------------------------------------
   COPY EMAIL
   --------------------------------------------------------- */

const copyEmailButton = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback for local development environments.
  const temporaryInput = document.createElement("textarea");

  temporaryInput.value = text;
  temporaryInput.setAttribute("readonly", "");
  temporaryInput.style.position = "fixed";
  temporaryInput.style.left = "-9999px";
  temporaryInput.style.top = "0";

  document.body.appendChild(temporaryInput);
  temporaryInput.select();

  let successful = false;

  try {
    successful = document.execCommand("copy");
  } finally {
    temporaryInput.remove();
  }

  if (!successful) {
    throw new Error("Copy operation was not successful.");
  }
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    if (!CONFIG.email || CONFIG.email === "hello@example.com") {
      copyFeedback.textContent =
        "Replace the example email in CONFIG first.";
      return;
    }

    try {
      await copyText(CONFIG.email);
      copyFeedback.textContent = "Email copied to clipboard.";
    } catch {
      copyFeedback.textContent =
        `Copy unavailable. Email: ${CONFIG.email}`;
    }
  });
}

/* ---------------------------------------------------------
   CONTACT FORM — FRONTEND DEMO
   --------------------------------------------------------- */

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);

    const senderName = String(
      formData.get("name") || ""
    ).trim();

    const senderEmail = String(
      formData.get("email") || ""
    ).trim();

    const senderMessage = String(
      formData.get("message") || ""
    ).trim();

    if (!CONFIG.email || CONFIG.email === "hello@example.com") {
      formFeedback.textContent =
        "Set your real contact email in CONFIG before using this form.";
      return;
    }

    const subject = `Portfolio inquiry from ${senderName}`;

    const body = [
      `Name: ${senderName}`,
      `Reply email: ${senderEmail}`,
      "",
      "Message:",
      senderMessage
    ].join("\n");

    const mailtoURL =
      `mailto:${CONFIG.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    formFeedback.textContent =
      "Opening your email application. Review and send the draft there.";

    /*
      This opens a locally handled email draft.
      It does not send a message or store form submissions.
    */

    window.location.href = mailtoURL;
  });
}

/* ---------------------------------------------------------
   FOOTER & INITIALIZATION
   --------------------------------------------------------- */

function initializePortfolio() {
  applyConfiguration();

  // Ensure all reveal content remains visible if JS is loaded late.
  if (reduceMotion) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Update the active navigation when entering via a hash link.
  const currentHash = window.location.hash;

  if (currentHash.length > 1) {
    const targetId = currentHash.slice(1);

    if (document.getElementById(targetId)) {
      setActiveNavigation(targetId);
    }
  }
}

initializePortfolio();