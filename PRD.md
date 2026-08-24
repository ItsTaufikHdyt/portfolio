# PRD — Portfolio Website Enhancement

## 1. Project Overview

Project ini adalah website portfolio pribadi yang sudah memiliki tampilan dan struktur yang cukup baik.

Website dibangun menggunakan:

* HTML
* CSS
* Vanilla JavaScript

Project **tidak boleh dimigrasikan** ke framework lain.

Tetap gunakan:

> HTML + CSS + Vanilla JavaScript

Tujuan pekerjaan ini bukan melakukan redesign seluruh website, tetapi hanya meningkatkan tiga bagian berikut:

```html
<article class="blog" data-page="blog">
```

```html
<article class="portfolio" data-page="portfolio">
```

dan:

```html
<section class="skill">
```

Seluruh bagian website lainnya harus dipertahankan seperti kondisi existing.

---

# 2. Scope

Perubahan hanya boleh dilakukan pada:

## Blog

```html
<article class="blog" data-page="blog">
```

Tujuan:

> Menampilkan daftar artikel yang berasal dari Medium.com.

---

## Portfolio

```html
<article class="portfolio" data-page="portfolio">
```

Tujuan:

> Ketika project diklik, tampil modal yang berisi informasi singkat mengenai project tersebut.

---

## Skills

```html
<section class="skill">
```

Tujuan:

> Membuat tampilan skill menjadi lebih modern, menarik, mudah dibaca, dan tetap konsisten dengan design existing.

---

# 3. Out of Scope

Jangan melakukan redesign atau perubahan visual pada bagian lain.

Jangan mengubah:

* sidebar
* navbar
* about
* contact
* testimonials
* profile section
* social links
* navigation architecture
* global page layout
* typography global
* global background
* theme existing
* existing colors secara keseluruhan
* struktur halaman lain
* existing JavaScript functionality yang tidak berhubungan dengan ketiga section

Jangan melakukan full-site refactor.

Jangan melakukan perubahan hanya karena agent merasa desain bagian lain dapat diperbaiki.

Scope harus tetap terbatas pada:

> Blog + Portfolio + Skills.

---

# 4. Main Objective

Peningkatan ini memiliki tiga tujuan utama:

1. Mengintegrasikan artikel Medium ke section Blog.
2. Memberikan detail project melalui modal pada section Portfolio.
3. Meningkatkan presentasi visual pada section Skills.

Semua perubahan harus tetap terasa sebagai bagian dari website existing.

Jangan membuat ketiga section terlihat seperti berasal dari template yang berbeda.

---

# 5. Existing Design Preservation

Sebelum melakukan perubahan:

1. Inspect HTML existing.
2. Inspect CSS existing.
3. Inspect JavaScript existing.
4. Identifikasi warna utama website.
5. Identifikasi typography existing.
6. Identifikasi card style existing.
7. Identifikasi border radius.
8. Identifikasi spacing.
9. Identifikasi animation existing.
10. Identifikasi responsive breakpoints.

Gunakan design existing sebagai referensi utama.

Redesign harus mengikuti visual language website yang sudah ada.

---

# 6. Technology Constraints

Tetap gunakan:

* HTML
* CSS
* Vanilla JavaScript

Jangan menambahkan:

* React
* Vue
* Astro
* Svelte
* Next.js
* Tailwind CSS
* Bootstrap

Jangan menggunakan framework UI baru.

Library eksternal hanya boleh digunakan jika benar-benar diperlukan dan tidak dapat diselesaikan secara reasonable dengan native browser API.

---

# 7. Blog Enhancement

Target element:

```html
<article class="blog" data-page="blog">
```

## Goal

Blog section harus dapat menampilkan artikel yang dipublikasikan melalui akun Medium.

Tujuannya agar ketika artikel baru dibuat di Medium, website portfolio dapat menggunakan Medium sebagai sumber konten blog.

Portfolio website tidak perlu memiliki CMS atau database sendiri.

Medium menjadi sumber utama artikel.

---

# 8. Medium Article Data

Informasi artikel yang dibutuhkan minimal:

* title
* publication date
* short description / excerpt
* article URL
* thumbnail / cover image jika tersedia
* categories / tags jika tersedia

