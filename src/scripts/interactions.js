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
const projectQuery = document.querySelector("[data-project-query]");
const projectEmpty = document.querySelector("[data-project-empty]");
let selectedCategory = "all";

const filterProjects = (category = selectedCategory) => {
  selectedCategory = category;
  const query = projectQuery?.value.trim().toLocaleLowerCase() || "";
  let visible = 0;
  filterItems.forEach((item) => {
    const matchesCategory = category === "all" || category === item.dataset.category;
    const matchesQuery = `${item.querySelector(".project-title")?.textContent || ""} ${item.dataset.category || ""} ${item.dataset.technologies || ""} ${item.dataset.description || ""}`.toLocaleLowerCase().includes(query);
    const matches = matchesCategory && matchesQuery;
    item.classList.toggle("active", matches);
    if (matches) visible++;
  });
  if (projectEmpty) projectEmpty.hidden = visible > 0;
};

projectQuery?.addEventListener("input", () => filterProjects());
document.querySelector("[data-project-search-form]")?.addEventListener("submit", (event) => event.preventDefault());
document.querySelector("[data-discovery-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (projectQuery) projectQuery.value = document.querySelector("[data-discovery-input]")?.value || "";
  filterProjects("all");
  filterButtons.forEach((button) => {
    const active = button.textContent.trim().toLowerCase() === "all";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    if (active) lastFilterButton = button;
  });
  if (filterSelectValue) filterSelectValue.textContent = "All";
  activatePage("portfolio");
  projectQuery?.focus();
});

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
    activatePage(trigger.dataset.navTarget);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && testimonialModalContainer?.classList.contains("active")) {
    setTestimonialModalOpen(false);
    return;
  }
});
