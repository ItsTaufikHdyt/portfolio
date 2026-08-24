# PRD — Migrasi Portfolio HTML/CSS/JS ke Astro

## 1. Project Overview

Project ini adalah website portfolio pribadi yang saat ini sudah berjalan menggunakan:

* HTML
* CSS
* Vanilla JavaScript

Tampilan visual existing sudah dianggap cukup baik dan **tidak perlu dilakukan redesign menyeluruh**.

Tujuan utama project ini adalah melakukan migrasi arsitektur dari HTML/CSS/JavaScript biasa menjadi:

> Astro + Astro Components + CSS + minimal Vanilla JavaScript

dengan tetap mempertahankan tampilan dan functionality website existing semaksimal mungkin.

Website nantinya akan digunakan sebagai static site dan di-host melalui:

* GitHub Pages
* Custom Domain

---

# 2. Primary Goals

Migrasi harus mencapai tujuan berikut:

1. Mengubah existing HTML menjadi struktur Astro yang modular.
2. Mempertahankan tampilan existing semirip mungkin.
3. Mempertahankan functionality existing.
4. Memisahkan data dari UI agar mudah diedit.
5. Membuat project portfolio mudah di-maintain.
6. Membuat penambahan project baru menjadi sederhana.
7. Membuat penambahan skill baru menjadi sederhana.
8. Membuat biodata mudah diperbarui.
9. Membuat social links mudah diperbarui.
10. Mempertahankan Medium sebagai sumber artikel.
11. Mempertahankan project detail modal.
12. Mengurangi JavaScript client-side jika memungkinkan.
13. Menghasilkan static HTML melalui Astro build.
14. Memastikan website kompatibel dengan GitHub Pages.

---

# 3. Important Migration Principle

Existing website adalah:

> Visual Source of Truth

Artinya:

* jangan redesign website tanpa kebutuhan
* jangan mengganti warna secara sembarangan
* jangan mengganti typography secara sembarangan
* jangan mengganti spacing hanya karena agent memiliki preferensi lain
* jangan mengubah layout utama tanpa alasan teknis
* jangan mengubah visual identity

Migrasi ini adalah:

> Architectural migration, not visual redesign.

Perubahan visual hanya boleh dilakukan apabila:

* diperlukan untuk memperbaiki bug existing
* diperlukan agar responsive tetap bekerja setelah migrasi
* diperlukan untuk accessibility
* diperlukan karena struktur lama tidak kompatibel dengan Astro
* diminta secara eksplisit pada task berikutnya

---

# 4. Current Stack

Existing project menggunakan:

```text
HTML
CSS
Vanilla JavaScript
Static Assets
```

Agent harus terlebih dahulu melakukan audit repository dan memastikan stack sebenarnya sebelum melakukan perubahan.

Existing repository adalah source of truth.

---

# 5. Target Stack

Target akhir:

```text
Astro
Astro Components
CSS
Minimal Vanilla JavaScript
Static Assets
```

Do not introduce:

* React
* Vue
* Svelte
* Next.js
* Nuxt
* Angular

kecuali secara eksplisit diminta kemudian.

Astro harus digunakan sebagai static site generator, bukan sebagai wrapper untuk framework lain.

---

# 6. Static First Architecture

Gunakan prinsip:

> Static by default, interactive only when necessary.

Semua konten yang dapat dirender saat build harus dirender oleh Astro.

JavaScript client-side hanya digunakan untuk functionality yang memang membutuhkan interaction.

Contoh:

* navigation state tertentu
* project modal
* mobile navigation
* theme switcher jika tersedia
* interaction lain yang tidak dapat dilakukan dengan HTML/CSS biasa

---

# 7. Desired Directory Structure

Target struktur direkomendasikan seperti berikut:

```text
portfolio/
├── public/
│   ├── images/
│   ├── icons/
│   ├── favicon.svg
│   └── other-static-assets/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.astro
│   │   ├── Navbar.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Portfolio.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectModal.astro
│   │   ├── Blog.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   │
│   ├── data/
│   │   ├── site.js
│   │   ├── profile.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   ├── socials.js
│   │   └── navigation.js
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
├── AGENTS.md
└── PRD.md
```

