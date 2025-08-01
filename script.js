const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "https://th.bing.com/th/id/R.142077dd35ea3ffdde7a96e38da9ecfc?rik=L6P9hbw93jno7w&riu=http%3a%2f%2fwww.bhphotovideo.com%2fimages%2fimages2500x2500%2fbeats_by_dr_dre_900_00183_01_studio_wireless_over_ear_headphone_1037578.jpg&ehk=Gvcvd4F3e5KImn%2bDtTXuzfLaCL5syVO0QX596b8x35M%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "DSLR Camera",
    price: 499.99,
    image: "https://www.bestreviewguide.com/images/category/DSLR%20Cameras%20-%20What%20To%20Look%20For.jpeg"
  }
];

const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalContainer = document.getElementById('cart-total');

let cart = [];

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function renderProducts() {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${formatPrice(product.price)}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });
}

function renderCart() {
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li>No items yet</li>';
    cartTotalContainer.textContent = 'Total: $0.00';
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity}`;
    const priceSpan = document.createElement('span');
    priceSpan.textContent = formatPrice(item.price * item.quantity);
    li.appendChild(priceSpan);
    cartItemsContainer.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalContainer.textContent = `Total: ${formatPrice(total)}`;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  renderCart();
}

productsContainer.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

// Initial render
renderProducts();
renderCart();
