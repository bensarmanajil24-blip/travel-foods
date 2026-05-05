let cart = [];
let cartOffcanvas = null;
let currentFilter = 'all';

// Show Section (hide all content sections, show target)
function showSection(id) {
  document.querySelectorAll('.content-section').forEach(sec => {
    sec.style.display = 'none';
  });

  const target = document.getElementById(id);
  if (!target) return;
  target.style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menu data
const menuData = {
  mainDishes: [
    { name: 'Adobo (Manok o Baboy)', price: 130, img: 'images/manok.jpg', desc: 'Pinakilalang ulam ng mga Pilipino na may tamang alat at asim.' },
    { name: 'Sinigang na Baboy', price: 150, img: 'images/pig.jpg', desc: 'Maasim, masabaw, at pampagana lalo na sa tag-ulan.' },
    { name: 'Kare-Kare', price: 180, img: 'images/kare.jpg', desc: 'Nilagang baka na may peanut sauce, sinasabayan ng bagoong.' },
    { name: 'Laing', price: 120, img: 'images/laing.jpg', desc: 'Gabi leaves sa gata at sili, paboritong Bicolano dish.' }
  ],
  snacks: [
    { name: 'Pancit Canton', price: 90, img: 'images/pancit.jpg', desc: 'Classic merienda na may gulay, karne, at itlog.' },
    { name: 'Turon', price: 50, img: 'images/turon.jpg', desc: 'Sweet snack na may saging at langka, pritong malutong.' },
    { name: 'Kwek-Kwek', price: 60, img: 'images/kwek.jpg', desc: 'Piniritong itlog ng pugo na may orange batter.' },
    { name: 'Banana Cue', price: 40, img: 'images/banana.jpg', desc: 'Piniritong saging na may caramelized sugar, paboritong street food.' },
    { name: 'Biko', price: 55, img: 'images/biko.jpg', desc: 'Malagkit na rice cake na may latik sa ibabaw.' }
  ],
  drinks: [
    { name: 'Buko Juice', price: 50, img: 'images/buko.jpg', desc: 'Sariwang buko juice, natural at nakakapresko.' },
    { name: "Sago't Gulaman", price: 40, img: 'images/gulaman.jpg', desc: 'Matamis at malamig na inumin, perfect sa mainit na araw.' },
    { name: 'Salabat', price: 35, img: 'images/keneme.jpg', desc: 'Mainit at masustansyang luya tea.' },
    { name: 'Iced Tea', price: 30, img: 'images/ice.jpg', desc: 'Refreshing iced tea, tamang-tama sa init ng panahon.' }
  ]
};

function populateMenu() {
  ['mainDishes', 'snacks', 'drinks'].forEach(category => {
    const container = document.getElementById(category);
    if (!container) return;

    container.innerHTML = menuData[category].map((item, index) => `
      <div class="col-12 col-md-6 col-lg-3 menu-item" data-category="${category}" data-name="${item.name.toLowerCase()}">
        <div class="card h-100 position-relative">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <span class="price-badge">₱${item.price}</span>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text flex-grow-1">${item.desc}</p>
            <button class="btn btn-custom mt-auto w-100" onclick="addToCartByIndex('${category}', ${index})"><i class="bi bi-cart-plus me-2"></i>Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
  });
}

function addToCartByIndex(category, idx) {
  const item = menuData[category] && menuData[category][idx];
  if (!item) return;
  addToCart(item.name, item.price, item.img);
}

function addToCart(name, price, img) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1, img });
  }
  updateCartDisplay();

  if (cartOffcanvas) cartOffcanvas.show();
}

function updateCartDisplay() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = count;

  const container = document.getElementById('cartItemsContainer');
  if (!container) return;

  container.innerHTML = cart.length ? cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-img">
      <div class="flex-grow-1">
        <h6>${item.name}</h6>
        <p>₱${item.price} x <span class="qty">${item.qty}</span></p>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="changeQty(${index}, -1)">-</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${index}, 1)">+</button>
        <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${index})">✕</button>
      </div>
    </div>
  `).join('') : '<p class="text-muted text-center">Walang items sa cart</p>';

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalEl = document.getElementById('cartTotalAmount');
  if (totalEl) totalEl.textContent = total;
}

function changeQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    removeFromCart(index);
  } else {
    updateCartDisplay();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function showCart() {
  updateCartDisplay();
  if (cartOffcanvas) cartOffcanvas.show();
}

function placeOrder() {
  if (cart.length === 0) {
    return alert('Walang items sa cart!');
  }

  const total = document.getElementById('cartTotalAmount')?.textContent || 0;
  alert('Salamat sa iyong order! Total: ₱' + total);
  cart = [];
  updateCartDisplay();

  if (cartOffcanvas) cartOffcanvas.hide();
}

function filterMenu(cat) {
  currentFilter = cat;
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(btn => {
    const on = btn.getAttribute('onclick') || '';
    btn.classList.remove('active');
    if (on.includes(`'${cat}'`)) btn.classList.add('active');
  });

  const q = document.getElementById('headerSearch')?.value?.toLowerCase().trim() || '';
  document.querySelectorAll('.menu-item').forEach(item => {
    const matchesFilter = cat === 'all' || item.dataset.category === cat;
    const matchesSearch = q === '' || (item.dataset.name && item.dataset.name.includes(q));
    if (matchesFilter && matchesSearch) item.classList.remove('hidden'); else item.classList.add('hidden');
  });
}

function searchMenu(query) {
  const q = (query || '').toLowerCase().trim();
  document.querySelectorAll('.menu-item').forEach(item => {
    const matchesFilter = currentFilter === 'all' || item.dataset.category === currentFilter;
    const matchesSearch = q === '' || (item.dataset.name && item.dataset.name.includes(q));
    if (matchesFilter && matchesSearch) item.classList.remove('hidden'); else item.classList.add('hidden');
  });
}

function initPage() {
  // initialize offcanvas drawer for cart
  const cartEl = document.getElementById('cartDrawer');
  if (cartEl) cartOffcanvas = new bootstrap.Offcanvas(cartEl);

  populateMenu();
  updateCartDisplay();

  document.querySelectorAll('.content-section').forEach(sec => {
    sec.style.display = 'none';
  });

  const homeSection = document.getElementById('home');
  if (homeSection) homeSection.style.display = 'block';

  // initialize custom hero carousel (static glass overlay + animated backgrounds)
  if (typeof initHeroCarousel === 'function') initHeroCarousel();

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('Salamat! Ipinadala ang iyong mensahe.');
      form.reset();
    });
  }

  // Search toggle and behavior
  const searchToggle = document.getElementById('searchToggle');
  const headerSearch = document.getElementById('headerSearch');
  if (searchToggle && headerSearch) {
    searchToggle.addEventListener('click', () => {
      headerSearch.classList.toggle('expanded');
      if (headerSearch.classList.contains('expanded')) {
        headerSearch.focus();
      } else {
        headerSearch.value = '';
        searchMenu('');
      }
    });
    headerSearch.addEventListener('input', (e) => searchMenu(e.target.value));
  }

  // default filter
  filterMenu('all');
}

