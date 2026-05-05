let cart = [];

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
    { name: 'Adobo (Manok o Baboy)', price: 130, img: 'manok.jpg', desc: 'Pinakilalang ulam ng mga Pilipino na may tamang alat at asim.' },
    { name: 'Sinigang na Baboy', price: 150, img: 'pig.jpg', desc: 'Maasim, masabaw, at pampagana lalo na sa tag-ulan.' },
    { name: 'Kare-Kare', price: 180, img: 'kare.jpg', desc: 'Nilagang baka na may peanut sauce, sinasabayan ng bagoong.' },
    { name: 'Laing', price: 120, img: 'laing.jpg', desc: 'Gabi leaves sa gata at sili, paboritong Bicolano dish.' }
  ],
  snacks: [
    { name: 'Pancit Canton', price: 90, img: 'pancit.jpg', desc: 'Classic merienda na may gulay, karne, at itlog.' },
    { name: 'Turon', price: 50, img: 'turon.jpg', desc: 'Sweet snack na may saging at langka, pritong malutong.' },
    { name: 'Kwek-Kwek', price: 60, img: 'kwek.jpg', desc: 'Piniritong itlog ng pugo na may orange batter.' },
    { name: 'Banana Cue', price: 40, img: 'banana.jpg', desc: 'Piniritong saging na may caramelized sugar, paboritong street food.' },
    { name: 'Biko', price: 55, img: 'biko.jpg', desc: 'Malagkit na rice cake na may latik sa ibabaw.' }
  ],
  drinks: [
    { name: 'Buko Juice', price: 50, img: 'buko.jpg', desc: 'Sariwang buko juice, natural at nakakapresko.' },
    { name: "Sago't Gulaman", price: 40, img: 'gulaman.jpg', desc: 'Matamis at malamig na inumin, perfect sa mainit na araw.' },
    { name: 'Salabat', price: 35, img: 'keneme.jpg', desc: 'Mainit at masustansyang luya tea.' },
    { name: 'Iced Tea', price: 30, img: 'ice.jpg', desc: 'Refreshing iced tea, tamang-tama sa init ng panahon.' }
  ]
};

function populateMenu() {
  ['mainDishes', 'snacks', 'drinks'].forEach(category => {
    const container = document.getElementById(category);
    if (!container) return;

    container.innerHTML = menuData[category].map((item, index) => `
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card h-100 position-relative">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <span class="price-badge">₱${item.price}</span>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.name} 🍲</h5>
            <p class="card-text flex-grow-1">${item.desc}</p>
            <button class="btn btn-custom mt-auto w-100" onclick="addToCart('${item.name}', ${item.price}, '${item.img}')">Add to Cart 🛒</button>
          </div>
        </div>
      </div>
    `).join('');
  });
}

function addToCart(name, price, img) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1, img });
  }
  updateCartDisplay();

  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
  setTimeout(() => {
    const inst = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (inst) inst.hide();
  }, 1500);
}

function updateCartDisplay() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').textContent = count;

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
  document.getElementById('cartTotalAmount').textContent = total;
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
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}

function placeOrder() {
  if (cart.length === 0) {
    return alert('Walang items sa cart!');
  }

  const total = document.getElementById('cartTotalAmount').textContent;
  alert('Salamat sa iyong order! Total: ₱' + total);
  cart = [];
  updateCartDisplay();

  const inst = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  if (inst) inst.hide();
}

function initPage() {
  populateMenu();
  updateCartDisplay();

  document.querySelectorAll('.content-section').forEach(sec => {
    sec.style.display = 'none';
  });

  const homeSection = document.getElementById('home');
  if (homeSection) homeSection.style.display = 'block';

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('Salamat! Ipinadala ang iyong mensahe.');
      form.reset();
    });
  }
}

document.addEventListener('DOMContentLoaded', initPage);
