# AGENTS.md

## Project Context

This repository is a personal portfolio website built using:

* Astro components and static generation
* CSS
* Minimal vanilla JavaScript for interactions

Editable site content lives in `src/data/`. Shared UI is organized in
`src/components/`, and the production entry point is `src/pages/index.astro`.

The redesign requirements are documented in:

`PRD.md`

Always read `PRD.md` before making significant UI or styling changes.

---

# 1. Technology Must Stay the Same

Continue using Astro's static output and framework-free components.

Do not introduce:

* React
* Vue
* Svelte
* Next.js
* Nuxt
* Bootstrap
* Tailwind CSS

unless explicitly requested by the user in a future instruction.

The target remains:

> Astro + CSS + minimal Vanilla JavaScript

---

# 2. Inspect Before Editing

Before modifying files:

* inspect all HTML files relevant to the requested change
* inspect CSS architecture
* inspect JavaScript
* inspect assets
* inspect existing responsive styles

Understand how the template currently works before redesigning it.

---

# 3. Existing Code Is the Source of Truth

Do not assume:

* page structure
* file names
* class names
* JavaScript behavior
* asset paths

Inspect the repository first.

Do not create duplicate structures if an existing implementation can be improved.

---

# 4. Redesign, Do Not Rebuild

This is a redesign project.

Prefer:

> preserve → improve → refactor → replace

Do not rebuild the website from scratch without a strong reason.

Reuse:

* existing markup
* relevant classes
* images
* icons
* project content
* navigation
* working scripts

when appropriate.

---

# 5. Main Redesign Priority

The highest-priority improvement is the visual system, especially:

1. color palette
2. typography
3. spacing
4. visual hierarchy
5. layout composition
6. button styles
7. card/project presentation
8. responsive behavior
9. hover states
10. overall consistency

---

# 6. Color Rules

Use a cohesive color system based on CSS custom properties.

Prefer:

* neutral base
* one primary accent color
* restrained supporting colors

Avoid:

* rainbow palettes
* excessive gradients
* neon-heavy UI
* different accent colors for every section
* low contrast text
* excessive glow

When selecting colors, consider existing:

* images
* profile photo
* branding
* logo
* illustrations

Choose a palette that visually complements the existing assets.

---

# 7. Use CSS Variables

Prefer centralized color and design tokens.

Example:

```css
:root {
    --bg-primary: #fafafa;
    --bg-secondary: #ffffff;

    --text-primary: #18181b;
    --text-secondary: #52525b;
    --text-muted: #71717a;

    --primary: #4f46e5;
    --primary-hover: #4338ca;

    --border: #e4e4e7;
}
```

Do not scatter arbitrary color values throughout the stylesheet unless there is a good reason.

---

# 8. Typography

Maintain clear typography hierarchy.

Do not use too many font families.

Prefer:

* 1 body font
* optionally 1 heading font

Use responsive typography where appropriate.

Do not make body text unnecessarily small.

---

# 9. CSS Approach

Continue using the project's existing CSS approach.

Do not introduce a new CSS framework.

Modernize the existing styles using:

* CSS variables
* Flexbox
* Grid
* clamp()
* min()
* max()
* modern media queries

if helpful.

---

# 10. CSS Cleanup

Refactoring CSS is allowed when it improves maintainability.

You may:

* consolidate duplicate declarations
* remove obsolete declarations
* improve selectors
* centralize repeated values
* simplify media queries
* create design tokens

Do not delete existing styles until confirming they are no longer used.

---

# 11. HTML Changes

HTML may be modified to improve:

* semantic structure
* accessibility
* layout
* hierarchy
* maintainability

However:

* preserve existing content
* preserve links
* preserve project data
* preserve IDs/classes required by JavaScript

If a class or ID is referenced in JavaScript, update both sides safely.

---

# 12. JavaScript Rules

Do not rewrite working JavaScript unless necessary.

Use JavaScript only for real interaction.

Prefer CSS for:

* hover
* transitions
* visual effects
* simple animations

