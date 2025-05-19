const path = require('path');
// const { products } = require('../controllers/adminControllers');
const productModel = require('../models/productModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
// const { error } = require('console');

exports.gethome = (req, res) => {
    console.log('in user /', req.url, req.method);
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
};

exports.getProducts = (req, res) => {
    console.log('in user products/', req.url, req.method);
    productModel.fetchAll().then(products => {
        console.log(products);
        res.render('products', {
            products: products
        });
    });

}


exports.getCartpage = (req, res) => {
    Cart.getCart(carts => {
        productModel.fetchAll().then(products => {
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

    productModel.findById(productId).then(product => {

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

    // productModel.findById(productId, (product) => {
    //     // console.log('product Details found ', product);
    //     // res.render('product-detail', { product: product });
    //     console.log(product);
    //     if (!product) {
    //         console.log('product not found');
    //         return res.redirect('/products.html');
    //     }
    //     else {
    //         console.log('product Details found ', product);
    //         return res.render('product-detail', { product: product });
    //     }

    // });


}

// Route handler
exports.deleteCartItem = (req, res) => {
    const productId = req.params.proId;
    // console.log(req.body);
    console.log('the item remove to cart ', productId);

    Cart.deleteById(productId).then(() => {
        res.redirect('/user/cart.html');
    }).catch(error=>{
        console.log('error while removing ', error);
    })

    // Cart.deleteById(productId, (error) => {
    //     console.log('error while removing ', error);
    //     res.redirect('/user/cart.html');
    // });

}

exports.checkoutApi=(req,res)=>{
    console.log('in checkout ',req.url,req.method);
        Cart.getCart(carts => {
        productModel.fetchAll().then(products => {
            const cartPro = products.filter(pro => carts.includes(pro.id))
            // console.log(products);
            res.render('checkout', {
                cartPro: cartPro,
                pageTitle: "check out"
            });
        });
    })
}

exports.saveOrders=(req,res)=>{
        console.log('in order /', req.url, req.method);
    try {


        const newOrder = {
            id: Math.random().toString(),
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            address: req.body.address,
            total: parseFloat(req.body.total),
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
            phone:req.body.phone,
            payment:'Cash_on_delivery',
            orderDate: new Date()            
        };



        console.log('New order:', newOrder);
        

        const order = new Order(newOrder);
         order.save()
            .then(result => {
            console.log(" Order saved to MongoDB:", result.insertedId);
            res.redirect('/user/products.html');
        })
        .catch(err => {
            console.error(" Error saving product:", err);
            res.status(500).send("Error saving product.");
        });

        // productModel.fetchAll().then(([products]) => {
        //     res.render('admin-Product', { products: products });
        // });

  
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving product: ' + error.message
        });
    }
}