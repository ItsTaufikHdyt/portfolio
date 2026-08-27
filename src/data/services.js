export const services = [
  {
    id: "custom-web-application",
    slug: "custom-web-application",
    title: "Custom Web Application",
    description: "Information systems, dashboards, internal tools, business applications, and REST APIs designed around real workflows.",
    icon: "code-slash-outline",
    features: ["Information systems", "Administration systems", "Dashboards", "Internal tools", "Business applications", "REST APIs"],
    technologies: ["Laravel", "Filament", "PostgreSQL", "MySQL"],
    startingPrice: "Rp2.000.000",
    priceLabel: "Starting from",
    ctaLabel: "Discuss Project",
    whatsappMessage: "Hi Taufik, saya melihat layanan Custom Web Application di portfolio Anda dan ingin mendiskusikan kebutuhan aplikasi saya.",
    featured: true
  },
  {
    id: "website-development",
    slug: "website-development",
    title: "Website Development",
    description: "Fast, responsive websites for companies, organizations, businesses, and personal brands.",
    icon: "browsers-outline",
    features: ["Company profiles", "Landing pages", "Personal websites", "Organization websites", "Business websites"],
    technologies: ["Astro", "JavaScript", "HTML", "CSS"],
    startingPrice: "Rp1.000.000",
    priceLabel: "Starting from",
    ctaLabel: "Discuss Website",
    whatsappMessage: "Hi Taufik, saya melihat layanan Website Development di portfolio Anda dan ingin mendiskusikan website yang saya butuhkan.",
    featured: false
  },
  {
    id: "gis-webgis",
    slug: "gis-webgis",
    title: "GIS & WebGIS",
    description: "Interactive maps, spatial dashboards, data integration, and WebGIS solutions for planning and decision-making.",
    icon: "map-outline",
    features: ["Interactive maps", "Spatial dashboards", "GeoServer", "GeoNode", "PostGIS", "ArcGIS integration", "Spatial data visualization"],
    technologies: ["GIS", "ArcGIS", "QGIS", "GeoServer", "GeoNode", "PostGIS"],
    startingPrice: "Let's discuss",
    priceLabel: "Project estimate",
    ctaLabel: "Discuss GIS Project",
    whatsappMessage: "Hi Taufik, saya melihat layanan GIS & WebGIS di portfolio Anda dan ingin mendiskusikan kebutuhan geospasial organisasi saya.",
    featured: true
  },
  {
    id: "deployment-server",
    slug: "deployment-server",
    title: "Deployment & Server",
    description: "Production deployment and server configuration for applications that are ready to go live.",
    icon: "server-outline",
    features: ["Laravel deployment", "VPS setup", "Docker", "Nginx", "Database configuration", "Domain & SSL", "Production configuration"],
    technologies: ["Docker", "Linux", "Nginx", "VPS", "SSL"],
    startingPrice: "Rp300.000",
    priceLabel: "Starting from",
    ctaLabel: "Need Deployment Help?",
    whatsappMessage: "Hi Taufik, saya membutuhkan bantuan deployment atau konfigurasi server untuk aplikasi saya.",
    featured: true
  }
];

export const serviceHighlights = services.filter((service) => service.featured);

export const serviceWorkflow = [
  { number: "01", title: "Tell Me Your Problem", description: "Share the need, workflow, or problem you want to solve." },
  { number: "02", title: "Define the Solution", description: "We define the requirements, scope, timeline, and estimated cost." },
  { number: "03", title: "Development", description: "Design and development move forward based on the agreed scope." },
  { number: "04", title: "Delivery", description: "The solution is tested, deployed, documented, and handed over." }
];

export const generalServiceMessage = "Hi Taufik, saya melihat portfolio Anda dan ingin mendiskusikan sebuah project.";

export const inquiryOptions = [
  "Website",
  "Web Application",
  "GIS / WebGIS",
  "Deployment",
  "Product Customization",
  "Other"
];
