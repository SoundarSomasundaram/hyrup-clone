<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hyrup Clone – Project Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            background-color: #f9f9f9;
            color: #333;
        }
        h1, h2, h3 {
            color: #111;
        }
        code {
            background-color: #eee;
            padding: 4px 6px;
            border-radius: 4px;
        }
        pre {
            background-color: #222;
            color: #fff;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
        }
        ul {
            margin-left: 20px;
        }
        .section {
            margin-bottom: 40px;
        }
    </style>
</head>
<body>

<h1>🚀 Hyrup Clone – Antigravity Landing Page</h1>

<p>
This project is a high-fidelity clone of the Hyrup Antigravity landing page built using 
React, TypeScript, Vite, and Tailwind CSS. The objective was to replicate the original 
design while improving performance, responsiveness, and adding creative enhancements.
</p>

<div class="section">
<h2>🔧 Project Setup (Run Locally)</h2>

<h3>1. Install Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>2. Start Development Server</h3>
<pre><code>npm run dev</code></pre>

<h3>3. Open in Browser</h3>
<pre><code>http://localhost:3001</code></pre>
</div>

<div class="section">
<h2>🛠 Technologies Used & Why</h2>

<ul>
    <li><strong>React (TypeScript):</strong> For scalable and type-safe component architecture.</li>
    <li><strong>Vite:</strong> For fast development server startup and optimized production builds.</li>
    <li><strong>Tailwind CSS:</strong> Utility-first styling for rapid UI development and responsive design.</li>
    <li><strong>React.lazy + Suspense:</strong> For code splitting and reducing initial bundle size.</li>
</ul>
</div>

<div class="section">
<h2>🎨 Asset Extraction Process</h2>

<ul>
    <li>Images extracted using browser DevTools (Network tab).</li>
    <li>Converted images to WebP format for optimization.</li>
    <li>Fonts identified using browser inspection and imported accordingly.</li>
    <li>Colors extracted using browser color picker and mapped into Tailwind theme.</li>
    <li>Some graphical elements recreated using CSS and SVG.</li>
</ul>
</div>

<div class="section">
<h2>⚠ Challenges Faced & Solutions</h2>

<h3>1. Large Initial Bundle Size</h3>
<p><strong>Solution:</strong> Implemented React.lazy() for below-the-fold sections.</p>

<h3>2. Smooth Theme Switching</h3>
<p><strong>Solution:</strong> Added global transition classes for smooth UI transitions.</p>

<h3>3. Background Layer Overlap</h3>
<p><strong>Solution:</strong> Managed stacking context using proper positioning and z-index control.</p>

<h3>4. Responsiveness Issues</h3>
<p><strong>Solution:</strong> Used Tailwind’s mobile-first breakpoints (sm, md, lg, xl).</p>

</div>

<div class="section">
<h2>✨ Creative Improvements & Innovations</h2>

<ul>
    <li>Lazy loading for performance optimization</li>
    <li>Custom Geometric Background component</li>
    <li>Smooth loading fallback spinner</li>
    <li>Clean modular component structure</li>
    <li>Improved UI transitions</li>
</ul>

</div>

<div class="section">
<h2>📱 Responsiveness</h2>

<p>
The website is fully responsive across mobile, tablet, laptop, and large desktop screens.
Built using a mobile-first design approach.
</p>
</div>

<div class="section">
<h2>📊 Performance Optimizations</h2>

<ul>
    <li>Lazy-loaded non-critical components</li>
    <li>Optimized images (WebP format)</li>
    <li>Reduced unnecessary dependencies</li>
    <li>Clean and modular architecture</li>
</ul>

</div>

<div class="section">
<h2>🖼 Screenshots</h2>

<p>Add screenshots inside a <code>screenshots</code> folder and reference them like:</p>

<pre><code>&lt;img src="screenshots/original.png" width="600"&gt;
&lt;img src="screenshots/my-version.png" width="600"&gt;</code></pre>

</div>

<div class="section">
<h2>🤔 Assumptions & Decisions</h2>

<ul>
    <li>Prioritized performance over heavy animation libraries.</li>
    <li>Recreated certain elements instead of copying raw assets.</li>
    <li>Used WebP images for optimized loading.</li>
    <li>Structured components for scalability and maintainability.</li>
</ul>

</div>

<div class="section">
<h2>👨‍💻 Author</h2>

<p>
Frontend implementation focused on visual accuracy, clean code structure, responsiveness, 
performance optimization, and creative enhancements.
</p>

</div>

</body>
</html>