Optional:

* reading time
* author
* publication

---

# 9. Medium Configuration

Username / feed Medium harus dibuat configurable.

Contoh konsep:

```js
const MEDIUM_USERNAME = "username";
```

atau pendekatan konfigurasi lain yang sederhana.

Jangan hardcode data Medium di banyak lokasi.

---

# 10. Medium Data Loading Strategy

Implementasi harus mempertimbangkan bahwa website adalah static HTML/CSS/JS.

Gunakan pendekatan yang paling sederhana dan maintainable untuk mendapatkan data Medium.

Prioritas:

1. sumber/feed publik Medium yang tersedia
2. browser `fetch()` apabila dapat digunakan dengan aman
3. solusi feed-to-JSON ringan apabila direct access tidak memungkinkan

Jangan membuat backend hanya untuk fitur ini.

Jika integrasi langsung Medium terkena limitation seperti CORS atau format feed yang tidak dapat dikonsumsi browser secara langsung, gunakan fallback yang paling ringan.

Jangan mengubah project menjadi aplikasi server-side.

---

# 11. Blog Loading State

Ketika artikel sedang dimuat, tampilkan loading state yang sederhana.

Contoh:

```text
Loading articles...
```

atau skeleton sederhana yang mengikuti design existing.

Jangan menggunakan loading animation berlebihan.

---

# 12. Blog Error State

Jika artikel Medium gagal dimuat:

Website tidak boleh terlihat rusak.

Tampilkan fallback seperti:

```text
Artikel belum dapat dimuat.
```

Optional:

Tambahkan link:

```text
View my articles on Medium
```

Error harus ditangani dengan JavaScript.

Jangan membiarkan console error menyebabkan seluruh page berhenti bekerja.

---

# 13. Blog Empty State

Jika Medium tidak memiliki artikel atau response kosong:

Tampilkan empty state sederhana.

Contoh:

```text
No articles published yet.
```

---

# 14. Blog Card Design

Article card harus mengikuti desain existing portfolio.

Minimal menampilkan:

```text
ARTICLE IMAGE

Published Date

Article Title

Short Description

Read Article →
```

Seluruh card dapat clickable jika sesuai UX existing.

---

# 15. Blog Article Interaction

Ketika user memilih artikel:

Buka halaman artikel asli di Medium.

Prefer:

```html
target="_blank"
rel="noopener noreferrer"
```

agar user tidak kehilangan halaman portfolio.

---

# 16. Blog Layout

Layout harus responsive.

Desktop dapat menggunakan:

* grid
* 2–3 column cards

atau mengikuti struktur existing.

Mobile:

* single column
* full readable width

Jumlah kolom harus disesuaikan dengan ukuran container existing.

---

# 17. Blog Image

Jika Medium menyediakan cover image, gunakan cover tersebut.

Gunakan:

```html
loading="lazy"
```

untuk image yang berada di luar initial viewport.

Jika artikel tidak memiliki gambar:

Gunakan fallback visual sederhana yang konsisten dengan tema.

Jangan menggunakan external random image.

---

# 18. Portfolio Enhancement

Target element:

```html
<article class="portfolio" data-page="portfolio">
```

Project listing existing harus tetap dipertahankan.

Perubahan utama adalah:

> project dapat diklik dan menampilkan modal detail.

---

# 19. Project Modal Goal

Ketika user mengklik project:

Tampilkan modal tanpa berpindah halaman.

Modal harus memberikan informasi lebih lengkap dibanding project card.

---

# 20. Project Modal Content

Modal minimal berisi:

* project title
* project image
* short description
* technologies
* project type/category

Optional jika data tersedia:

* problem
* solution
* contribution
* GitHub URL
* live demo URL
* project status

---

# 21. Project Data Structure

Jangan hardcode modal HTML untuk setiap project jika dapat dihindari.

Prefer data-driven implementation.

Contoh:

```js
const projects = [
  {
    id: "project-1",
    title: "Project Name",
    description: "Short description...",
    image: "./assets/images/project-1.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/...",
    demo: null
  }
];
```

Namun:

