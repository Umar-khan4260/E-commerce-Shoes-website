const fs = require('fs');
const path = require('path');
const Cart = require('./cartModel');
const { getDB } = require('../utils/databaseUtils');

// let products = [];

module.exports = class Product {
    constructor(id, title, category, brand, price, stock, sizes = [], status, description, image) {
        
        this.id = id;
        this.title = title;
        this.category = category;
        this.brand = brand;
        this.price = price;
        this.stock = stock;
        this.sizes = sizes;
        this.status = status;
        this.description = description;
        this.image = image
    }
    save() {
        const db = getDB();
        if(this.id){
            return db.collection("product").updateOne({id:this.id},{$set:this});
        }
        else{
            this.id=Math.random().toString();
            return db.collection("product").insertOne(this);

        }


        // Product.fetchAll((products) => {

        //     // if (this.id) {
        //     //     products = products.map(pro => {
        //     //         if (this.id === pro.id) {
        //     //             return this;
        //     //         }
        //     //         return pro;
        //     //     })
        //     // }
        //     // else {
        //         //     products.push(this);

        //     // }
        //     products.push(this);
        //     const dataPath = path.join(__dirname, '../', 'data', 'product.json');
        //     fs.writeFile(dataPath, JSON.stringify(products), error => {
        //         console.log('Error File saving concluded ', error)
        //     });
        // });

    }
    static fetchAll() {
        const db = getDB();
        return db.collection("product").find().toArray();
        // const dataPath = path.join(__dirname, '../', 'data', 'product.json');
        // fs.readFile(dataPath, (error, data) => {
        //     // callback(!error ? JSON.parse(data) : []);
        //     if (!error) {
        //         callback(JSON.parse(data));
        //     }
        //     else {
        //         callback([])
        //     }
        // })

    }

    static findById(productId) {
        const db = getDB();
        return db.collection("product").find({ id: productId }).next();

        // Product.fetchAll(products => {
        //     const productFound = products.find(product => product.id === productId);
        //     callback(productFound);
        // })
    }

    static deleteById(proId) {
         const db = getDB();
        return db.collection("product").deleteOne({ id: proId });
        // Product.fetchAll((products) => {
        //     products = products.filter(product => product.id !== proId);
        //     const dataPath = path.join(__dirname, '../', 'data', 'product.json');
        //     fs.writeFile(dataPath, JSON.stringify(products), error => {
        //         Cart.deleteById(products, callback);
        //     });

        // });
    }


}