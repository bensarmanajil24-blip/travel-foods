# Presentation Script — Pinoy Kusina

Purpose
- Short speaker script, demo steps, and delivery tips for presenting the `Pinoy Kusina` web app.

Elevator pitch (30s)
- Say: "Hi, I'm [Your Name]. This is Pinoy Kusina — a lightweight, responsive single-page web app showcasing popular Filipino dishes with a simple in-browser ordering experience built using vanilla JavaScript and Bootstrap."

Slide-by-slide script (suggested)

1) Title / Intro (20-30s)
- Say: "Pinoy Kusina: Lutong Bahay, Sarap ng Pinoy. I'll show a short live demo and a quick code walkthrough."
- Action: Briefly describe goals: responsive UI, accessible interactions, and simple cart flow.

2) Live Demo - Start (3-5 min)
- Prep (what you say): "I'll open the app now — search on web "travel-foods"
- How to run locally (quick commands):


- Alternative: Right-click `index.html` in VS Code and choose **Open with Live Server**, or double-click `index.html` in Explorer to open directly in your browser.

Demo actions and script (do this, then say this):
- Open the site -> Say: "Here's the homepage — a hero carousel with a static glass caption overlay."
- Interact with carousel arrows -> Say: "The carousel uses a small custom script (`initHeroCarousel`) to provide autoplay, keyboard support, and a parallax background effect."
- Scroll to Bestsellers -> Say: "Card components showcase popular dishes — responsive, with hover effects and price badges handled by `styles.css`."
- Jump to Menu -> Use the filter pills -> Say: "Filters are client-side. Clicking a pill calls `filterMenu()` which toggles items' visibility without reloading the page."
- Use header search -> Type `adobo` -> Say: "Search is live — `searchMenu()` filters items by name using `data-name` attributes."
- Add an item to cart -> Say: "When you add to cart, the app updates a simple `cart` array in memory and re-renders the drawer using `updateCartDisplay()`."
- Open cart, change qty, place order -> Say: "You can change quantities or remove items. `placeOrder()` shows a confirmation and clears the cart — in a production app you'd call an API here."
- Submit contact form -> Say: "Forms are prevented from reloading the page and display a success message — shows graceful client-side handling."

3) Quick Code Walkthrough (2-3 min)
- Say: "Now a short walkthrough of the main files — I'll open them briefly."
- `index.html` -> Say: "Contains semantic sections: `#home`, `#menu`, `#about`, `#contact`, and cart offcanvas. IDs and data-attributes are used by the JS to link UI to behavior."
- `script.js` -> Point to functions and say one-liners:
  - `menuData` — the in-memory data model for menu categories.
  - `populateMenu()` — converts `menuData` into DOM cards using template strings.
  - `addToCart()` / `updateCartDisplay()` — provides cart logic and renders the cart UI.
  - `filterMenu()` / `searchMenu()` — client-side filtering by category and search query.
  - `initHeroCarousel()` — custom carousel initialization with autoplay, indicators, keyboard support, and parallax.
- `styles.css` -> Say: "Custom variables, responsive rules, and classes like `.menu-item.hidden` are used by the JS to animate show/hide behavior."

4) Wrap-up & Next Steps (30s)
- Say: "This demo shows how a small codebase can deliver a smooth UI and interactive experience without a framework. Next steps would be connecting a backend for persistence, user auth, and payment integration."

Q&A prep (common questions and short answers)
- Q: "Why plain JS not React/Vue?" -> A: "Simplicity and learnability. This is intentionally minimal to keep focus on UI logic and teaching concepts."
- Q: "How to persist orders?" -> A: "Add a REST endpoint that accepts the cart payload, store orders in a DB, and integrate a payment gateway."
- Q: "Is it accessible?" -> A: "Basic accessibility considerations are included: `aria` labels, keyboard support for the carousel, and semantic HTML. More a11y testing would follow in production."

Delivery tips
- Practice the demo sequence at least twice to smooth transitions between talking and clicking.
- Keep the “what you say” lines brief; use the demo to show rather than over-explain.
- If something fails (network/CDN), fall back to screenshots or open `index.html` directly.
- Use browser zoom to emphasize elements if needed (Ctrl/Cmd+Plus).

Fallback plan
- If Bootstrap or fonts fail due to CDN, open a prepared screenshot folder or share your screen with the VS Code editor to show the code directly.
- If the local server command doesn't work, double-click `index.html` to open it locally.

Timing suggestion (8–10 minute talk)
- Intro: 0:30
- Live demo: 3–5:00
- Code walkthrough: 2–3:00
- Q&A & close: 1–2:00

Files to reference during demo
- `index.html` — structure and data attributes
- `script.js` — main behavior (menu rendering, cart, carousel)
- `styles.css` — visual styles, responsive rules

Would you like me to:
- commit these changes to a Git branch?
- or run a quick local preview now and report any runtime issues?

Good luck — tell me if you want the script shortened to a 3-minute lightning talk version or expanded into slide notes per slide.