Jika project data existing sudah berada di HTML, tidak wajib memindahkan seluruh data ke JavaScript.

Agent harus memilih pendekatan yang paling sederhana berdasarkan struktur existing.

---

# 22. Existing Portfolio Filter

Jika existing portfolio memiliki category/filter seperti:

```text
All
Web Development
Applications
Web Design
```

functionality tersebut harus tetap bekerja.

Penambahan modal tidak boleh merusak filter existing.

---

# 23. Project Click Behavior

Click pada project card:

```text
Project Card
    ↓
Open Modal
```

Jangan membuka modal apabila user mengklik link khusus seperti:

* GitHub
* Live Demo

jika link tersebut memang tersedia secara terpisah.

---

# 24. Modal Layout

Modal harus:

* berada di tengah viewport
* memiliki overlay
* memiliki maximum width
* responsive
* memiliki close button
* memiliki readable content
* dapat discroll jika konten terlalu tinggi

Contoh struktur:

```text
┌────────────────────────────────────┐
│                                ×   │
│                                    │
│        PROJECT SCREENSHOT          │
│                                    │
│ Project Name                       │
│ Category                           │
│                                    │
│ Short description of project...   │
│                                    │
│ Technologies                       │
│ Laravel · MySQL · Tailwind         │
│                                    │
│ [GitHub]             [Live Demo]   │
└────────────────────────────────────┘
```

Tidak harus mengikuti layout tersebut secara persis.

Gunakan design yang paling konsisten dengan website existing.

---

# 25. Modal Overlay

Overlay harus memberikan fokus pada modal.

Gunakan background seperti:

```css
background: rgba(0, 0, 0, 0.6);
```

atau nilai lain yang sesuai dengan theme existing.

Optional:

```css
backdrop-filter: blur(...);
```

Gunakan blur secara subtle.

---

# 26. Modal Animation

Gunakan animation sederhana.

Contoh:

* fade overlay
* small scale-up
* subtle translate

Durasi sekitar:

```text
150ms – 300ms
```

Jangan menggunakan animation berlebihan.

---

# 27. Modal Close Behavior

Modal harus dapat ditutup dengan:

## Close Button

```text
×
```

atau icon existing.

## Click Outside

Klik overlay menutup modal.

## Keyboard

Tekan:

```text
Escape
```

untuk menutup modal.

---

# 28. Modal Accessibility

Minimal implement:

```html
role="dialog"
aria-modal="true"
```

Tambahkan accessible label.

Close button harus memiliki:

```html
aria-label="Close project details"
```

Saat modal terbuka:

* background scrolling sebaiknya dinonaktifkan
* focus interaction harus tetap usable

---

# 29. Body Scroll Lock

Saat modal terbuka:

```text
body scrolling = disabled
```

Ketika modal ditutup:

```text
body scrolling = enabled
```

Pastikan tidak meninggalkan body dalam kondisi locked.

---

# 30. Portfolio Data Preservation

Jangan mengubah:

* nama project
* image
* category
* URL
* technology
* content existing

kecuali memang dibutuhkan untuk modal.

Jangan mengarang informasi project baru.

---

# 31. Skills Enhancement

Target:

```html
<section class="skill">
```

Goal:

> Membuat skill section lebih menarik secara visual tanpa mengubah keseluruhan design website.

---

# 32. Skill Design Direction

Skills harus terlihat:

* modern
* organized
* easy to scan
* professional
* visually balanced

Jangan membuat skill section terlalu penuh.

---

# 33. Skill Content

Gunakan skill existing sebagai source of truth.

Jangan menambahkan skill yang tidak tersedia di template.

---

# 34. Skill Presentation

Jika existing skill menggunakan progress bar seperti:

```text
HTML 90%
CSS 80%
JavaScript 70%
```

agent harus mengevaluasi apakah percentage tersebut memang diperlukan.

Jika percentage hanya dekoratif:

Prefer redesign menjadi categorized skill items.

Contoh:

```text
Frontend

HTML
CSS
JavaScript
```

atau:

```text
HTML        CSS        JavaScript
```

Namun jika user existing design memang menggunakan proficiency percentage sebagai informasi penting, percentage dapat dipertahankan dengan visual yang lebih modern.

