// Select the cart list
const cartItems = document.getElementById('cart-items');

// Cart total
const cartTotal = document.getElementById('cart-total')

// Get all the add to cart buttons
const addButtons = document.querySelectorAll('.button button');

// Get the search bar item
const searchBar = document.getElementById('search-bar');

// Get products
const products = document.querySelectorAll('.product');

// Cart details
const cartIcon = document.querySelector('.cart-icon');
const cartPanel = document.querySelector('.cart-panel');
const cartDetails = document.querySelector('.cart-details');
const subtotal = document.getElementById('cart-subtotal')
const cartTax = document.getElementById('cart-tax');
const cartShipping = document.getElementById('cart-shipping');
const clearCartButton = document.getElementById('clear-cart');

let cart = []

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    renderCart();
}

// Logic for each product button
addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const name = product.querySelector('h2').textContent;

        const priceText = button.textContent;
        const price = parseFloat(priceText.replace('$',''));

        addToCart(name, price)
    });
});

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name == name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({name, price, quantity: 1});
    }

    renderCart();
}

// Remove a item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Update the cart
function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;

    // Creating remove button for each item
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} — $${item.price.toFixed(2)} x ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = '🗑️';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            removeItem(index);
        });

        li.appendChild(removeButton);
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    if (total == 0) {
        const li = document.createElement('li');
        
        li.textContent = 'Cart is empty. Add items to display here!';
        li.style.backgroundColor = 'white';
        li.style.marginTop = '-5px'
        li.style.marginLeft = '-5px';
        li.style.listStyle = 'none';
        li.style.fontStyle = 'italic';

        cartItems.appendChild(li);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        subtotal.textContent = '';
        cartTax.textContent = '';
        cartShipping.textContent = '';
        cartTotal.textContent = '';
        clearCartButton.classList.add('hidden');
    } else {
        const tax = total * 0.07;
        const shipping = total > 50 ? 0 : 5;
        const finalTotal = total + tax + shipping;

        // Show clear cart button
        clearCartButton.classList.remove('hidden');

        // Setting subtotal
        subtotal.textContent = `Subtotal: $${total.toFixed(2)}`;

        // Set tax
        cartTax.textContent = `Estimated Tax: $${tax.toFixed(2)}`;
        cartShipping.textContent = `Estimated Shipping: $${shipping.toFixed(2)}`;

        // Setting total amount
        cartTotal.textContent = `Total: $${finalTotal.toFixed(2)}`;
    }

    // Updating item total
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = itemCount;

    // Saving after removing item
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Wait for search bar changes
searchBar.addEventListener('input', () => {
    products.forEach(product => {
        const name = product.querySelector('h2').textContent;
        const searchValue = searchBar.value.toLowerCase();

        if (name.toLowerCase().includes(searchBar.value.toLowerCase())) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
});

// Wait for user click on cart
cartIcon.addEventListener('click', () => {
    cartPanel.classList.toggle('show');
});

// Do not remove panel when clicked inside
cartPanel.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Remove cart panel when clicked outside
document.addEventListener('click', (e) => {
    if (!cartPanel.contains(e.target) && !cartIcon.contains(e.target)) {
        cartPanel.classList.remove('show');
  }
});

// Clear cart when button is pressed
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    renderCart();
});
