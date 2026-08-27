export const productCategories = ["All", "Laravel", "Business", "Developer Tools"];

export const products = [
  {
    id: "laravel-filament-starter",
    slug: "laravel-filament-starter",
    title: "Laravel Filament Starter Kit",
    category: "Laravel",
    description: "A production-ready Laravel starter project for rapidly building admin panels and information systems.",
    longDescription: "Start a Laravel and Filament project with the common application foundation already prepared, so you can spend more time on the workflow that makes your product unique.",
    image: "assets/images/products/laravel-filament-starter.svg",
    gallery: [],
    price: {
      amount: 149000,
      currency: "IDR",
      label: "Rp149.000"
    },
    technologies: ["Laravel", "Filament", "MySQL", "Docker"],
    features: [
      "Authentication",
      "Filament Admin Panel",
      "User Management",
      "Role & Permission",
      "Dashboard",
      "Application Settings",
      "Activity Log",
      "PDF Export",
      "Excel Export",
      "Docker Development Environment",
      "README & Installation Guide",
      "Production Deployment Guide"
    ],
    requirements: ["PHP", "Composer", "MySQL or PostgreSQL", "Node.js", "Basic Laravel knowledge"],
    licenses: [
      { name: "Personal License", description: "Use for one personal, non-commercial project." },
      { name: "Commercial License", description: "Use for one commercial or client project." }
    ],
    restrictions: ["Do not resell the source code.", "Do not redistribute the source files.", "Do not upload the source to another marketplace."],
    demo: null,
    checkout: `https://wa.me/+6285156637373?text="Hi Taufik, saya tertarik dengan Laravel Filament Starter Kit dan ingin mendiskusikan customization untuk kebutuhan project saya."`,
    featured: true,
    badge: "New",
    status: "available",
    customizationMessage: "Hi Taufik, saya tertarik dengan Laravel Filament Starter Kit dan ingin mendiskusikan customization untuk kebutuhan project saya."
  }
];

export const visibleProducts = products.filter((product) => !["draft", "discontinued"].includes(product.status));

export const productStatusLabels = {
  available: "Available",
  "coming-soon": "Coming soon",
  discontinued: "Discontinued",
  draft: "Draft"
};

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);
