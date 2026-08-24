# Personal Portfolio Website

Website portfolio pribadi yang dibangun menggunakan **Astro** dan dioptimalkan sebagai static website untuk deployment melalui **GitHub Pages**.

Project ini merupakan hasil migrasi dari template portfolio berbasis **HTML, CSS, dan Vanilla JavaScript** ke Astro dengan tetap mempertahankan tampilan dan functionality utama, sekaligus membuat struktur project lebih modular dan data portfolio lebih mudah dikelola.

---

## ✨ Features

* Responsive personal portfolio
* Static site menggunakan Astro
* Data portfolio terpisah dari UI
* Project showcase
* Project detail modal
* Skills / technology showcase
* Professional experience
* Education information
* Blog / articles section
* Medium article integration
* Social media links
* Responsive navigation
* Optimized untuk desktop dan mobile
* Static deployment menggunakan GitHub Pages
* Custom domain ready

---

## 🚀 Tech Stack

Project ini menggunakan:

* **Astro**
* **HTML**
* **CSS**
* **JavaScript**
* **Node.js**
* **pnpm**
* **GitHub Pages**
* **GitHub Actions**

Astro digunakan sebagai static site generator sehingga website dapat menghasilkan HTML statis dengan JavaScript client-side seminimal mungkin.

---

## 📁 Project Structure

Struktur utama project:

```text
.
├── public/
│   ├── images/
│   ├── icons/
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── About.astro
│   │   ├── Blog.astro
│   │   ├── Contact.astro
│   │   ├── Navbar.astro
│   │   ├── Portfolio.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectModal.astro
│   │   ├── Sidebar.astro
│   │   └── Skills.astro
│   │
│   ├── data/
│   │   ├── profile.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── socials.js
│   │   └── site.js
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │
│   ├── pages/
│   │   └── index.astro
│   │
│   └── styles/
│       └── global.css
│
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── PRD.md
├── AGENTS.md
└── README.md
```

Struktur aktual dapat sedikit berbeda sesuai perkembangan project.

---

# 🧩 Data-Driven Portfolio

Salah satu tujuan utama migrasi ke Astro adalah memisahkan **data portfolio** dari komponen UI.

Dengan pendekatan ini, perubahan informasi portfolio dapat dilakukan tanpa harus mengubah markup komponen secara langsung.

Sebagian besar data berada di:

```text
src/data/
```

---

## 👤 Profile

Informasi profil dapat dikelola melalui:

```text
src/data/profile.js
```

Contoh struktur:

```js
export const profile = {
  name: "Your Name",
  role: "Software Engineer",
  location: "Indonesia",
  email: "your@email.com",
  bio: "Short professional introduction.",
  avatar: "/images/profile.webp",
};
```

---

## 💼 Projects

Daftar project dapat dikelola melalui:

```text
src/data/projects.js
```

Contoh:

```js
export const projects = [
  {
    id: "project-id",
    title: "Project Name",
    category: "Web Application",
    image: "/images/projects/project.webp",
    description: "Short project description.",
    technologies: [
      "Laravel",
      "JavaScript",
      "MySQL",
    ],
    github: "https://github.com/username/project",
    demo: "https://example.com",
  },
];
```

Untuk menambahkan project baru, cukup menambahkan object baru ke array tersebut.

Tidak perlu membuat project card secara manual di HTML.

---

## 🛠 Skills

Skills dapat dikelola melalui:

```text
src/data/skills.js
```

Contoh:

```js
export const skills = [
  {
    label: "Development",
    category: "Engineering",
    items: [
      "PHP",
      "JavaScript",
      "Laravel",
      "Flutter",
      "REST API",
      "Database",
    ],
  },

  {
    label: "Technology",
    category: "Tools & Creative",
    items: [
      "GIS",
      "AI Tools",
      "AI Automation",
      "GitHub",
      "Git",
      "Docker",
      "Photo Editing",
      "Video Editing",
    ],
  },
];
```

---

## 🔗 Social Links

Social media dan external links dapat dikelola melalui:

```text
src/data/socials.js
```

Contoh:

