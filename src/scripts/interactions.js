"use strict";

const toggle = (element) => element?.classList.toggle("active");

const sidebar = document.querySelector("[data-sidebar]");
const sidebarButton = document.querySelector("[data-sidebar-btn]");

sidebarButton?.addEventListener("click", () => {
  toggle(sidebar);
  sidebarButton.setAttribute("aria-expanded", String(sidebar.classList.contains("active")));
});

const testimonialItems = document.querySelectorAll("[data-testimonials-item]");
const testimonialModalContainer = document.querySelector("[data-modal-container]");
const testimonialModalClose = document.querySelector("[data-modal-close-btn]");
const testimonialOverlay = document.querySelector("[data-overlay]");
const testimonialModalImage = document.querySelector("[data-modal-img]");
const testimonialModalTitle = document.querySelector("[data-modal-title]");
const testimonialModalText = document.querySelector("[data-modal-text]");
let testimonialTrigger = null;

const setTestimonialModalOpen = (isOpen) => {
  testimonialModalContainer?.classList.toggle("active", isOpen);
  testimonialOverlay?.classList.toggle("active", isOpen);
  testimonialModalContainer?.setAttribute("aria-hidden", String(!isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";

  if (isOpen) testimonialModalClose?.focus();
  else testimonialTrigger?.focus();
};

testimonialItems.forEach((item) => {
  item.addEventListener("click", () => {
    const sourceImage = item.querySelector("[data-testimonials-avatar]");
    const sourceTitle = item.querySelector("[data-testimonials-title]");
    const sourceText = item.querySelector("[data-testimonials-text]");
    testimonialTrigger = item;

    if (sourceImage && testimonialModalImage) {
      testimonialModalImage.src = sourceImage.src;
      testimonialModalImage.alt = sourceImage.alt;
    }
    if (sourceTitle && testimonialModalTitle) testimonialModalTitle.textContent = sourceTitle.textContent;
    if (sourceText && testimonialModalText) testimonialModalText.innerHTML = sourceText.innerHTML;

    setTestimonialModalOpen(true);
  });
});

testimonialModalClose?.addEventListener("click", () => setTestimonialModalOpen(false));
testimonialOverlay?.addEventListener("click", () => setTestimonialModalOpen(false));

const filterSelect = document.querySelector("[data-select]");
const filterSelectItems = document.querySelectorAll("[data-select-item]");
const filterSelectValue = document.querySelector("[data-selecct-value]");
const filterButtons = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterProjects = (selectedValue) => {
  filterItems.forEach((item) => {
    item.classList.toggle("active", selectedValue === "all" || selectedValue === item.dataset.category);
  });
};

filterSelect?.addEventListener("click", () => {
  toggle(filterSelect);
  filterSelect.setAttribute("aria-expanded", String(filterSelect.classList.contains("active")));
});

filterSelectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedValue = item.textContent.trim().toLowerCase();
    if (filterSelectValue) filterSelectValue.textContent = item.textContent;
    filterSelect?.classList.remove("active");
    filterSelect?.setAttribute("aria-expanded", "false");
    filterProjects(selectedValue);
  });
});

let lastFilterButton = filterButtons[0];
lastFilterButton?.setAttribute("aria-pressed", "true");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedValue = button.textContent.trim().toLowerCase();
    if (filterSelectValue) filterSelectValue.textContent = button.textContent;
    filterProjects(selectedValue);

    lastFilterButton?.classList.remove("active");
    lastFilterButton?.setAttribute("aria-pressed", "false");
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    lastFilterButton = button;
  });
});

