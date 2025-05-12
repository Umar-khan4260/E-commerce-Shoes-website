const path = require('path');
// const { products } = require('../controllers/adminControllers');
const productModel = require('../models/productModel');
const Cart = require('../models/cartModel');
// const { error } = require('console');

exports.gethome = (req, res) => {
    console.log('in user /', req.url, req.method);
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
};

exports.getProducts = (req, res) => {
    console.log('in user products/', req.url, req.method);
    productModel.fetchAll((products) => {
        console.log(products);
        res.render('products', {
            products: products
        });
    });

}


exports.getCartpage = (req, res) => {
    Cart.getCart(carts => {
        productModel.fetchAll((products) => {
            const cartPro = products.filter(pro => carts.includes(pro.id))
            // console.log(products);
            res.render('cart', {
                cartPro: cartPro,
                pageTitle: "Cart"
            });
        });
    });
    // const productId = req.params.proId;

    // if (!productId) {
    //     console.log('No product ID provided');
    //     return res.redirect('/products');
    // }

    // console.log('Fetching product with ID:', productId);

    // Product.findById(productId, (product) => {
    //     if (!product) {
    //         console.log('Product not found for ID:', productId);
    //         return res.redirect('/products');
    //     }

    //     console.log('Product details found:', product);
    //     res.render('product-detail', { 
    //         product: product
    //     });
    // });


    // console.log('in cart page ', req.url, req.method);
    // res.sendFile(path.join(__dirname, '../', 'views', 'cart.html'));
}

exports.postAddToCart = (req, res) => {
    console.log('In cart', req.body);
    Cart.addToCart(req.body.id, error => {
        if (error) {
            console.log('Error while Add product to Cart', error);
        }
        res.redirect('\products.html');
    });
}

exports.getProductDetail = (req, res) => {
    const productId = req.params.proId;
    // console.log(req);
    console.log('in user productDetails/ ', req.url, req.method);
    console.log('in user product Id is ', productId);
    console.log("red body", req.body);

    productModel.findById(productId, (product) => {
        // console.log('product Details found ', product);
        // res.render('product-detail', { product: product });
        console.log(product);
        if (!product) {
            console.log('product not found');
            return res.redirect('/products.html');
        }
        else {
            console.log('product Details found ', product);
            return res.render('product-detail', { product: product });
        }

    });


}

// Route handler
exports.deleteCartItem = (req, res) => {
    const productId = req.params.proId;
    // console.log(req.body);
    console.log('the item remove to cart ', productId);
    Cart.deleteById(productId, (error) => {
        console.log('error while removing ', error);
        res.redirect('/user/cart.html');
    });

}