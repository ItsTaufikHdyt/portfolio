'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
  sidebarBtn.setAttribute("aria-expanded", sidebar.classList.contains("active"));
});



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
let modalTrigger = null;

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  const isOpen = modalContainer.classList.contains("active");

  modalContainer.setAttribute("aria-hidden", !isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";

  if (isOpen) {
    modalCloseBtn.focus();
  } else if (modalTrigger) {
    modalTrigger.focus();
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalTrigger = this;

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modalContainer.classList.contains("active")) {
    testimonialsModalFunc();
  }
});



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.setAttribute("aria-expanded", "false");
select.addEventListener("click", function () {
  elementToggleFunc(this);
  this.setAttribute("aria-expanded", this.classList.contains("active"));
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    select.setAttribute("aria-expanded", "false");
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
lastClickedBtn.setAttribute("aria-pressed", "true");

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    lastClickedBtn.setAttribute("aria-pressed", "false");
    this.classList.add("active");
    this.setAttribute("aria-pressed", "true");
    lastClickedBtn = this;

  });

}



// Medium articles
const MEDIUM_CONFIG = {
  // Add the Medium username without the leading "@" to connect the live feed.
  username: "taufikhdyt",
  maxArticles: 6,
  feedToJsonEndpoint: "https://api.rss2json.com/v1/api.json?rss_url="
};

const mediumArticlesList = document.querySelector("[data-medium-articles]");

const getSafeHttpUrl = function (value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch (error) {
    return "";
  }
};

const getPlainText = function (html) {
  const template = document.createElement("template");
  template.innerHTML = html || "";
  template.content.querySelectorAll("script, style").forEach(function (element) {
    element.remove();
  });

  return (template.content.textContent || "").replace(/\s+/g, " ").trim();
};

const getArticleImage = function (article) {
  const directImage = getSafeHttpUrl(article.thumbnail || article.enclosure?.link || "");
  if (directImage) return directImage;

  const template = document.createElement("template");
  template.innerHTML = article.content || article.description || "";
  return getSafeHttpUrl(template.content.querySelector("img")?.src || "");
};

const renderBlogStatus = function (message, profileUrl) {
  mediumArticlesList.innerHTML = "";

  const statusItem = document.createElement("li");
  statusItem.className = "blog-status";

  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  statusItem.append(messageElement);

  if (profileUrl) {
    const profileLink = document.createElement("a");
    profileLink.href = profileUrl;
    profileLink.target = "_blank";
    profileLink.rel = "noopener noreferrer";
    profileLink.textContent = "View my articles on Medium";
    statusItem.append(profileLink);
  }

  mediumArticlesList.append(statusItem);
  mediumArticlesList.setAttribute("aria-busy", "false");
};

const createMediumArticleCard = function (article) {
  const articleUrl = getSafeHttpUrl(article.link);
  if (!articleUrl) return null;

  const title = getPlainText(article.title) || "Untitled article";
  const description = getPlainText(article.description || article.content);
  const excerpt = description.length > 170 ? `${description.slice(0, 167).trim()}...` : description;
  const publishedDate = new Date(article.pubDate);
  const hasValidDate = !Number.isNaN(publishedDate.getTime());
  const category = Array.isArray(article.categories) && article.categories.length
    ? getPlainText(article.categories[0])
    : "Medium";
  const imageUrl = getArticleImage(article);

  const item = document.createElement("li");
  item.className = "blog-post-item";

  const link = document.createElement("a");
  link.href = articleUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Read ${title} on Medium`);

  const imageBox = document.createElement("figure");
  imageBox.className = "blog-banner-box";

  if (imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = title;
    image.loading = "lazy";
    imageBox.append(image);
  } else {
    const fallback = document.createElement("div");
    fallback.className = "blog-image-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.textContent = "M";
    imageBox.append(fallback);
  }

  const content = document.createElement("div");
  content.className = "blog-content";

  const meta = document.createElement("div");
  meta.className = "blog-meta";

  const categoryElement = document.createElement("p");
  categoryElement.className = "blog-category";
  categoryElement.textContent = category;
  meta.append(categoryElement);

  if (hasValidDate) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.setAttribute("aria-hidden", "true");

    const time = document.createElement("time");
    time.dateTime = publishedDate.toISOString();
    time.textContent = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(publishedDate);

    meta.append(dot, time);
  }

  const heading = document.createElement("h3");
  heading.className = "h3 blog-item-title";
  heading.textContent = title;

  const excerptElement = document.createElement("p");
  excerptElement.className = "blog-text";
  excerptElement.textContent = excerpt || "Read the full article on Medium.";

  const readMore = document.createElement("span");
  readMore.className = "blog-read-more";
  readMore.innerHTML = "Read article <ion-icon name=\"arrow-forward-outline\" aria-hidden=\"true\"></ion-icon>";

  content.append(meta, heading, excerptElement, readMore);
  link.append(imageBox, content);
  item.append(link);

  return item;
};

const loadMediumArticles = async function () {
  if (!mediumArticlesList) return;

  const username = MEDIUM_CONFIG.username.trim().replace(/^@/, "");

  if (!username) {
    renderBlogStatus("Medium articles are not configured yet.");
    return;
  }

  const feedUrl = `https://medium.com/feed/@${encodeURIComponent(username)}`;
  const profileUrl = `https://medium.com/@${encodeURIComponent(username)}`;
  const requestUrl = `${MEDIUM_CONFIG.feedToJsonEndpoint}${encodeURIComponent(feedUrl)}`;

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) throw new Error(`Medium feed request failed with status ${response.status}`);

    const data = await response.json();
    if (data.status && data.status !== "ok") throw new Error("Medium feed returned an error");

    const articles = Array.isArray(data.items) ? data.items.slice(0, MEDIUM_CONFIG.maxArticles) : [];
    if (!articles.length) {
      renderBlogStatus("No articles published yet.", profileUrl);
      return;
    }

    const cards = articles.map(createMediumArticleCard).filter(Boolean);
    if (!cards.length) {
      renderBlogStatus("No articles published yet.", profileUrl);
      return;
    }

    mediumArticlesList.replaceChildren(...cards);
    mediumArticlesList.setAttribute("aria-busy", "false");
  } catch (error) {
    console.warn("Medium articles could not be loaded.", error);
    renderBlogStatus("Articles are temporarily unavailable.", profileUrl);
  }
};

