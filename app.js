// Select the cart list
const cartItems = document.getElementById('cart-items');

// Cart total
const cartTotal = document.getElementById('cart-total')

// Get all the add to cart buttons
const addButtons = document.querySelectorAll('.button button');

let cart = []

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

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

    // Setting total amount
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Saving after removing item
    localStorage.setItem('cart', JSON.stringify(cart));
}