Struktur final boleh sedikit berbeda apabila existing project membutuhkan penyesuaian.

Jangan membuat terlalu banyak component kecil tanpa manfaat maintainability.

---

# 8. Component Strategy

Existing HTML tidak boleh sekadar dipindahkan seluruhnya ke:

```text
src/pages/index.astro
```

sebagai satu file besar.

Section yang bermakna harus dipisahkan menjadi Astro components.

Contoh:

```html
<article class="about">
```

menjadi:

```text
About.astro
```

```html
<article class="portfolio" data-page="portfolio">
```

menjadi:

```text
Portfolio.astro
```

```html
<article class="blog" data-page="blog">
```

menjadi:

```text
Blog.astro
```

dan:

```html
<section class="skill">
```

menjadi:

```text
Skills.astro
```

Namun componentization harus tetap practical.

Jangan membuat component seperti:

```text
Paragraph.astro
Span.astro
Heading.astro
SmallText.astro
```

tanpa kebutuhan reuse yang nyata.

---

# 9. Layout

Buat base layout:

```text
src/layouts/BaseLayout.astro
```

Base layout menangani:

* HTML document structure
* `<head>`
* global metadata
* global styles
* favicon
* body structure

Contoh konsep:

```astro
---
import "../styles/global.css";

const {
  title,
  description
} = Astro.props;
---

<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width"
    />

    <title>{title}</title>

    <meta
      name="description"
      content={description}
    />
  </head>

  <body>
    <slot />
  </body>
</html>
```

Implementasi final harus disesuaikan dengan metadata existing.

---

# 10. Data Separation — Major Requirement

Salah satu tujuan terpenting migrasi adalah:

> Content should be easy to update without editing component markup.

Data yang sering diubah harus dipisahkan dari component.

Gunakan:

```text
src/data/
```

untuk menyimpan editable content.

---

# 11. Site Configuration

Buat:

```text
src/data/site.js
```

Contoh konsep:

```js
export const site = {
  title: "Portfolio",
  description: "Personal developer portfolio",
  language: "id",
  siteUrl: "https://example.com"
};
```

Site URL tidak boleh diduplikasi di banyak component.

---

# 12. Profile Data

Buat:

```text
src/data/profile.js
```

Contoh:

```js
export const profile = {
  name: "Nama",
  role: "Software Developer",
  location: "Indonesia",

  bio: "Deskripsi singkat profil.",

  email: "email@example.com",

  avatar: "/images/profile.webp"
};
```

Data aktual harus diambil dari existing project.

Jangan mengarang biodata baru.

---

# 13. Social Links

Buat:

```text
src/data/socials.js
```

Contoh:

```js
export const socials = [
  {
    name: "GitHub",
    url: "https://github.com/username"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/username"
  }
];
```

Gunakan existing links sebagai source of truth.

---

# 14. Skills Data

Buat:

```text
src/data/skills.js
```

Skill harus mudah ditambah atau dihapus.

Contoh:

```js
export const skills = [
  {
    category: "Backend",
    items: [
      "PHP",
      "Laravel"
    ]
  },

  {
    category: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript"
    ]
  },

  {
    category: "Database",
    items: [
      "MySQL",
      "PostgreSQL"
    ]
  }
];
```

Data existing harus dipertahankan.

Jika existing skill memiliki struktur berbeda, adaptasikan tanpa kehilangan informasi.

---

# 15. Project Data

Buat:

```text
src/data/projects.js
```

Project baru harus dapat ditambahkan dengan mengubah file data saja.

Contoh:

```js
export const projects = [
  {
    id: "project-one",

    title: "Project Name",

    category: "Web Application",

    image:
      "/images/projects/project-one.webp",

    description:
      "Short project description.",

    technologies: [
      "Laravel",
      "MySQL"
    ],

    github:
      "https://github.com/...",

    demo: null
  }
];
```

---

# 16. Project Data Requirements

Minimal dukung field:

```text
id
title
category
image
description
technologies
```

Optional:

```text
github
demo
status
year
problem
solution
contribution
```

