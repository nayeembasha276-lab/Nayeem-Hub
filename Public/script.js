/* ============================================================
   PROJECT DATA — ADD NEW PROJECTS HERE
   ============================================================ */

const projects = [
  {
    name: "CampusTrack JDBC",
    badge: "Featured Project",
    description: "A Java JDBC based student management system.",
    technologies: ["Java", "JDBC", "MySQL"],
    features: [
      "Student management",
      "CRUD operations",
      "MySQL database integration",
    ],
    github: "https://github.com/nayeembasha276-lab/CampusTrack-JDBC",
    live: "",
    image: "assets/campustrack.png",
  },

  {
    name: "Spring Boot Student CRUD API",
    badge: "Backend Project",
    description: "A RESTful Student CRUD API developed using Spring Boot.",
    technologies: ["Java", "Spring Boot", "REST API", "Spring Data JPA", "MySQL"],
    features: [
      "Create student",
      "Get student",
      "Update student",
      "Delete student",
      "REST API testing using Postman",
    ],
    github: "https://github.com/nayeembasha276-lab/spring-boot-student-crud-api",
    live: "",
    image: "assets/student-crud.png",
  },

  {
    name: "fittness-monolithic",
    badge: "Backend Project",
    description: "A monolithic fitness management system developed using Spring Boot.",
    technologies: ["Java", "Spring Boot", "REST API", "Spring Data JPA", "MySQL/PostgreSQl", "Spring Security", "JWT", "Swagger", "Lombok", "Docker", "Render", "Neon"],
    features: [
      "User Registration & Login",
    "JWT Authentication & Authorization",
    "Role-Based Access Control",
    "Activity Tracking",
    "Personalized Recommendations",
    "Password Encryption using BCrypt",
    "Global Exception Handling",
    "Swagger/OpenAPI Documentation",
    "Dockerized Application",
    "Cloud Deployment with Render",
    "PostgreSQL Database hosted on Neon",
    ],
    github: "https://github.com/nayeembasha276-lab/fitness-monolith",
    live: "https://fitness-monolith-9zc8.onrender.com/swagger-ui/index.html",
    image: "assets/fitness.png",
  },
];

/* ============================================================
   INTERNSHIP DATA — ADD NEW INTERNSHIPS HERE
   ============================================================ */

const internships = [
  {
    role: "AI & ML",
    type: "Short-Term Internship",
    organization: "Scholar minds,Tirupati",
    duration: "04-05-2026 to 27-06-2026",
    description:
      "Completed a short-term internship focused on foundational Artificial Intelligence and Machine Learning concepts.",
    technologies: ["Python", "AI", "Machine Learning"],
  
  },

  // Future internships can be added here
];


// ============================================================
// DOM ELEMENTS
// ============================================================

const projectsContainer = document.getElementById("projects-container");
const internshipsContainer = document.getElementById("internships-container");
const modalOverlay = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close");
const navbar = document.getElementById("navbar");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

let lastFocusedElement = null;

// ============================================================
// HELPERS
// ============================================================

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isValidUrl = (url) => typeof url === "string" && /^https?:\/\/\S+$/i.test(url.trim());

const fallbackMarkup = (name) => `
  <div class="project-fallback">
    <span class="fallback-mark" aria-hidden="true">&lt;/&gt;</span>
    <span>${escapeHtml(name)}</span>
    <span>Preview image coming soon</span>
  </div>`;

const mediaMarkup = (project, className) => {
  const name = project.name || "Project";
  if (!project.image) {
    return `<div class="${className}">${fallbackMarkup(name)}</div>`;
  }
  return `<div class="${className}">
      <img src="${escapeHtml(project.image)}" alt="${escapeHtml(name)} project preview"
        loading="lazy" data-fallback-name="${escapeHtml(name)}" />
    </div>`;
};

// Replace broken images with a professional placeholder (no layout break).
const wireImageFallbacks = (root) => {
  root.querySelectorAll("img[data-fallback-name]").forEach((img) => {
    img.addEventListener("error", () => {
      const parent = img.parentElement;
      if (parent) parent.innerHTML = fallbackMarkup(img.dataset.fallbackName || "Project");
    });
  });
};

const tagsMarkup = (technologies = []) =>
  technologies.map((tech) => `<li class="tech-tag">${escapeHtml(tech)}</li>`).join("");

const featuresMarkup = (features = []) =>
  features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");

const linkButtons = (project, size = "") => {
  const cls = size ? `btn ${size}` : "btn";
  let html = "";
  if (isValidUrl(project.github)) {
    html += `<a class="${cls} btn-ghost" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`;
  }
  if (isValidUrl(project.live)) {
    html += `<a class="${cls} btn-primary" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`;
  }
  return html;
};

// ============================================================
// PROJECT RENDERING
// ============================================================

