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

        // Clear existing products (except the first 3 sample ones)
        const existingProducts = document.querySelectorAll('.product-card');
        for (let i = 3; i < existingProducts.length; i++) {
            existingProducts[i].remove();
        }

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
                originalPrice = `<span class="original-price">$${product.originalPrice}</span>`;
            }

            productCard.innerHTML = `
                ${saleBadge}
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">
                        <span class="current-price">$${product.price}</span>
                        ${originalPrice}
                    </div>
                    <button class="btn btn-dark add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;

            productsGrid.appendChild(productCard);
        });

        // Add event listeners to new Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                const product = products.find(p => p.id === productId);
                if (product) {
                    // You'll need to integrate this with your cart system
                    alert(`${product.name} added to cart!`);
                    // addToCart(product); // Uncomment when you integrate with your cart
                }
            });
        });
    }

    // Initial render
    renderProducts(products);

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

    // Add this to handle "All Sizes" checkbox behavior
    document.getElementById('size-all').addEventListener('change', function () {
        const sizeCheckboxes = document.querySelectorAll('.size-options input[type="checkbox"]:not(#size-all)');
        sizeCheckboxes.forEach(checkbox => {
            checkbox.disabled = this.checked;
            if (this.checked) checkbox.checked = false;
        });
    });
});