# KeytoDCity Reality Show - Website

A modern, accessible React + TypeScript application for KeytoDCity Reality Show with Dr. Stephen Akintayo.

## Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Form Management**: React Hook Form with Zod validation
- **Auto-save**: Form drafts automatically saved to localStorage
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader announcements
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Optimized**: Dynamic meta tags and Open Graph support
- **Performance**: Optimized bundle size, lazy loading, and efficient rendering

## Tech Stack

- **Framework**: React 18.2+
- **Language**: TypeScript 5.2+
- **Build Tool**: Vite 5.0+
- **Form Handling**: React Hook Form 7.49+
- **Validation**: Zod 3.22+
- **Styling**: CSS Modules

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── CountdownTimer.tsx
│   ├── About.tsx
│   ├── Eligibility.tsx
│   ├── FAQ.tsx
│   ├── ApplicationForm.tsx
│   ├── Footer.tsx
│   ├── ScrollToTop.tsx
│   ├── AnimatedSection.tsx
│   └── SEOHead.tsx
├── hooks/              # Custom React hooks
│   ├── useCountdown.ts
│   ├── useScroll.ts
│   ├── useLocalStorage.ts
│   └── useIntersectionObserver.ts
├── styles/            # CSS modules
│   ├── globals.css
│   ├── variables.css
│   └── components/
├── types/              # TypeScript type definitions
│   ├── form.ts
│   └── index.ts
├── utils/              # Utility functions
│   ├── validation.ts
│   ├── formatters.ts
│   ├── scroll.ts
│   └── accessibility.ts
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## Key Features Explained

### Form Auto-save
The application form automatically saves drafts to localStorage every 2 seconds after the user stops typing. Drafts are restored when the user returns to the page.

### Accessibility
- Skip links for keyboard navigation
- ARIA labels and roles throughout
- Screen reader announcements for form submissions
- Focus management
- Keyboard navigation support

### Countdown Timer
Real-time countdown to the application deadline with automatic updates every second.

### FAQ Accordion
Interactive FAQ section with smooth expand/collapse animations.

### Scroll Animations
Sections fade in and slide up as they come into view using Intersection Observer API.

## Configuration

### Application Deadline
Update the deadline in `src/App.tsx`:
```typescript
const APPLICATION_DEADLINE = new Date('2026-03-01T23:59:59');
```

### Form Submission
Currently, form submissions are stored in localStorage. To connect to a backend API, update the `onSubmit` function in `src/components/ApplicationForm.tsx`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 KeytoDCity Reality Show with Dr. Stephen Akintayo. All rights reserved.