```js
export const socials = [
  {
    name: "GitHub",
    url: "https://github.com/username",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/username",
  },
];
```

---

# 🖼 Portfolio

Section Portfolio menampilkan project yang telah dikerjakan.

Informasi project berasal dari:

```text
src/data/projects.js
```

Setiap project dapat memiliki:

* Project title
* Category
* Screenshot
* Description
* Technologies
* GitHub URL
* Live demo URL

---

## Project Modal

Saat project dipilih, website menampilkan modal berisi informasi detail project.

Modal dapat menampilkan:

* Screenshot
* Project name
* Category
* Description
* Technologies
* GitHub link
* Live demo

Modal juga mendukung:

* Close button
* Click outside / overlay
* `Escape` keyboard
* Body scroll lock

---

# 📝 Blog / Articles

Website memiliki section Blog yang dapat digunakan untuk menampilkan artikel atau technical notes.

Artikel diarahkan untuk menggunakan **Medium** sebagai sumber utama sehingga tidak diperlukan backend maupun database tambahan.

Pendekatan ini cocok untuk website static karena Medium tetap digunakan sebagai platform publishing sementara portfolio berfungsi sebagai article showcase.

Contoh topik:

* Laravel
* JavaScript
* Astro
* Docker
* Linux
* GIS
* AI Tools
* Development Notes
* Troubleshooting

---

# 📱 Responsive Design

Website dirancang agar dapat digunakan dengan baik pada berbagai ukuran layar.

Target utama:

```text
1440px
1280px
1024px
768px
430px
390px
375px
```

Area yang diperhatikan meliputi:

* Navigation
* Sidebar
* About
* Skills
* Project cards
* Project modal
* Blog
* Contact
* Typography
* Images
* Spacing

---

# ⚡ Static Site

Astro digunakan dengan pendekatan:

> Static-first architecture

Sebagian besar halaman dirender saat proses build.

Keuntungannya:

* loading lebih cepat
* JavaScript client lebih sedikit
* mudah di-host
* tidak membutuhkan server
* tidak membutuhkan database
* cocok untuk GitHub Pages
* maintenance lebih sederhana

---

# 📦 Installation

Pastikan sudah menginstall:

* Node.js
* pnpm

Clone repository:

```bash
git clone https://github.com/username/portfolio.git
```

Masuk ke project:

```bash
cd portfolio
```

Install dependencies:

```bash
pnpm install
```

---

# 🧑‍💻 Development

Jalankan development server:

```bash
pnpm dev
```

Astro akan menjalankan local development server.

Biasanya dapat diakses melalui:

```text
http://localhost:4321
```

Terminal akan menampilkan URL aktual jika port berbeda.

---

# 🏗 Production Build

Untuk membuat production build:

```bash
pnpm build
```

Astro akan menghasilkan static files pada:

```text
dist/
```

---

# 👀 Preview Production Build

Untuk melihat hasil production build secara lokal:

```bash
pnpm preview
```

---

# 🧹 Astro Check

Jika tersedia dalam project:

```bash
pnpm astro check
```

Gunakan untuk membantu menemukan masalah pada Astro components.

---

# 🌐 Deployment

Website dirancang untuk deployment menggunakan:

## GitHub Pages

Flow deployment:

```text
Source Code
    ↓
Push to GitHub
    ↓
GitHub Actions
    ↓
pnpm install
    ↓
Astro Build
    ↓
dist/
    ↓
GitHub Pages
```

---

# ⚙️ Astro Configuration

Konfigurasi Astro berada di:

```text
astro.config.mjs
```

