const project = (
  id,
  title,
  category,
  image,
  description = "",
  technologies = [],
  github = null,
  demo = null,
) => ({
  id,
  title,
  category,
  image,
  description:
    description ||
    `${title} is presented in this portfolio as a ${category.toLowerCase()} project.`,
  technologies,
  github,
  demo,
});

export const projects = [
  project(
    "peta-kita",
    "Peta Kita",
    "WebGIS Development",
    "assets/images/projects/petakita.jpg",
    "A web-based Geographic Information System (WebGIS) platform developed to support Bontang City's implementation of the One Map Policy and Satu Data Indonesia initiatives. The platform provides interactive geospatial data visualization and access to public datasets to support regional planning, decision-making, public services, and data transparency.",
    ["Laravel", "GIS", "ArcGIS", "QGIS", "Python", "Google Data Studio"],
    null,
    "https://petakita.bontangkota.go.id",
  ),
  project(
    "geoportal-kota-bontang",
    "Geoportal Kota Bontang",
    "WebGIS Development",
    "assets/images/projects/geoportal.jpg",
    "A web-based geospatial information platform developed to centralize, manage, publish, and provide access to Bontang City's spatial data. The platform enables users to discover and explore geospatial datasets, interactive maps, documents, dashboards, and GeoStories, supporting regional planning, data sharing, public transparency, Satu Data Indonesia, and the One Map Policy.",
    ["GeoNode", "GeoServer", "GIS", "WebGIS", "PostgreSQL", "PostGIS", "QGIS"],
    null,
    "https://geoportal.bontangkota.go.id",
  ),
  project(
    "posyandu-monitoring",
    "SIRINDU",
    "Web Development",
    "assets/images/projects/sirindu.jpg",
    "A web-based application for monitoring and reporting health targets for toddlers and pregnant women, including growth and development tracking, ANC services, and Posyandu-based service data.",
    ["PHP", "Laravel", "jQuery"],
    null,
    "https://sirindu.bontangkota.go.id",
  ),
  project(
    "portal-bontang",
    "Portal bontang",
    "Mobile Development",
    "assets/images/projects/portal-bontang.jpg",
    "A mobile application that provides integrated information and digital services from the Bontang City Government. The application includes the latest news, announcements, public services, city statistics, Smart City information, digital licensing, administrative services, financial transparency, staple food prices, and access to various government subdomains.",
    ["Dart", "Flutter"],
    null,
    null,
  ),
  project(
    "inspirasi-sida",
    "INSPIRASI SIDA",
    "Web Development",
    "assets/images/projects/inspirasisida.jpg",
    "Designed and developed a web-based platform for managing registration for the Si PEENA Innovation and Research Competition. The system also serves as an information and publication portal for regional innovations, research activities, and development initiatives conducted by the Bontang City Government.",
    ["PHP", "Laravel"],
    null,
    "https://inspirasisida.bontangkota.go.id",
  ),
  project(
    "check-it",
    "Check IT",
    "Applications",
    "assets/images/projects/checkit.png",
    "A simple and minimalist to-do list application designed to help users manage daily tasks efficiently. Users can add and organize tasks, set due dates, and access their task list offline, with all data stored locally on the device for fast and reliable use.",
    ["Dart", "Flutter"],
    "https://github.com/technowstack/todo_list_getx",
    null,
  ),
  
];

export const projectCategories = [
  "All",
  "Applications",
  "Web development",
  "WebGIS Development",
  // "Web design",
];