loadMediumArticles();



// project details modal
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
let projectModalTrigger = null;

const getProjectDetails = function (card) {
  const item = card.closest("[data-project-id]");
  const title = item.querySelector(".project-title").textContent.trim();
  const category = item.querySelector(".project-category").textContent.trim();
  const image = item.querySelector(".project-img img");

  return {
    id: item.dataset.projectId,
    title,
    category,
    image: image.src,
    imageAlt: image.alt,
    description: item.dataset.description || `${title} is presented in this portfolio as a ${category.toLowerCase()} project.`,
    technologies: (item.dataset.technologies || "").split(",").map(function (technology) {
      return technology.trim();
    }).filter(Boolean),
    github: getSafeHttpUrl(item.dataset.github || ""),
    demo: getSafeHttpUrl(item.dataset.demo || "")
  };
};

const closeProjectModal = function () {
  if (!projectModalContainer?.classList.contains("active")) return;

  projectModalContainer.classList.remove("active");
  projectModalContainer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("project-modal-open");

  if (projectModalTrigger) projectModalTrigger.focus();
};

const renderProjectActions = function (project) {
  projectModalActions.replaceChildren();

  [
    { url: project.github, label: "View GitHub", className: "btn btn-secondary" },
    { url: project.demo, label: "View live demo", className: "btn btn-primary" }
  ].forEach(function (action) {
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

const openProjectModal = function (card) {
  const project = getProjectDetails(card);
  projectModalTrigger = card;

  projectModalImage.src = project.image;
  projectModalImage.alt = project.imageAlt || `${project.title} project preview`;
  projectModalTitle.textContent = project.title;
  projectModalCategory.textContent = project.category;
  projectModalDescription.textContent = project.description;

  projectModalTechnologies.replaceChildren(...project.technologies.map(function (technology) {
    const item = document.createElement("li");
    item.textContent = technology;
    return item;
  }));
  projectModalMeta.hidden = !project.technologies.length;
  renderProjectActions(project);

  projectModalContainer.classList.add("active");
  projectModalContainer.setAttribute("aria-hidden", "false");
  document.body.classList.add("project-modal-open");
  projectModalClose.focus();
};

for (let i = 0; i < projectCards.length; i++) {
  projectCards[i].addEventListener("click", function (event) {
    event.preventDefault();
    openProjectModal(this);
  });
}

projectModalClose.addEventListener("click", closeProjectModal);
projectModalOverlay.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", function (event) {
  if (!projectModalContainer.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeProjectModal();
    return;
  }

  if (event.key === "Tab") {
    const focusableElements = projectModalContainer.querySelectorAll(
      'button:not([disabled]), a[href]:not([hidden])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }
});

const projectNavigationTriggers = document.querySelectorAll("[data-nav-target]");

for (let i = 0; i < projectNavigationTriggers.length; i++) {
  projectNavigationTriggers[i].addEventListener("click", closeProjectModal);
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const navigationTriggers = document.querySelectorAll("[data-nav-target]");
const pages = document.querySelectorAll("[data-page]");

const activatePage = function (pageName) {
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.toggle("active", pages[i].dataset.page === pageName);
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    const isActive = navigationLinks[i].dataset.navTarget === pageName;
    navigationLinks[i].classList.toggle("active", isActive);

    if (isActive) {
      navigationLinks[i].setAttribute("aria-current", "page");
    } else {
      navigationLinks[i].removeAttribute("aria-current");
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

for (let i = 0; i < navigationTriggers.length; i++) {
  navigationTriggers[i].addEventListener("click", function () {
    activatePage(this.dataset.navTarget);
  });
}