Contoh konfigurasi:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.com",
});
```

Untuk deployment pada repository GitHub Pages tanpa custom domain, konfigurasi `base` mungkin diperlukan.

Contoh:

```js
export default defineConfig({
  site: "https://username.github.io",
  base: "/repository-name",
});
```

Sesuaikan dengan environment deployment yang digunakan.

---

# 🌍 Custom Domain

Project mendukung penggunaan custom domain melalui GitHub Pages.

Jika menggunakan custom domain, pastikan:

1. DNS domain sudah diarahkan ke GitHub Pages.
2. Custom domain sudah dikonfigurasi pada GitHub Pages.
3. Konfigurasi `site` di Astro menggunakan domain yang benar.
4. File atau konfigurasi `CNAME` dipertahankan jika diperlukan.

Contoh:

```js
export default defineConfig({
  site: "https://yourdomain.com",
});
```

---

# 🔄 Updating Portfolio

Karena project menggunakan pendekatan data-driven, update portfolio dapat dilakukan dengan cepat.

## Menambahkan project

Edit:

```text
src/data/projects.js
```

Tambahkan object baru:

```js
{
  id: "new-project",
  title: "New Project",
  category: "Web Application",
  image: "/images/projects/new-project.webp",
  description: "Project description.",
  technologies: [
    "Astro",
    "JavaScript",
    "CSS",
  ],
  github: "https://github.com/username/project",
  demo: null,
}
```

---

## Menambahkan skill

Edit:

```text
src/data/skills.js
```

---

## Mengubah biodata

Edit:

```text
src/data/profile.js
```

---

## Mengubah social media

Edit:

```text
src/data/socials.js
```

---

## Update Website

Setelah melakukan perubahan:

```bash
git add .
git commit -m "content: update portfolio data"
git push
```

Jika GitHub Actions sudah dikonfigurasi, website akan melakukan build dan deployment secara otomatis.

---

# 📷 Images

Static images disimpan di:

```text
public/images/
```

Recommended organization:

```text
public/images/
├── profile/
├── projects/
├── blog/
└── other/
```

Project screenshot sebaiknya menggunakan format modern seperti:

* WebP
* AVIF

jika memungkinkan.

Pastikan ukuran image tidak terlalu besar agar performance website tetap baik.

---

# 🎯 Project Philosophy

Project ini dibuat dengan beberapa prinsip utama:

### Keep It Static

Tidak menggunakan backend jika tidak diperlukan.

### Keep It Simple

Hindari dependency dan abstraction yang tidak memberikan manfaat nyata.

### Data Over Markup

Konten portfolio dipisahkan dari component sehingga mudah diperbarui.

### Minimal JavaScript

JavaScript hanya digunakan untuk interaction yang membutuhkan client-side behavior.

### Preserve Performance

Website harus tetap ringan dan cepat.

### Easy to Maintain

Update project, skill, profile, dan social link tidak membutuhkan perubahan pada layout utama.

---

# 📋 Development Documentation

Project juga memiliki:

```text
PRD.md
```

yang berisi requirement dan architecture direction project.

Serta:

```text
AGENTS.md
```

yang berisi instruksi untuk coding agent seperti Codex atau OpenCode saat melakukan perubahan pada repository.

Coding agent sebaiknya membaca kedua file tersebut sebelum melakukan perubahan signifikan.

---

# 🤖 Working With Codex / OpenCode

Saat menggunakan coding agent, mulai dengan instruksi seperti:

```text
Read AGENTS.md and PRD.md first.

Inspect the existing implementation before modifying files.

Preserve the current visual design and functionality.

Use the existing src/data structure as the source of truth
for portfolio content.
```

Hal ini membantu agent menjaga konsistensi architecture dan mencegah perubahan UI yang tidak diperlukan.

---

# ✅ Current Status

Project saat ini telah:

* [x] Dimigrasikan dari HTML/CSS/JavaScript ke Astro
* [x] Menggunakan data portfolio aktual
* [x] Menggunakan Astro components
* [x] Memisahkan editable data dari UI
* [x] Memiliki project showcase
* [x] Memiliki project modal
* [x] Memiliki skills section
* [x] Memiliki blog / article section
* [x] Responsive
* [x] Menghasilkan static production build
* [x] Siap digunakan untuk static hosting

---

# 📄 License

Project ini merupakan personal portfolio project.

Source code dapat digunakan sebagai referensi sesuai ketentuan repository.

Jika repository akan dibuat public dan Anda ingin mengizinkan penggunaan ulang secara eksplisit, tambahkan license seperti MIT License pada file:

```text
LICENSE
```

---

## Author

Personal Portfolio Website

Built with **Astro** and deployed as a static website.