Jangan memaksa semua project memiliki field optional.

Component harus mampu menangani data yang kosong.

---

# 17. Portfolio Component

Buat:

```text
Portfolio.astro
```

Portfolio harus membaca data dari:

```text
src/data/projects.js
```

Jangan hardcode daftar project di component jika data sudah tersedia di `projects.js`.

Gunakan reusable component seperti:

```text
ProjectCard.astro
```

jika membantu maintainability.

---

# 18. Project Modal

Functionality existing:

> Klik project → modal detail project.

harus tetap dipertahankan.

Modal harus menampilkan minimal:

* image
* title
* category
* description
* technologies

Optional jika tersedia:

* GitHub link
* live demo
* status
* year
* problem
* solution

---

# 19. Modal Behavior

Project modal harus dapat:

* dibuka dengan click
* ditutup dengan close button
* ditutup dengan overlay
* ditutup dengan Escape

Saat modal aktif:

* background scrolling dinonaktifkan

Saat modal ditutup:

* body scrolling dikembalikan

---

# 20. Modal Accessibility

Gunakan semantics seperti:

```html
role="dialog"
aria-modal="true"
```

Close button harus memiliki accessible label.

Contoh:

```html
aria-label="Close project details"
```

---

# 21. Existing Portfolio Filter

Jika portfolio existing memiliki filter berdasarkan category:

```text
All
Web Development
Applications
Web Design
```

functionality tersebut harus tetap bekerja setelah migrasi.

Prefer implementasi minimal JavaScript.

Jangan menambahkan state management library.

---

# 22. Blog / Medium Integration

Existing requirement:

> Artikel Blog berasal dari Medium.

Medium tetap menjadi source of truth untuk artikel.

Portfolio website tidak membutuhkan CMS atau database sendiri.

---

# 23. Preferred Medium Architecture

Karena website akan di-host statically melalui GitHub Pages, prefer:

> Fetch Medium data at build time rather than visitor runtime.

Architecture:

```text
Medium / RSS
      ↓
Astro build
      ↓
Article data
      ↓
Static HTML
      ↓
GitHub Pages
```

Keuntungannya:

* lebih cepat
* lebih reliable
* tidak tergantung client-side fetch
* mengurangi masalah CORS
* lebih baik untuk SEO

---

# 24. Medium Data

Minimal artikel memiliki:

```text
title
published date
excerpt
url
```

Optional:

```text
thumbnail
categories
reading time
author
```

Gunakan informasi yang benar-benar tersedia dari sumber Medium.

---

# 25. Medium Configuration

Medium username/feed URL harus disimpan di satu lokasi.

Contoh:

```js
export const medium = {
  username: "username"
};
```

atau di:

```text
src/data/site.js
```

Jangan hardcode Medium username di banyak file.

---

# 26. Medium Failure Handling

Build tidak seharusnya merusak keseluruhan website hanya karena Medium tidak dapat diakses sementara.

Jika secara teknis memungkinkan:

* handle error
* return empty article list
* tampilkan fallback

Contoh:

```text
Artikel belum dapat dimuat.
```

Tambahkan link langsung ke profil Medium jika tersedia.

---

# 27. Blog Component

Buat:

```text
Blog.astro
```

Blog harus render article cards saat build.

Card dapat menampilkan:

```text
cover image

publication date

article title

short excerpt

Read Article →
```

Link harus menuju Medium.

---

# 28. Existing Blog Visual

Existing visual blog harus dipertahankan semirip mungkin.

Migrasi tidak boleh menjadi alasan untuk redesign Blog jika tidak diminta.

---

# 29. CSS Migration

Existing CSS harus dianalisis sebelum dipindahkan.

Jangan rewrite seluruh stylesheet tanpa kebutuhan.

Gunakan existing CSS sebagai visual source of truth.

Allowed:

* membersihkan duplicate declarations
* memperbaiki broken selectors
* mengorganisasi CSS
* menyesuaikan selectors karena component migration
* menghapus CSS yang sudah pasti tidak digunakan

Not allowed:

* mengganti palette hanya karena preferensi agent
* mengganti typography secara global
* melakukan redesign seluruh site
* mengganti spacing system tanpa kebutuhan

