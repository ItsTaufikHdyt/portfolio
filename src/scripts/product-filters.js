const catalog = document.querySelector("[data-product-catalog]");

if (catalog) {
  const buttons = catalog.querySelectorAll("[data-product-filter]");
  const cards = catalog.querySelectorAll("[data-product-card]");
  const emptyState = catalog.querySelector("[data-product-empty]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.productFilter;
      let visibleCount = 0;

      cards.forEach((card) => {
        const isVisible = category === "all" || card.dataset.category === category;
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      buttons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });
}
