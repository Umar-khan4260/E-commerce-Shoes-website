const mongo = require('mongodb');
// const { connect } = require('../routes/userRoutes');

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb://localhost:27017/";

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL).then(client => {
        console.log('connected to mongo db')
        _db = client.db("E_commerce_shoe_website");

        callback();
        
    }).catch(error => {
        console.log('Error while connecting with mongo ', error);
    });
}



const getDB = () => {
    if (!_db) {
        throw new Error('Mongo not connect');
    }
    return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;