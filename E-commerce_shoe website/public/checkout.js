document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from session or local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.getElementById('orderSummary');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    // Display cart items in order summary
    function displayOrderSummary() {
        orderSummary.innerHTML = '';
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'd-flex justify-content-between mb-2';
            itemElement.innerHTML = `
                <span>${item.title} x ${item.quantity}</span>
                <span>Rs. ${(item.price * item.quantity).toFixed(2)}</span>
            `;
            orderSummary.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });
        
        // Calculate totals
        const shipping = subtotal > 5000 ? 0 : 200; // Free shipping above 5000
        const tax = subtotal * 0.05; // 5% tax
        
        document.getElementById('subtotal').textContent = `Rs. ${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `Rs. ${shipping.toFixed(2)}`;
        document.getElementById('tax').textContent = `Rs. ${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `Rs. ${(subtotal + shipping + tax).toFixed(2)}`;
    }
    
    // Place order button click handler
    placeOrderBtn.addEventListener('click', async function() {
        const shippingForm = document.getElementById('shippingForm');
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        // Validate form
        if (!shippingForm.checkValidity()) {
            shippingForm.reportValidity();
            return;
        }
        
        // Prepare order data
        const orderData = {
            items: cartItems.map(item => ({
                product: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            shippingAddress: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                street: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value,
                country: document.getElementById('country').value,
                phone: document.getElementById('phone').value
            },
            paymentMethod,
            totalPrice: parseFloat(document.getElementById('total').textContent.replace('Rs. ', ''))
        };
        
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(orderData)
            });
            
            if (response.ok) {
                const order = await response.json();
                localStorage.removeItem('cart');
                window.location.href = `/order-confirmation.html?orderId=${order._id}`;
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing your order. Please try again.');
        }
    });
    
    // Initialize the page
    displayOrderSummary();
});