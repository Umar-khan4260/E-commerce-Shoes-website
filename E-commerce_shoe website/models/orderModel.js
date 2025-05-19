const { getDB } = require('../utils/databaseUtils');

module.exports = class Order {
   constructor({
        id,
        firstname,
        lastname,
        address,
        total,
        city,
        state,
        zip,
        country,
        phone,
        payment,
        orderDate
        
    }) {
        this.id = id || Math.random().toString();
        this.firstName= firstname,
        this.lastName= lastname,
        this.address= address,
        this.city=city,
        this.state=state,
        this.zip=zip,
        this.country=country,
        this.phone=phone
        this.payment = payment;
        this.total = total;
        this.orderDate = orderDate || new Date();
        
        
        
    }

    save() {
        const db = getDB();
        return db.collection('orders').insertOne(this);
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('orders').find().toArray();
    }

    static findById(orderId) {
        const db = getDB();
        return db.collection('orders').find({ id: orderId }).next();
    }

    static deleteById(orderId) {
        const db = getDB();
        return db.collection('orders').deleteOne({ id: orderId });
    }
}
