const path = require('path');
const multer = require('multer');
const fs = require('fs');

const productModel = require('../models/productModel');
// const { error } = require('console');

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/uploads/');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



// manage get req for admin home
exports.gethome = (req, res) => {
    console.log('in admin /', req.url, req.method);
    res.sendFile(path.join(__dirname, '../views/admin-Home.html'));
};

// manage get req for admin products page
exports.getProduts = (req, res) => {
    console.log('in admin products/', req.url, req.method);

    productModel.fetchAll().then(products => {
        res.render('admin-Product', { products: products });
    });

    // productModel.fetchAll((products) => {
    //     res.render('admin-Product', { products: products });
    // });
};

// Helper function to create empty product
const getEmptyProduct = () => ({
    title: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    sizes: [],
    status: 'Active',
    description: '',
    image: ''
});

//manage get request from add product page
exports.addProductPage = (req, res) => {

    console.log('in admin Add Product page', req.url, req.method);
    res.render('add-product', {
        product: getEmptyProduct(),

        editing: false,
    });
}

//manage edit get request from add product page 
exports.editProductPage = (req, res) => {
    const proId = req.params.productId;
    const editing = req.query.editing === 'true';
    console.log(proId, editing);
    console.log('in admin edit Product page', req.url, req.method);

    productModel.findById(proId).then(product => {
        
        if (!product) {
            console.log('Product not found');
            return res.redirect('/admin/admin-Product.html')
        }

        console.log(product);
        res.render('add-product', {
            product: product,

            editing: editing,
        });


    });

    // productModel.findById(proId, (product) => {
    //     if (!product) {
    //         console.log('Product not found');
    //         return res.redirect('/admin/admin-Product.html')
    //     }

    //     console.log(product);
    //     res.render('add-product', {
    //         product: product,

    //         editing: editing,
    //     });


    // });

}
//manage post req for edit product 
 exports.postEditProducts = (req, res) => {
        const product = new productModel(
        Math.random().toString(),
        req.body.title,
        req.body.category,
        req.body.brand,
        parseFloat(req.body.price),
        parseInt(req.body.stock),
        Array.isArray(req.body.sizes) ? req.body.sizes : [req.body.sizes],
        req.body.status,
        req.body.description,
        req.file.filename
    );

    console.log("New product:", product);

    product.save()
        .then(result => {
            console.log(" Product saved to MongoDB:", result.insertedId);
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.error(" Error saving product:", err);
            res.status(500).send("Error saving product.");
        });

    productModel.fetchAll().then(products => {
        res.render('admin-Product', { products: products });
    });
//     console.log('in admin products/', req.url, req.method);
//     console.log(req.body);

//     try {
//         // Handle sizes array properly
//         let sizes = [];

//         // Check both possible ways sizes might be sent
//         if (req.body['sizes[]']) {
//             sizes = Array.isArray(req.body['sizes[]'])
//                 ? [...new Set(req.body['sizes[]'].map(String))] // Remove duplicates
//                 : [String(req.body['sizes[]'])];
//         } else if (req.body.sizes) {
//             sizes = Array.isArray(req.body.sizes)
//                 ? [...new Set(req.body.sizes.map(String))] // Remove duplicates
//                 : [String(req.body.sizes)];
//         }

//         const newProduct = {
//             id: req.body.id,
//             title: req.body.title,
//             category: req.body.category,
//             brand: req.body.brand,
//             price: parseFloat(req.body.price),
//             stock: parseInt(req.body.stock),
//             sizes: sizes,
//             status: req.body.status,
//             description: req.body.description,
//             image: req.file ? req.file.filename : req.body.existingImage // Handle existing image if no new one uploaded
//         };

//         console.log('New product:', newProduct);

//         const item = new productModel(
//             newProduct.id,
//             newProduct.title,
//             newProduct.category,
//             newProduct.brand,
//             newProduct.price,
//             newProduct.stock,
//             newProduct.sizes,
//             newProduct.status,
//             newProduct.description,
//             newProduct.image
//         );

//         item.save().then(() => {
//             console.log('Product save successfully')
//         });


//         productModel.fetchAll().then(products => {
//             res.render('admin-Product', { products: products });
//         });

//         // productModel.fetchAll((products) => {
//         //     res.render('admin-Product', { products: products });
//         // });

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error saving product: ' + error.message
//         });
//     }
};
// manage Post req for admin product page
// exports.postProducts = (req, res) => {
//     console.log('in admin products/', req.url, req.method);
//     try {
//         // Handle sizes array properly
//         let sizes = [];

//         // Check both possible ways sizes might be sent
//         if (req.body['sizes[]']) {
//             sizes = Array.isArray(req.body['sizes[]'])
//                 ? [...new Set(req.body['sizes[]'].map(String))] // Remove duplicates
//                 : [String(req.body['sizes[]'])];
//         } else if (req.body.sizes) {
//             sizes = Array.isArray(req.body.sizes)
//                 ? [...new Set(req.body.sizes.map(String))] // Remove duplicates
//                 : [String(req.body.sizes)];
//         }

//         const newProduct = {
//             id: Math.random().toString(),
//             title: req.body.title,
//             category: req.body.category,
//             brand: req.body.brand,
//             price: parseFloat(req.body.price),
//             stock: parseInt(req.body.stock),
//             sizes: sizes,
//             status: req.body.status,
//             description: req.body.description,
//             image: req.file ? req.file.filename : null
//         };



//         console.log('New product:', newProduct);

//         const item = new productModel(newProduct.id, newProduct.title, newProduct.category, newProduct.brand, newProduct.price, newProduct.stock, newProduct.sizes, newProduct.status, newProduct.description, newProduct.image);
//          item.save()//.then(()=>{
//         //     console.log('Product save successfully')
//         // });
//         // products.push(newProduct);

//         // res.render('admin-Product', { products: newProduct });
//         // res.render('add-product');


//         productModel.fetchAll().then(([products]) => {
//             res.render('admin-Product', { products: products });
//         });

//         // productModel.fetchAll((products) => {
//         //     res.render('admin-Product', { products: products });
//         // });

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error saving product: ' + error.message
//         });
//     }
// };
exports.postProducts = (req, res, next) => {
    const product = new productModel(
        null,
        req.body.title,
        req.body.category,
        req.body.brand,
        parseFloat(req.body.price),
        parseInt(req.body.stock),
        Array.isArray(req.body.sizes) ? req.body.sizes : [req.body.sizes],
        req.body.status,
        req.body.description,
        req.file.filename
    );

    console.log("New product:", product);

    product.save()
        .then(result => {
            console.log(" Product saved to MongoDB:", result.insertedId);
            res.redirect('/admin/admin-Product.html');
        })
        .catch(err => {
            console.error(" Error saving product:", err);
            res.status(500).send("Error saving product.");
        });

    // productModel.fetchAll().then(products => {
    //     res.render('admin-Product', { products: products });
    // });
};

exports.postDeleteProduct = (req, res) => {
    const proid = req.params.productId;
    console.log('delete product', proid);
    productModel.deleteById(proid).then(() => {
        res.redirect('/admin/admin-Product.html')
    }).catch(error => {
        console.log('error while deleting ', error);
    });
    // productModel.deleteById(proid, (error) => {
    //     console.log('error while deleting ', error);
    // });
}

// Apply multer middleware to the postProducts function
exports.postProducts = [
    upload.single('image'),
    exports.postProducts
];

// Apply multer middleware to the postEditProducts function
exports.postEditProducts = [
    upload.single('image'),
    exports.postEditProducts
];


exports.apiProduct = (req, res) => {
    res.json(products);
};

//  exports.products = products;