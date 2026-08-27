const track = (action, label = "") => {
  const detail = {
    event: "portfolio_conversion",
    action,
    label,
    path: window.location.pathname
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent("portfolio:analytics", { detail }));
};

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    track(element.dataset.track, element.dataset.trackLabel);

    if (element.href?.startsWith("https://wa.me/") && element.dataset.track !== "whatsapp_click") {
      track("whatsapp_click", element.dataset.trackLabel);
    }
  });
});

const productView = document.querySelector("[data-product-view]");
if (productView) track("product_view", productView.dataset.productView);