---

# 30. Global CSS

Prefer mempertahankan:

```text
src/styles/global.css
```

untuk existing global styling.

Component-specific CSS boleh:

* tetap global jika existing architecture lebih sederhana
* dipindahkan ke component apabila benar-benar meningkatkan maintainability

Jangan memecah CSS secara berlebihan.

---

# 31. JavaScript Migration

Audit seluruh existing JavaScript.

Pisahkan functionality menjadi:

## Static functionality

Pindahkan ke Astro build jika JavaScript tidak lagi diperlukan.

## Interactive functionality

Pertahankan dengan Vanilla JavaScript.

Contoh interactive functionality:

* project modal
* portfolio filter
* mobile menu
* theme switcher
* page navigation state jika masih dibutuhkan

---

# 32. JavaScript Principle

Gunakan:

> As little client-side JavaScript as reasonably possible.

Jangan menggunakan JavaScript untuk:

* static text
* project rendering
* skills rendering
* static social links

Astro harus melakukan rendering tersebut saat build.

---

# 33. Existing Navigation

Jika existing portfolio menggunakan SPA-like navigation berbasis:

```html
data-page
```

dan:

```html
data-nav-link
```

agent harus terlebih dahulu memahami behaviour tersebut.

Migrasi boleh mempertahankan model navigation existing jika itu paling aman.

Jangan langsung mengubah menjadi multi-page architecture tanpa alasan.

Visual dan UX existing harus tetap sama.

---

# 34. Static Assets

Audit seluruh:

* images
* logos
* icons
* fonts
* documents
* resume
* project screenshots

Relevant assets harus dipindahkan atau direferensikan dengan benar.

Prefer:

```text
public/
```

untuk static assets yang tidak memerlukan Astro image processing.

Contoh:

```text
public/
├── images/
│   ├── profile/
│   ├── projects/
│   └── blog/
│
├── icons/
└── resume.pdf
```

---

# 35. Asset Path

Pastikan seluruh asset path bekerja saat:

```bash
npm run dev
```

dan:

```bash
npm run build
```

Jangan hanya memastikan asset bekerja di development server.

---

# 36. GitHub Pages Requirement

Target deployment:

> GitHub Pages

Astro harus dikonfigurasi sebagai static site.

Production build:

```bash
npm run build
```

harus menghasilkan:

```text
dist/
```

yang dapat di-deploy ke GitHub Pages.

---

# 37. Astro Configuration

Configure:

```text
astro.config.mjs
```

sesuai kebutuhan GitHub Pages.

Gunakan:

```text
site
```

dan:

```text
base
```

jika diperlukan berdasarkan repository deployment.

Jika menggunakan custom domain dan root domain, sesuaikan konfigurasi dengan deployment tersebut.

Jangan hardcode konfigurasi yang salah sebelum mengetahui repository dan domain actual.

---

# 38. GitHub Actions

Siapkan deployment menggunakan GitHub Actions apabila repository belum memiliki workflow.

Target flow:

```text
Push to main
      ↓
GitHub Actions
      ↓
npm install
      ↓
npm run build
      ↓
dist/
      ↓
GitHub Pages
```

Gunakan workflow yang sesuai dengan Astro dan GitHub Pages.

---

# 39. Custom Domain

Website harus tetap memungkinkan penggunaan:

> Custom Domain

Jika existing project memiliki:

```text
CNAME
```

preserve konfigurasi tersebut sesuai kebutuhan GitHub Pages.

Jangan menghapus konfigurasi custom domain tanpa alasan.

---

# 40. SEO Preservation

Existing metadata harus dipertahankan jika tersedia.

Pastikan minimal memiliki:

```text
title
description
viewport
favicon
```

Optional:

* Open Graph
* canonical URL
* social preview

Migrasi tidak boleh menurunkan existing SEO metadata.

---

# 41. Responsive Preservation

Existing responsive behavior harus tetap bekerja.

Review minimal pada:

```text
1440px
1280px
1024px
768px
430px
390px
375px
```

Periksa:

