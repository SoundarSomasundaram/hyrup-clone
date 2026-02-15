# 🚀 Hyrup Clone – Antigravity Landing Page

This project is a high-fidelity clone of the Hyrup Antigravity landing page built using React, TypeScript, Vite, and Tailwind CSS.  
The objective was to accurately replicate the original design while improving performance, responsiveness, and adding creative enhancements.

---

## 🔧 Project Setup (Run Locally)

1. Install dependencies

```bash
npm install
Start development server

bash
Copy code
npm run dev
Open in browser

arduino
Copy code
http://localhost:3001
🛠 Technologies Used & Why
React (TypeScript)
Used for scalable, maintainable, and type-safe component architecture.

Vite
Chosen for faster development server startup and optimized build performance.

Tailwind CSS
Utility-first CSS framework enabling rapid UI development and consistent responsive design.

React.lazy + Suspense
Implemented for code splitting and reducing the initial bundle size by lazy-loading below-the-fold sections.

🎨 Asset Extraction Process
Images were extracted using browser DevTools (Network tab).

Converted and optimized images into .webp format for better performance.

Fonts were identified via browser inspection and imported appropriately.

Colors were extracted using browser color picker and mapped into Tailwind theme configuration.

Some graphical elements were recreated using CSS and SVG instead of directly copying assets to maintain performance and flexibility.

⚠ Challenges Faced & Solutions
1. Large Initial Bundle Size
Problem: All components were loading at once.
Solution: Implemented React.lazy() for non-critical sections to improve load performance.

2. Smooth Theme Switching
Problem: Theme change caused abrupt transitions.
Solution: Added global transition-colors duration-300 for smooth UI transitions.

3. Background Layer Overlap Issues
Problem: Geometric background overlapped main content.
Solution: Managed stacking context using proper relative positioning and z-index control.

4. Responsiveness Across Devices
Problem: Layout inconsistencies on smaller screens.
Solution: Used Tailwind’s mobile-first breakpoint system (sm, md, lg, xl) and flexible layouts.

✨ Creative Improvements & Innovations
Implemented lazy loading for performance optimization

Custom Geometric Background component

Smooth loading fallback spinner using Suspense

Clean modular component architecture

Performance-focused design decisions

Improved UI transitions and layout structure

📱 Responsiveness
The website is fully responsive across:

Mobile devices

Tablets

Laptops

Large desktop screens

Designed using a mobile-first approach.

📊 Performance Optimizations
Lazy-loaded below-the-fold components

Optimized images using WebP format

Reduced unnecessary dependencies

Structured component-based architecture

Minimal re-renders and clean layout hierarchy

🖼 Screenshots (Original vs My Version)
Add screenshots inside a screenshots folder.

Example structure:

bash
Copy code
screenshots/original.png
screenshots/my-version.png
Display them in markdown:

scss
Copy code
Original Version  
![Original](./screenshots/original.png)

My Version  
![My Version](./screenshots/my-version.png)
🤔 Assumptions & Decisions
Prioritized performance over heavy animation libraries.

Recreated certain visual elements instead of copying raw assets.

Used WebP images for optimized loading.

Structured the project for scalability and maintainability.

