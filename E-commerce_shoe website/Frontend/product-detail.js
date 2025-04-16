document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail image selection
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainProductImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image (in a real app, this would use different image URLs)
            mainImage.src = this.src;
        });
    });
    
    // Color selection
    const colorChoices = document.querySelectorAll('.color-choice');
    colorChoices.forEach(choice => {
        choice.addEventListener('click', function() {
            colorChoices.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Size selection
    const sizeChoices = document.querySelectorAll('.size-choice');
    sizeChoices.forEach(choice => {
        choice.addEventListener('click', function() {
            sizeChoices.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity selector
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        const max = parseInt(quantityInput.max);
        if (value < max) {
            quantityInput.value = value + 1;
        }
    });
    
    // Add to cart functionality
    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const product = {
            id: '1', // This would come from your data in a real app
            name: document.querySelector('.product-title').textContent,
            price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
            image: mainImage.src,
            color: document.querySelector('.color-choice.active').style.backgroundColor,
            size: document.querySelector('.size-choice.active').textContent,
            quantity: parseInt(quantityInput.value)
        };
        
        // In a real app, you would call your addToCart function here
        alert(`${product.quantity} ${product.name} (Size: ${product.size}) added to cart!`);
        // addToCart(product);
    });
    
    // Buy now functionality
    const buyNowBtn = document.querySelector('.buy-now');
    buyNowBtn.addEventListener('click', function() {
        alert('Proceeding to checkout!');
        // In a real app, you would add to cart and redirect to checkout
    });
    
    // Sample related products data
    const relatedProducts = [
        {
            id: '2',
            name: 'Cozy Winter Boots',
            price: 76.24,
            image: 'https://via.placeholder.com/300x300',
            onSale: false
        },
        {
            id: '3',
            name: 'Beach Sandals',
            price: 64.55,
            image: 'https://via.placeholder.com/300x300',
            onSale: true
        },
        {
            id: '4',
            name: 'Running Shoes',
            price: 89.99,
            image: 'https://via.placeholder.com/300x300',
            onSale: false
        },
        {
            id: '5',
            name: 'Casual Loafers',
            price: 45.50,
            image: 'https://via.placeholder.com/300x300',
            onSale: true
        }
    ];
    
    // Render related products
    function renderRelatedProducts() {
        const relatedContainer = document.querySelector('.related-products .row');
        
        // Clear existing related products (except the first sample one)
        const existingProducts = document.querySelectorAll('.related-products .product-card');
        for (let i = 1; i < existingProducts.length; i++) {
            existingProducts[i].parentNode.remove();
        }
        
        // Add new related products
        relatedProducts.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-lg-3 col-md-4 col-6';
            
            let saleBadge = '';
            if (product.onSale) {
                saleBadge = '<div class="sale-badge">SALE</div>';
            }
            
            col.innerHTML = `
                <div class="product-card">
                    ${saleBadge}
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="price">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `;
            
            relatedContainer.appendChild(col);
            
            // Add click event to navigate to product detail
            col.querySelector('.product-card').addEventListener('click', function() {
                // In a real app, this would navigate to the product detail page
                // with the product ID, e.g., product-detail.html?id=${product.id}
                alert(`Navigating to ${product.name} detail page`);
            });
        });
    }
    
    // Initial render of related products
    renderRelatedProducts();
});