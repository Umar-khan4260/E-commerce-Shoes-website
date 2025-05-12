const fs = require('fs');
const path = require('path');

// let products = [];

module.exports = class Cart {
    static addToCart(proId, callback) {
        Cart.getCart((cart) => {
            if (cart.includes(proId)) {
                callback("Product already in Cart");
            }
            else {
                cart.push(proId);
                const dataPath = path.join(__dirname, '../', 'data', 'cart.json');
                fs.writeFile(dataPath, JSON.stringify(cart), callback);

            }
        });
    }
    static getCart(callback) {
        const dataPath = path.join(__dirname, '../', 'data', 'cart.json');
        fs.readFile(dataPath, (error, data) => {
            // callback(!error ? JSON.parse(data) : []);
            if (!error) {
                callback(JSON.parse(data));
            }
            else {
                callback([])
            }
        })
    }

    // deleteById method
    // Fix for the deleteById method in the Cart module
    static deleteById(delProId, callback) {
        Cart.getCart((cart) => {
            // console.log('inside delete by id the del pro is', delProId);

            // Fix: Determine what format your cart data is in
            // Option 1: If cart is an array of strings (productIds)
            const updatedCart = cart.filter(productId => productId !== delProId);

            // Option 2: If cart should be an array of objects but has data issues
            // const updatedCart = cart.filter(product => {
            //     // Handle both string IDs and object IDs
            //     if (typeof product === 'object' && product !== null) {
            //         return product.id !== delProId;
            //     } 
            //     return product !== delProId;
            // });

            // Fix: Correct the file path from 'car.json' to 'cart.json'
            const dataPath = path.join(__dirname, '../', 'data', 'cart.json');

            fs.writeFile(dataPath, JSON.stringify(updatedCart), callback);
        });
    }

}