---

# 35. Recommended Skill Layout

Prefer grouped skills jika data mendukung.

Contoh:

```text
FRONTEND

HTML
CSS
JavaScript

BACKEND

PHP
Laravel

TOOLS

Git
Docker
Linux
```

Jangan membuat kategori jika data existing tidak cukup untuk mendukungnya.

---

# 36. Skill Card Alternative

Skill dapat menggunakan small cards seperti:

```text
┌────────────┐
│     ◇      │
│    HTML    │
└────────────┘
```

atau icon + label.

Gunakan existing icons jika tersedia.

Jangan menambahkan icon library besar hanya untuk section skill.

---

# 37. Skill Visual Style

Gunakan style existing sebagai referensi.

Boleh menambahkan:

* subtle border
* accent highlight
* hover state
* soft background
* consistent radius
* better spacing

Hindari:

* heavy shadow
* excessive gradients
* neon glow
* animation terus-menerus

---

# 38. Skill Hover

Skill item dapat memiliki subtle interaction seperti:

```css
transform: translateY(-2px);
```

atau:

* border color change
* background change
* icon scale kecil

Durasi:

```text
150ms–250ms
```

---

# 39. Skill Responsive Layout

Desktop:

```text
3–5 columns
```

tergantung lebar existing container.

Tablet:

```text
2–3 columns
```

Mobile:

```text
1–2 columns
```

Gunakan grid yang adaptif.

Contoh pendekatan:

```css
grid-template-columns:
  repeat(auto-fit, minmax(...));
```

Agent dapat menyesuaikan berdasarkan design existing.

---

# 40. Styling Constraint

Jangan mengubah global design system hanya untuk membuat ketiga section.

Jika membutuhkan CSS variables baru:

Tambahkan hanya jika aman dan tidak mengubah section lain.

Prefer class-scoped styling.

Contoh:

```css
.blog ...
```

```css
.portfolio ...
```

```css
.skill ...
```

```css
.project-modal ...
```

Hindari generic selector seperti:

```css
.card
```

jika dapat memengaruhi element existing lainnya.

---

# 41. JavaScript Scope

JavaScript baru hanya boleh digunakan untuk:

* Medium articles loading
* project modal
* enhancement yang benar-benar diperlukan

Jangan refactor global JavaScript tanpa alasan.

Jangan mengubah navigation logic.

Jangan mengubah page switching system existing.

---

# 42. Existing Navigation Compatibility

Template mungkin menggunakan logic seperti:

```html
data-nav-link
```

dan:

```html
data-page
```

untuk mengubah halaman aktif.

Functionality tersebut harus tetap bekerja.

Penambahan JavaScript blog/modal tidak boleh mengganggu existing page navigation.

---

# 43. CSS Scope

Semua styling baru harus sebisa mungkin menggunakan selectors spesifik.

Contoh:

```css
.blog .article-card
```

```css
.portfolio .project-item
```

```css
.project-modal
```

```css
.skill .skill-item
```

Tujuannya agar styling baru tidak mengubah component lain.

---

# 44. Responsive Requirements

Ketiga section harus direview pada minimal:

* 1440px
* 1280px
* 1024px
* 768px
* 430px
* 390px
* 375px

Tidak boleh menyebabkan:

* horizontal scroll
* overflow image
* modal keluar viewport
* text terpotong
* card terlalu sempit
* tap target terlalu kecil

---

# 45. Performance

Website harus tetap ringan.

Avoid:

* large UI frameworks
* animation libraries
* unnecessary dependencies
* large JavaScript bundle

Prefer:

* vanilla JavaScript
* CSS transition
* lazy-loaded images

---

# 46. Error Isolation

Kegagalan Medium fetch tidak boleh menyebabkan:

* portfolio modal gagal
* navigation gagal
* skill section gagal
* existing JavaScript berhenti

Pisahkan logic secara aman.

Gunakan error handling seperti:

```js
try {
  ...
} catch (error) {
  ...
}
```

jika sesuai.

---

# 47. Code Organization

Jika JavaScript existing berada dalam:

```text
script.js
```

agent dapat mempertahankan file tersebut.

