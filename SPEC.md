# Portfolio Website Specification

## 1. Project Overview

- **Project Name**: Developer Portfolio
- **Type**: Next.js Web Application (App Router)
- **Core Functionality**: A modern, production-ready portfolio website showcasing projects, blogs, and contact information
- **Target Users**: Recruiters, potential clients, fellow developers

## 2. Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 3. Folder Structure

```
portfolio_nextjs/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── blogs/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── BlogCard.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Providers.tsx
│   │   └── Section.tsx
│   └── data/
│       ├── blogs.ts
│       └── projects.ts
├── public/
├── package.json
├── tailwind.config.ts (if applicable)
└── tsconfig.json
```

## 4. Pages

- **Home (/)**: Hero section with intro, featured projects
- **About (/about)**: Bio, skills, experience timeline
- **Projects (/projects)**: Project grid from data
- **Blogs (/blogs)**: Blog list from data
- **Contact (/contact)**: Contact form with validation

## 5. Features

- Responsive design (mobile-first)
- Dark/light mode toggle
- SEO metadata on all pages
- Clean, modern UI with Tailwind CSS
- Form validation
- Animated hover effects

## 6. Acceptance Criteria

1. All pages load without errors
2. Navigation works between all pages
3. Mobile menu functions correctly
4. Dark/light mode toggle works
5. Project cards render from data
6. Contact form validates inputs
7. No TypeScript errors
8. No lint errors