Do not install animation libraries for simple effects.

---

# 13. No Unnecessary Dependencies

Do not add npm packages or third-party libraries unless genuinely needed.

Prefer native browser capabilities.

The site should remain lightweight and easy to host statically.

---

# 14. Responsive Design

Every redesign must be checked for:

* desktop
* tablet
* mobile

Review around:

* 1440px
* 1280px
* 1024px
* 768px
* 430px
* 390px
* 375px

Do not optimize only for desktop.

---

# 15. Mobile Rules

Mobile layout should feel intentionally designed.

Ensure:

* no horizontal overflow
* readable typography
* sufficient button sizes
* appropriate section spacing
* usable navigation
* project images scale correctly

---

# 16. UI Style

The preferred visual style is:

* modern
* minimal
* clean
* professional
* elegant
* personal
* polished

Avoid the common generic AI landing-page look.

Specifically avoid excessive:

* gradient text
* glassmorphism
* glowing cards
* huge border radius
* floating badges
* abstract blobs
* decorative noise

---

# 17. Border Radius

Use consistent radius values.

Prefer moderate radius.

Example:

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
```

Do not make every element pill-shaped.

---

# 18. Shadows

Use subtle shadows only where they improve depth.

Do not put heavy box-shadow on every element.

Prefer border + subtle shadow when needed.

---

# 19. Interaction

Use subtle interaction.

Examples:

* button hover
* link underline
* project image zoom
* small translate effect
* navigation transition

Animations should generally remain around:

`150ms – 300ms`

---

# 20. Accessibility

Do not sacrifice accessibility for aesthetics.

Maintain or improve:

* semantic HTML
* keyboard navigation
* focus states
* color contrast
* alt attributes
* accessible button labels
* heading hierarchy

---

# 21. Preserve Personal Content

Do not invent or change major personal information.

Do not fabricate:

* companies
* experience
* project names
* education
* awards
* skill levels
* contact information

Use existing content as the source of truth.

---

# 22. Preserve Functionality

Before changing IDs, classes, or markup, inspect whether they are used by JavaScript.

Existing functionality must continue working.

Examples:

* navigation toggle
* scroll behavior
* theme switcher
* filters
* modal
* animation trigger

---

# 23. Large Task Workflow

For a large redesign:

## Step 1 — Audit

Inspect the current project.

## Step 2 — Identify Problems

Focus on:

* current color palette
* typography
* spacing
* outdated visual patterns
* responsive problems
* inconsistent styles

## Step 3 — Define Visual System

Create a coherent:

* color palette
* typography scale
* spacing system
* radius system
* button style
* border style

## Step 4 — Implement

Suggested order:

1. global variables and reset
2. body / typography
3. navbar
4. hero
5. about
6. projects
7. skills
8. experience
9. articles
10. contact
11. footer

## Step 5 — Responsive Review

Review desktop and mobile.

## Step 6 — Cleanup

Remove obsolete styles created redundant by the redesign.

---

# 24. Scope Discipline

Do not refactor unrelated functionality.

If requested to redesign one section, focus on that section plus shared styles that are necessary.

If asked to redesign the whole site, proceed section by section.

---

# 25. Validation

After changes:

* check for broken HTML structure
* check console errors
* check missing assets
* check broken links
* check responsive layout
* check horizontal overflow
* check JavaScript functionality

If the project has an existing validation/build command, use it.

Do not invent tooling that does not exist.

---

# 26. Autonomous Design Decisions

Do not ask the user about minor design choices.

Choose reasonable values for:

* accent shade
* spacing
* border radius
* hover state
* section padding
* breakpoint adjustments

Use the existing site and PRD.md as context.

---

# 27. Final Quality Standard

The redesign is successful when the website feels:

> intentionally designed rather than merely recolored.

The visual improvement should come primarily from:

* a stronger color system
* better typography
* better spacing
* cleaner layouts
* clearer hierarchy
* more polished project presentation
* restrained interaction

Do not turn the site into a completely different product unless necessary.