* sidebar
* navigation
* about
* skills
* portfolio
* modal
* blog
* contact
* footer

---

# 42. Do Not Introduce Visual Regression

Setelah migrasi, periksa:

* font size
* font weight
* colors
* backgrounds
* borders
* shadows
* card size
* image aspect ratio
* section spacing
* animation
* hover state

Jika Astro version terlihat berbeda dari HTML existing tanpa alasan teknis, anggap itu sebagai regression.

---

# 43. Accessibility

Pertahankan dan tingkatkan jika mudah:

* semantic HTML
* heading hierarchy
* alt text
* keyboard navigation
* focus state
* modal accessibility
* button labels

Accessibility improvement diperbolehkan selama tidak mengubah visual secara signifikan.

---

# 44. Performance

Target Astro version harus minimal sama cepat atau lebih cepat daripada existing static website.

Prioritaskan:

* static HTML
* minimal JavaScript
* optimized assets
* lazy-loaded images
* minimal dependencies

Avoid:

* unnecessary frameworks
* animation libraries
* heavy client-side bundles

---

# 45. Dependency Policy

Jangan menambahkan dependency tanpa kebutuhan.

Sebelum menambahkan package:

1. Periksa apakah Astro/native browser API sudah cukup.
2. Periksa maintenance cost.
3. Periksa apakah dependency berjalan pada static build.
4. Periksa bundle impact.

Prefer simple implementation.

---

# 46. Data Editing Experience

Setelah migrasi, user harus dapat melakukan tugas umum tanpa mengedit component.

## Change biodata

Edit:

```text
src/data/profile.js
```

## Add skill

Edit:

```text
src/data/skills.js
```

## Add project

Edit:

```text
src/data/projects.js
```

## Change social media

Edit:

```text
src/data/socials.js
```

## Change site information

Edit:

```text
src/data/site.js
```

Targetnya adalah membuat website terasa seperti:

> Data-driven static portfolio.

---

# 47. Example Editing Flow

Untuk menambah project baru:

```js
{
  id: "new-project",

  title: "New Project",

  category: "Web Application",

  image:
    "/images/projects/new-project.webp",

  description:
    "Project description.",

  technologies: [
    "Laravel",
    "MySQL"
  ],

  github:
    "https://github.com/...",

  demo:
    "https://example.com"
}
```

Setelah save:

```bash
npm run dev
```

atau push ke GitHub.

Tidak perlu mengedit HTML portfolio card secara manual.

---

# 48. Migration Workflow

Agent harus mengikuti urutan berikut.

## Phase 1 — Audit Existing Project

Inspect:

* HTML
* CSS
* JavaScript
* assets
* navigation
* project filter
* project modal
* Medium integration
* responsive styles
* custom domain configuration

Jangan modify files terlebih dahulu.

---

## Phase 2 — Create Astro Foundation

Buat:

```text
package.json
astro.config.mjs
src/
public/
```

sesuai kebutuhan.

Install hanya dependencies yang diperlukan.

---

## Phase 3 — Migrate Base Layout

Migrate:

* document structure
* metadata
* global styles
* global assets

ke Astro layout.

---

## Phase 4 — Component Migration

Migrate meaningful sections satu per satu.

Suggested order:

```text
Sidebar
Navbar
About
Skills
Portfolio
Project Modal
Blog
Contact
Footer
```

Pastikan visual setiap section tetap konsisten sebelum lanjut.

---

## Phase 5 — Data Extraction

Pindahkan editable content ke:

```text
src/data/
```

Prioritas:

```text
profile
socials
skills
projects
site configuration
```

---

## Phase 6 — JavaScript Migration

Audit existing JS.

Pertahankan hanya interaction yang diperlukan.

Test:

* navigation
* portfolio filter
* modal
* mobile navigation
* other existing interactions

---

## Phase 7 — Medium Integration

Implement build-time article retrieval jika memungkinkan.

Render static article cards.

Tambahkan safe fallback.

---

## Phase 8 — GitHub Pages Configuration

Configure:

* Astro static output
* GitHub Actions
* repository deployment
* custom domain support jika diperlukan

---

## Phase 9 — Validation

Jalankan:

```bash
npm run build
```

Perbaiki semua migration-related build errors.

Test:

* dev environment
* production build
* responsive layout
* links
* images
* project modal
* project filter
* Medium blog
* navigation

---

# 49. Scope Discipline

Jangan melakukan unrelated refactoring.

Jangan mengubah feature yang tidak terkait migrasi.

Jangan melakukan redesign tambahan hanya karena ada kesempatan.

Focus:

> Migration + maintainability + static deployment.

---

# 50. Content Integrity

Jangan mengarang:

* biodata
* project
* company
* education
* work history
* skill
* social links
* contact information

Existing website adalah content source of truth.

Placeholder boleh tetap placeholder jika memang existing content masih dummy.

---

# 51. Migration Safety

Sebelum menghapus file HTML/CSS/JS existing:

* pastikan equivalent Astro implementation sudah bekerja
* pastikan functionality sudah diuji
* pastikan assets sudah termigrasi
* pastikan production build sukses

Jangan terlalu cepat menghapus source existing saat migration masih berlangsung.

---

# 52. Definition of Done

Migrasi dianggap selesai jika:

## Astro

* [ ] Project berjalan menggunakan Astro.
* [ ] `npm run dev` berhasil.
* [ ] `npm run build` berhasil.
* [ ] Static output dihasilkan di `dist/`.

## UI

* [ ] Tampilan tetap sangat dekat dengan existing version.
* [ ] Tidak ada unintended redesign.
* [ ] Responsive layout tetap bekerja.
* [ ] Tidak ada horizontal overflow.

## Components

* [ ] Major sections sudah menjadi meaningful Astro components.
* [ ] Homepage tidak berupa satu giant Astro file.
* [ ] Component structure mudah dipahami.

## Data

* [ ] Profile dapat diedit dari data file.
* [ ] Skills dapat diedit dari data file.
* [ ] Projects dapat diedit dari data file.
* [ ] Social links dapat diedit dari data file.
* [ ] Site configuration terpusat.

## Portfolio

* [ ] Project cards berasal dari data.
* [ ] Existing project filter tetap bekerja jika tersedia.
* [ ] Project modal tetap bekerja.
* [ ] Modal responsive.
* [ ] Escape close bekerja.

## Blog

* [ ] Medium tetap menjadi article source.
* [ ] Artikel dirender secara static jika memungkinkan.
* [ ] Medium failure memiliki fallback.
* [ ] Article links menuju Medium.

## JavaScript

* [ ] Existing required interaction tetap bekerja.
* [ ] Tidak ada unnecessary client JavaScript.
* [ ] Tidak ada console error baru.

## Assets

* [ ] Existing images tetap tampil.
* [ ] Tidak ada broken asset.
* [ ] Project screenshots tetap tersedia.

## GitHub Pages

* [ ] Website compatible dengan GitHub Pages.
* [ ] Production build dapat dideploy.
* [ ] Custom domain tetap memungkinkan.
* [ ] Deployment workflow tersedia jika dibutuhkan.

---

# 53. Final Product Goal

Hasil akhir harus menjadi:

> A maintainable, data-driven, fully static Astro portfolio that preserves the existing approved visual design.

User harus dapat memperbarui portfolio dengan sederhana tanpa harus mengubah markup utama.

Ideal editing experience:

```text
Add Project
      ↓
Edit projects.js
      ↓
Push to GitHub
      ↓
GitHub Actions
      ↓
Astro Build
      ↓
GitHub Pages Updated
```

Migrasi berhasil jika website terasa sama atau lebih baik bagi pengunjung, tetapi jauh lebih mudah dikelola oleh pemilik website.

---

# 54. Final Instruction to Coding Agent

Before implementation:

> Inspect the entire existing repository first.

Do not assume file structure.

Do not redesign the website.

Preserve existing functionality and appearance.

Use the existing HTML/CSS/JavaScript implementation as the reference when creating the Astro version.

Prefer:

> static rendering + Astro components + centralized data + minimal client JavaScript.

When uncertain between rewriting something and preserving a working implementation:

> preserve the working implementation unless there is a clear technical benefit to changing it.