Jangan membuat banyak file JavaScript tanpa kebutuhan.

Namun logic harus tetap dipisahkan secara logis.

Contoh:

```js
// Medium Articles

...

// Project Modal

...
```

atau function yang jelas seperti:

```js
loadMediumArticles();
openProjectModal();
closeProjectModal();
```

---

# 48. Accessibility

Semua enhancement harus mempertahankan atau meningkatkan accessibility.

Blog:

* image alt
* meaningful links

Portfolio modal:

* keyboard close
* dialog semantics
* accessible button

Skills:

* jangan menyampaikan informasi hanya menggunakan warna

---

# 49. Do Not Change

Agent tidak boleh mengubah:

```html
<article class="about" ...>
```

```html
<article class="contact" ...>
```

atau section lainnya kecuali perubahan kecil benar-benar diperlukan sebagai dependency teknis.

Tidak boleh melakukan redesign global.

Tidak boleh mengganti warna keseluruhan website.

Tidak boleh mengganti font global.

Tidak boleh mengganti navbar.

Tidak boleh mengganti sidebar.

Tidak boleh mengubah existing page routing/navigation.

---

# 50. Implementation Order

Implementasi dilakukan dalam urutan:

## Phase 1 — Audit

Inspect:

* HTML
* CSS
* JavaScript
* existing page logic
* existing blog
* existing portfolio
* existing skill
* assets

---

## Phase 2 — Blog

Implement:

1. Medium data loading
2. article rendering
3. loading state
4. error state
5. responsive layout

---

## Phase 3 — Portfolio Modal

Implement:

1. project data mapping
2. modal markup
3. open behavior
4. close behavior
5. Escape support
6. overlay close
7. body scroll lock
8. responsive modal

---

## Phase 4 — Skills

Implement:

1. improved layout
2. better visual hierarchy
3. hover state
4. responsive grid

---

## Phase 5 — Validation

Check:

* navigation
* blog
* portfolio filter
* project modal
* skill layout
* mobile
* console errors
* broken images
* broken links

---

# 51. Definition of Done

Project enhancement dianggap selesai apabila:

## Blog

* [ ] Article berasal dari Medium.
* [ ] Article title tampil.
* [ ] Publication date tampil.
* [ ] Excerpt tampil.
* [ ] Article link membuka Medium.
* [ ] Cover image digunakan jika tersedia.
* [ ] Loading state tersedia.
* [ ] Error fallback tersedia.
* [ ] Layout responsive.

## Portfolio

* [ ] Existing project cards tetap tampil.
* [ ] Project dapat diklik.
* [ ] Modal muncul.
* [ ] Modal menampilkan project title.
* [ ] Modal menampilkan image.
* [ ] Modal menampilkan description.
* [ ] Modal menampilkan technologies jika tersedia.
* [ ] Modal dapat ditutup dengan tombol.
* [ ] Modal dapat ditutup dengan overlay.
* [ ] Modal dapat ditutup dengan Escape.
* [ ] Background scrolling berhenti selama modal aktif.
* [ ] Existing portfolio filter tetap bekerja.

## Skills

* [ ] Existing skills tetap digunakan.
* [ ] Layout lebih menarik.
* [ ] Visual lebih modern.
* [ ] Spacing konsisten.
* [ ] Hover state subtle.
* [ ] Responsive di desktop/tablet/mobile.

## Existing Website

* [ ] Section selain Blog, Portfolio, dan Skills tidak berubah secara visual.
* [ ] Navigation existing tetap bekerja.
* [ ] Tidak ada JavaScript error baru.
* [ ] Tidak ada broken asset.
* [ ] Tidak ada horizontal overflow.
* [ ] Tidak ada framework baru.
* [ ] Website tetap HTML + CSS + Vanilla JavaScript.

---

# 52. Final Requirement

Prioritas utama:

> Enhance only what was requested.

Agent harus menahan diri dari melakukan redesign global.

Hasil akhirnya harus terasa seperti versi yang lebih matang dari website existing, bukan website baru.

Fokus perubahan:

> Medium-powered Blog + Project Detail Modal + Improved Skills UI

dengan tetap mempertahankan identitas desain website yang sudah ada.
