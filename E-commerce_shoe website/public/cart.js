document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count in header
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }
    
    // Render cart items
    function renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const emptyCart = document.querySelector('.empty-cart');
        const itemCount = document.querySelector('#item-count');
        const subtotal = document.querySelector('#subtotal');
        const shipping = document.querySelector('#shipping');
        const tax = document.querySelector('#tax');
        const total = document.querySelector('#total');
        const checkoutBtn = document.querySelector('#checkout-btn');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="products.html" class="btn btn-dark">Continue Shopping</a>
                </div>
            `;
            itemCount.textContent = '0 Items';
            subtotal.textContent = 'Rs. 0.00';
            shipping.textContent = 'Rs. 0.00';
            tax.textContent = 'Rs. 0.00';
            total.textContent = 'Rs. 0.00';
            checkoutBtn.disabled = true;
            return;
        }
        
        // Calculate totals
        const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingAmount = subtotalAmount > 5000 ? 0 : 200; // Free shipping above Rs.5000
        const taxAmount = subtotalAmount * 0.05; // 5% tax
        const totalAmount = subtotalAmount + shippingAmount + taxAmount;
        
        // Update summary
        itemCount.textContent = `${cart.reduce((total, item) => total + item.quantity, 0)} Items`;
        subtotal.textContent = `Rs. ${subtotalAmount.toFixed(2)}`;
        shipping.textContent = subtotalAmount > 5000 ? 'FREE' : `Rs. ${shippingAmount.toFixed(2)}`;
        tax.textContent = `Rs. ${taxAmount.toFixed(2)}`;
        total.textContent = `Rs. ${totalAmount.toFixed(2)}`;
        checkoutBtn.disabled = false;
        
        // Render cart items
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">
                        Rs. ${item.price.toFixed(2)}
                        ${item.originalPrice ? `<span class="cart-item-original-price">Rs. ${item.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <span class="remove-item" data-id="${item.id}">Remove</span>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add event listeners
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                updateQuantity(id, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                updateQuantity(id, 1);
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = this.getAttribute('data-id');
                const newQuantity = parseInt(this.value);
                if (newQuantity > 0) {
                    updateQuantity(id, 0, newQuantity);
                } else {
                    this.value = 1;
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    }
    
    // Update quantity
    function updateQuantity(id, change, newQuantity = null) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            if (newQuantity !== null) {
                cart[itemIndex].quantity = newQuantity;
            } else {
                cart[itemIndex].quantity += change;
                if (cart[itemIndex].quantity < 1) {
                    cart[itemIndex].quantity = 1;
                }
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }
    
    // Remove from cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
    
    // Checkout button
    document.querySelector('#checkout-btn').addEventListener('click', function() {
        // In a real app, this would redirect to checkout page
        alert('Proceeding to checkout!');
    });
    
    // Initialize
    updateCartCount();
    renderCart();
});