// Select the cart list
const cartItems = document.getElementById('cart-items');

// Select cart total
const cartTotal = document.getElementById('cart-total')

// Get all the add to cart buttons
const addButtons = document.querySelectorAll('.button button');

let cart = []

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const name = product.querySelector('h2').textContent;

        const priceText = button.textContent;
        const price = parseFloat(priceText.replace('$',''));

        addToCart(name, price)
    });
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name == name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({name, price, quantity: 1});
    }

    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} — $${item.price.toFixed(2)} x ${item.quantity}`;
        cartItems.appendChild(li);
    });
}