function renderProjects() {
  if (!projectsContainer) return;

  if (!Array.isArray(projects) || projects.length === 0) {
    projectsContainer.innerHTML = `<p class="section-sub">Projects will be published here soon.</p>`;
    return;
  }

  projectsContainer.innerHTML = projects
    .map(
      (project, index) => `
      <article class="project-card reveal">
        ${mediaMarkup(project, "project-media")}
        ${project.badge ? `<span class="project-badge">${escapeHtml(project.badge)}</span>` : ""}
        <div class="project-body">
          <h3>${escapeHtml(project.name || "Untitled project")}</h3>
          <p class="project-desc">${escapeHtml(project.description || "")}</p>
          <ul class="pills">${tagsMarkup(project.technologies)}</ul>
          <ul class="project-features">${featuresMarkup((project.features || []).slice(0, 3))}</ul>
          <div class="project-actions">
            ${linkButtons(project, "btn-sm")}
            <button class="btn btn-sm btn-ghost" type="button" data-project-index="${index}"
              aria-haspopup="dialog">View Details</button>
          </div>
        </div>
      </article>`
    )
    .join("");

  // badge must sit inside the media box
  projectsContainer.querySelectorAll(".project-card").forEach((card) => {
    const badge = card.querySelector(":scope > .project-badge");
    const media = card.querySelector(".project-media");
    if (badge && media) media.appendChild(badge);
  });

  wireImageFallbacks(projectsContainer);
  observeReveals(projectsContainer.querySelectorAll(".reveal"));

  projectsContainer.querySelectorAll("[data-project-index]").forEach((button) => {
    button.addEventListener("click", () => openModal(Number(button.dataset.projectIndex)));
  });
}

/* ============================================================
   INTERNSHIP RENDERING
   ============================================================ */

function renderInternships() {
  if (!internshipsContainer) return;

  if (!Array.isArray(internships) || internships.length === 0) {
    internshipsContainer.innerHTML =
      `<p class="section-sub">Internship experience will be added here.</p>`;
    return;
  }

  internshipsContainer.innerHTML = internships
    .map(
      (internship) => `
        <article class="card skill-card reveal">
          <h3>${escapeHtml(internship.role)}</h3>

          <p class="footer-role">
            ${escapeHtml(internship.type)}
            ${internship.duration ? ` • ${escapeHtml(internship.duration)}` : ""}
          </p>

          <p class="project-desc">
            ${escapeHtml(internship.description)}
          </p>

          ${
            internship.technologies?.length
              ? `
                <ul class="pills">
                  ${internship.technologies
                    .map(
                      (tech) =>
                        `<li>${escapeHtml(tech)}</li>`
                    )
                    .join("")}
                </ul>
              `
              : ""
          }
        </article>
      `
    )
    .join("");

  observeReveals(
    internshipsContainer.querySelectorAll(".reveal")
  );
}


// ============================================================
// PROJECT MODAL
// ============================================================

function buildModalContent(project) {
  return `
    ${mediaMarkup(project, "modal-media")}
    <div class="modal-content">
      ${project.badge ? `<span class="modal-badge">${escapeHtml(project.badge)}</span>` : ""}
      <h2 id="modal-title">${escapeHtml(project.name || "Project")}</h2>
      <p>${escapeHtml(project.description || "")}</p>
      ${
        (project.technologies || []).length
          ? `<h4>Technologies</h4><ul class="pills">${tagsMarkup(project.technologies)}</ul>`
          : ""
      }
      ${
        (project.features || []).length
          ? `<h4>Key Features</h4><ul class="project-features">${featuresMarkup(project.features)}</ul>`
          : ""
      }
      <div class="modal-actions">${linkButtons(project)}</div>
    </div>`;
}

function openModal(index) {
  const project = projects[index];
  if (!project || !modalOverlay || !modalBody) return;

  lastFocusedElement = document.activeElement;
  modalBody.innerHTML = buildModalContent(project);
  wireImageFallbacks(modalBody);

  modalOverlay.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modalOverlay.classList.add("open"));
  if (modalCloseBtn) modalCloseBtn.focus();
}

function closeModal() {
  if (!modalOverlay || modalOverlay.hidden) return;
  modalOverlay.classList.remove("open");
  document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    modalOverlay.hidden = true;
    if (modalBody) modalBody.innerHTML = "";
  }, 220);

  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

if (modalOverlay) {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (!modalOverlay || modalOverlay.hidden) return;

  if (event.key === "Escape") {
    closeModal();
    return;
  }

  if (event.key === "Tab") {
    const focusable = modalOverlay.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

// ============================================================
// NAVBAR
// ============================================================

function initNavbar() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  const onScroll = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 12);
    highlightActiveLink();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function highlightActiveLink() {
  let currentId = "";
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section && section.getBoundingClientRect().top <= 140) currentId = link.getAttribute("href");
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentId);
  });
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================

let revealObserver = null;

function initRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  observeReveals(document.querySelectorAll(".reveal"));
}

function observeReveals(elements) {
  if (!revealObserver) {
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }
  elements.forEach((el) => revealObserver.observe(el));
}

// ============================================================
// INIT
// ============================================================

initRevealObserver();
renderProjects();
renderInternships();
initNavbar();
/* ============================================================
   Current Status
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const statusContainer = document.getElementById(
    "current-status-container"
  );

  const statusElement = document.getElementById("current-status");

  // If status is empty, hide the complete status section
  if (!CURRENT_STATUS || CURRENT_STATUS.trim() === "") {
    if (statusContainer) {
      statusContainer.style.display = "none";
    }
    return;
  }

  // If status exists, show it
  if (statusElement) {
    statusElement.textContent = CURRENT_STATUS;
  }
});