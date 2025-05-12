//core module
const express = require('express');
const path = require('path');

//local module
const userRouter = express.Router();
const userController = require('../controllers/userController')


userRouter.get('/home', userController.gethome);

userRouter.get('/products.html', userController.getProducts);

userRouter.get('/cart.html', userController.getCartpage);

userRouter.post('/cart.html', userController.postAddToCart);

userRouter.get('/product-detail/:proId', userController.getProductDetail);

userRouter.post('/cart/delete/:proId',userController.deleteCartItem)





module.exports = userRouter;