const projectCards = document.querySelectorAll("[data-project-card]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalOverlay = document.querySelector("[data-project-modal-overlay]");
const projectModalClose = document.querySelector("[data-project-modal-close]");
const projectModalImage = document.querySelector("[data-project-modal-image]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalMeta = document.querySelector("[data-project-modal-meta]");
const projectModalTechnologies = document.querySelector("[data-project-modal-technologies]");
const projectModalActions = document.querySelector("[data-project-modal-actions]");
const projectServiceCta = document.querySelector("[data-project-service-cta]");
const projectCtaTitle = document.querySelector("[data-project-cta-title]");
let projectModalTrigger = null;

const safeHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
};

const getProjectDetails = (card) => {
  const item = card.closest("[data-project-id]");
  const title = item.querySelector(".project-title").textContent.trim();
  const category = item.querySelector(".project-category").textContent.trim();
  const image = item.querySelector(".project-img img");

  return {
    title,
    category,
    image: image.src,
    imageAlt: image.alt,
    description: item.dataset.description || `${title} is presented in this portfolio as a ${category.toLowerCase()} project.`,
    technologies: (item.dataset.technologies || "").split(",").map((value) => value.trim()).filter(Boolean),
    github: safeHttpUrl(item.dataset.github || ""),
    demo: safeHttpUrl(item.dataset.demo || ""),
    serviceSlug: item.dataset.serviceSlug || "custom-web-application"
  };
};

const closeProjectModal = () => {
  if (!projectModalContainer?.classList.contains("active")) return;
  projectModalContainer.classList.remove("active");
  projectModalContainer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("project-modal-open");
  projectModalTrigger?.focus();
};

const renderProjectActions = (project) => {
  if (!projectModalActions) return;
  projectModalActions.replaceChildren();

  [
    { url: project.github, label: "View GitHub", className: "btn btn-secondary" },
    { url: project.demo, label: "View live demo", className: "btn btn-primary" }
  ].forEach((action) => {
    if (!action.url) return;
    const link = document.createElement("a");
    link.href = action.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = action.className;
    link.textContent = action.label;
    projectModalActions.append(link);
  });

  projectModalActions.hidden = !projectModalActions.children.length;
};

const openProjectModal = (card) => {
  const project = getProjectDetails(card);
  projectModalTrigger = card;

  if (projectModalImage) {
    projectModalImage.src = project.image;
    projectModalImage.alt = project.imageAlt || `${project.title} project preview`;
  }
  if (projectModalTitle) projectModalTitle.textContent = project.title;
  if (projectModalCategory) projectModalCategory.textContent = project.category;
  if (projectModalDescription) projectModalDescription.textContent = project.description;

  if (projectModalTechnologies) {
    projectModalTechnologies.replaceChildren(...project.technologies.map((technology) => {
      const item = document.createElement("li");
      item.textContent = technology;
      return item;
    }));
  }
  if (projectModalMeta) projectModalMeta.hidden = !project.technologies.length;
  renderProjectActions(project);

  if (projectServiceCta) {
    projectServiceCta.href = `${projectServiceCta.dataset.serviceBase}#${project.serviceSlug}`;
    projectServiceCta.dataset.trackLabel = project.title;
  }
  if (projectCtaTitle) {
    projectCtaTitle.textContent = project.serviceSlug === "gis-webgis"
      ? "Need a WebGIS solution for your organization?"
      : "Need a similar digital solution for your organization?";
  }

  projectModalContainer?.classList.add("active");
  projectModalContainer?.setAttribute("aria-hidden", "false");
  document.body.classList.add("project-modal-open");
  projectModalClose?.focus();
};

projectCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    openProjectModal(card);
  });
});

projectModalClose?.addEventListener("click", closeProjectModal);
projectModalOverlay?.addEventListener("click", closeProjectModal);

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formButton = document.querySelector("[data-form-btn]");

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (form?.checkValidity()) formButton?.removeAttribute("disabled");
    else formButton?.setAttribute("disabled", "");
  });
});

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const navigationTriggers = document.querySelectorAll("[data-nav-target]");
const pages = document.querySelectorAll("[data-page]");

const activatePage = (pageName) => {
  pages.forEach((page) => page.classList.toggle("active", page.dataset.page === pageName));
  navigationLinks.forEach((link) => {
    const isActive = link.dataset.navTarget === pageName;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const initialPage = window.location.hash.slice(1);
if ([...pages].some((page) => page.dataset.page === initialPage)) activatePage(initialPage);

navigationTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    closeProjectModal();
    activatePage(trigger.dataset.navTarget);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && testimonialModalContainer?.classList.contains("active")) {
    setTestimonialModalOpen(false);
    return;
  }

  if (!projectModalContainer?.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeProjectModal();
    return;
  }

  if (event.key === "Tab") {
    const focusable = projectModalContainer.querySelectorAll('button:not([disabled]), a[href]:not([hidden])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
});