// toggle navbar glass on scroll
document.addEventListener('scroll', () => {
  const navbar = document.getElementById('siteNavbar');
  if (!navbar) return;
  if (window.scrollY > 40) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
});

/* Custom hero carousel initialization
   - Crossfade + gentle scale
   - Background parallax (bg-inner animation)
   - Pause on hover, indicators expand, arrows fade in on hover
   - Auto-hide controls after inactivity
*/
function initHeroCarousel() {
  const hero = document.getElementById('heroCarousel');
  if (!hero) return;

  // User prefers auto slides: enable slide-mode by default
  hero.classList.add('slide-mode');

  const slideEls = Array.from(hero.querySelectorAll('.hero-slide'));
  if (!slideEls.length) return;

  const slidesContainer = hero.querySelector('.hero-slides');
  const interval = parseInt(hero.dataset.interval, 10) || 6500;
  const autoplay = hero.dataset.autoplay !== 'false';

  const indicatorsWrapper = hero.querySelector('.hero-indicators');
  const prevBtn = hero.querySelector('.hero-prev');
  const nextBtn = hero.querySelector('.hero-next');
  const captionTitle = document.getElementById('heroTitle');
  const captionSub = document.getElementById('heroSubtitle');
  const captionCTA = document.getElementById('heroCTA');

  let current = slideEls.findIndex(s => s.classList.contains('active'));
  if (current < 0) current = 0;

  // Prepare slides (bg-inner) and initial state
  slideEls.forEach((s, i) => {
    const bg = s.dataset.bg || '';
    if (!s.querySelector('.bg-inner')) {
      const bgInner = document.createElement('div');
      bgInner.className = 'bg-inner';
      bgInner.style.backgroundImage = `url('${bg}')`;
      s.appendChild(bgInner);
    }
    s.style.zIndex = 0;
    // Make slides flexible for slide-mode
    s.style.position = '';
    s.style.width = '100%';
    s.style.flex = '0 0 100%';
    if (i === current) s.classList.add('active'); else s.classList.remove('active');
  });

  // Build indicators
  const indicators = [];
  if (indicatorsWrapper) {
    indicatorsWrapper.innerHTML = '';
    slideEls.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero-indicator';
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.dataset.index = i;
      if (i === current) btn.classList.add('active');
      btn.addEventListener('click', () => { goTo(i); resetAutoplay(); });
      indicatorsWrapper.appendChild(btn);
      indicators.push(btn);
    });
  }

  // Place container to the current index
  if (slidesContainer) slidesContainer.style.transform = `translateX(-${current * 100}%)`;

  function updateCaptionFor(index) {
    const slide = slideEls[index];
    if (!slide) return;
    const title = slide.dataset.title || '';
    const sub = slide.dataset.sub || '';
    const ctatext = slide.dataset.ctaText || '';
    const ctatar = slide.dataset.ctaTarget || 'menu';
    if (captionTitle) captionTitle.textContent = title;
    if (captionSub) captionSub.textContent = sub;
    if (captionCTA) {
      if (ctatext) {
        captionCTA.style.display = '';
        captionCTA.textContent = ctatext;
        captionCTA.onclick = function (e) { e.preventDefault(); showSection(ctatar); };
      } else {
        captionCTA.style.display = 'none';
        captionCTA.onclick = null;
      }
    }
  }

  function setActive(index) {
    index = (index + slideEls.length) % slideEls.length;
    if (index === current) return;

    // Slide-mode: move container using transform with decelerating easing
    if (slidesContainer) {
      const durMs = 900;
      slidesContainer.style.transition = `transform ${durMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    // Parallax background adjustments for depth
    slideEls.forEach((s, i) => {
      const bg = s.querySelector('.bg-inner');
      if (!bg) return;
      if (i === index) {
        bg.style.transform = 'scale(1) translateX(0)';
        bg.style.transition = `transform ${900}ms cubic-bezier(0.2,0.8,0.2,1)`;
      } else {
        const offset = i < index ? '-8%' : '8%';
        bg.style.transform = `scale(1.05) translateX(${offset})`;
        bg.style.transition = `transform ${900}ms cubic-bezier(0.2,0.8,0.2,1)`;
      }
      s.classList.toggle('active', i === index);
    });

    if (indicators.length) indicators.forEach((b, idx) => b.classList.toggle('active', idx === index));
    updateCaptionFor(index);
    current = index;
  }

  function goTo(index) { setActive(index); }
  function nextSlide() { goTo(current + 1); }
  function prevSlide() { goTo(current - 1); }

  // Autoplay management
  let autoplayTimer = null;
  function startAutoplay() { if (!autoplay) return; if (autoplayTimer) clearInterval(autoplayTimer); autoplayTimer = setInterval(nextSlide, interval); }
  function stopAutoplay() { if (autoplayTimer) clearInterval(autoplayTimer); autoplayTimer = null; }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); showControlsTemporarily(); }

  // Controls
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  const controlsEl = hero.querySelector('.hero-controls');
  let controlsHideTimer = null;
  function showControlsTemporarily() {
    if (!controlsEl) return;
    controlsEl.classList.add('show');
    if (controlsHideTimer) clearTimeout(controlsHideTimer);
    controlsHideTimer = setTimeout(() => { controlsEl.classList.remove('show'); }, 2500);
  }

  hero.addEventListener('mouseenter', () => { stopAutoplay(); showControlsTemporarily(); });
  hero.addEventListener('mouseleave', () => { if (autoplay) startAutoplay(); });

  // keyboard support
  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
  });
  hero.tabIndex = 0;

  // Start with parallax on the current slide
  const firstBg = slideEls[current].querySelector('.bg-inner');
  if (firstBg) {
    firstBg.style.transform = 'scale(1) translateX(0)';
  }

  startAutoplay();
}

document.addEventListener('DOMContentLoaded', initPage);
