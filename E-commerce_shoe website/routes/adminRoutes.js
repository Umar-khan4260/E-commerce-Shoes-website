const express = require('express');

const adminRouter = express.Router();
const adminController=require('../controllers/adminControllers');

// Serve admin pages
adminRouter.get('/admin-Home.html',adminController.gethome );

adminRouter.get('/admin-Product.html', adminController.getProduts);

//open add product page
adminRouter.get('/add-product', adminController.addProductPage);

// Handle form submission
adminRouter.post('/admin-Product.html',adminController.postProducts );

//handle edit product page post request
adminRouter.post('/edit-product', adminController.postEditProducts);

//handle delete product post request
adminRouter.post('/delete-product/:productId',adminController.postDeleteProduct)


//handle edit product page get request
adminRouter.get('/edit-product/:productId', adminController.editProductPage);

adminRouter.get('/api/products', adminController.apiProduct);


exports.adminRouter = adminRouter;





// //core module
// const express = require('express');
// const path = require('path');

// //local module
// const adminRouter = express.Router();

// adminRouter.get('/admin-Home.html', (req, res) => {
//     console.log('in admin /', req.url, req.method);
//     res.sendFile(path.join(__dirname,'../','views','admin-Home.html'));
// })

// adminRouter.get('/admin-Product.html', (req, res) => {
//     console.log('in admin products/', req.url, req.method);
//     res.sendFile(path.join(__dirname,'../','views','admin-Product.html'));
// })

// adminRouter.post('/admin-Product.html', (req, res) => {
//     console.log('in admin products/', req.url, req.method);
//     console.log('product added successfuly',req.body);

// })

// module.exports = adminRouter;