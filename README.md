<h1>Frontend Clone Project Documentation</h1>

<h2>Project Overview</h2>
<p>
This project is a high-fidelity frontend clone built with performance, responsiveness,
and clean architecture in mind. The goal was to accurately replicate the original design
while implementing optimizations and additional interactive enhancements.
</p>

<h2>Project Setup</h2>
<pre><code>npm install
npm run dev</code></pre>
<p>Open: http://localhost:3001</p>

<h2>Tech Stack</h2>
<ul>
<li><strong>React (TypeScript)</strong> – Component-based scalable architecture with type safety</li>
<li><strong>Vite</strong> – Fast build tool and development server</li>
<li><strong>Tailwind CSS</strong> – Utility-first responsive styling framework</li>
<li><strong>React.lazy + Suspense</strong> – Code splitting for performance optimization</li>
</ul>

<h2>Optimizations Implemented</h2>
<ul>
<li>Lazy-loaded non-critical (below-the-fold) components</li>
<li>Reduced initial bundle size using dynamic imports</li>
<li>Optimized image assets (WebP format)</li>
<li>Minimal dependency usage</li>
<li>Efficient component structure to reduce unnecessary re-renders</li>
<li>Lightweight animation implementations</li>
</ul>

<h2>New Implementations & Enhancements</h2>
<ul>
<li>Infinite flow animated elements</li>
<li>Parallax scrolling effects</li>
<li>Interactive hover animations</li>
<li>Custom geometric background component</li>
<li>Smooth loading fallback spinner using Suspense</li>
<li>Structured modular component architecture</li>
</ul>

<h2>Responsiveness</h2>
<p>
Mobile-first layout that adapts across mobile, tablet, laptop, and desktop screens.
</p>

<h2>Asset Extraction Process</h2>
<ul>
<li>Images extracted using browser DevTools (Network tab)</li>
<li>Colors identified via browser inspection tools</li>
<li>Fonts extracted and matched using browser font analysis</li>
<li>Some UI elements recreated using CSS/SVG</li>
</ul>

<h2>Visual Comparison (Original vs Implementation)</h2>

<h3>Comparison 1</h3>
<table>
<tr>
<td>
<h4>Original</h4>
<img src="asset/original1.png">
</td>
<td>
<h4>Implementation</h4>
<img src="asset/clone1.png">
</td>
</tr>
</table>

<h3>Comparison 2</h3>
<table>
<tr>
<td>
<h4>Original</h4>
<img src="asset/original2.png">
</td>
<td>
<h4>Implementation</h4>
<img src="asset/clone2.png">
</td>
</tr>
</table>

<h3>Comparison 3</h3>
<table>
<tr>
<td>
<h4>Original</h4>
<img src="asset/original1.png">
</td>
<td>
<h4>Implementation</h4>
<img src="asset/clone3.png">
</td>
</tr>
</table>

<h2>Design Decisions & Assumptions</h2>
<ul>
<li>Balanced animation richness with performance efficiency</li>
<li>Prioritized maintainable architecture</li>
<li>Recreated certain elements for scalability</li>
<li>Focused on performance without sacrificing visual quality</li>
</ul>
