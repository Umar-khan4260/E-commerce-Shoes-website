document.addEventListener('DOMContentLoaded', function () {
    // Toggle filters on mobile
    const filterToggle = document.querySelector('.filter-toggle');
    const filtersContent = document.querySelector('.filters-content');

    if (filterToggle && filtersContent) {
        filterToggle.addEventListener('click', function () {
            filtersContent.classList.toggle('show');
        });
    }

    // Sample product data - in a real app, this would come from an API
    const products = [
        {
            id: '1',
            name: 'Chic Ballet Flats',
            price: 25.18,
            originalPrice: 26.24,
            image: 'https://via.placeholder.com/300x300',
            gender: 'women',
            category: 'shoes',
            sizes: [6, 7, 8],
            onSale: true
        },
        {
            id: '2',
            name: 'Cozy Winter Boots',
            price: 76.24,
            image: 'https://via.placeholder.com/300x300',
            gender: 'women',
            category: 'shoes',
            sizes: [7, 8, 9]
        },
        {
            id: '3',
            name: 'Beach Sandals',
            price: 64.55,
            image: 'https://via.placeholder.com/300x300',
            gender: 'men',
            category: 'shoes',
            sizes: [8, 9, 10]
        },
        // Add more products as needed
    ];

    // Render products
    function renderProducts(productsToRender) {
        const productsGrid = document.querySelector('.products-grid');

        // Clear existing products
        productsGrid.innerHTML = '';

        // Add new products
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            let saleBadge = '';
            if (product.onSale) {
                saleBadge = '<div class="sale-badge">SALE</div>';
            }

            let originalPrice = '';
            if (product.originalPrice) {
                originalPrice = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
            }

            productCard.innerHTML = `
                ${saleBadge}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${originalPrice}
                    </div>
                    <button class="btn btn-dark add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;

            productsGrid.appendChild(productCard);
        });

        // Add event listeners to Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                const product = products.find(p => p.id === productId);
                if (product) {
                    addToCart(product);
                    window.location.href = 'cart.html';
                }
            });
        });
    }

    // Add to cart function
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Update cart count in header
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    // Filter functionality
    document.querySelector('.apply-filters').addEventListener('click', function () {
        const selectedGenders = [];
        if (document.getElementById('men').checked) selectedGenders.push('men');
        if (document.getElementById('women').checked) selectedGenders.push('women');
        if (document.getElementById('kids').checked) selectedGenders.push('kids');

        const selectedCategories = [];
        if (document.getElementById('all').checked) {
            selectedCategories.push('shoes', 'apparel', 'accessories');
        } else {
            if (document.getElementById('shoes').checked) selectedCategories.push('shoes');
            if (document.getElementById('apparel').checked) selectedCategories.push('apparel');
            if (document.getElementById('accessories').checked) selectedCategories.push('accessories');
        }

        const minPrice = parseFloat(document.querySelector('.price-range input:nth-child(1)').value) || 0;
        const maxPrice = parseFloat(document.querySelector('.price-range input:nth-child(2)').value) || Infinity;

        const filteredProducts = products.filter(product => {
            return selectedGenders.includes(product.gender) &&
                selectedCategories.includes(product.category) &&
                product.price >= minPrice &&
                product.price <= maxPrice;
        });

        renderProducts(filteredProducts);
    });

    // Handle "All Sizes" checkbox behavior
    document.getElementById('size-all').addEventListener('change', function () {
        const sizeCheckboxes = document.querySelectorAll('.size-options input[type="checkbox"]:not(#size-all)');
        sizeCheckboxes.forEach(checkbox => {
            checkbox.disabled = this.checked;
            if (this.checked) checkbox.checked = false;
        });
    });

    // Initialize
    updateCartCount();
    renderProducts(products);
});