const mongo = require('mongodb');
const { connect } = require('../routes/userRoutes');

const MongoClient = mongo.MongoClient;

const MONGO_URL = "";

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL).then(client => {

        callback();
        _db = client.db('E_commerce_shoe_website');
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