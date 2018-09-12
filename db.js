

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/workshoptdc")
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))

function findAll(callback){  
    global.conn.collection("products").find({}).toArray(callback);
}

function insert(product, callback){
    global.conn.collection("products").insert(product, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("products").find(new ObjectId(id)).toArray(callback);
}

function search(name, callback){  
    global.conn.collection("products").find(name).toArray(callback);
}

function update(id, product, callback){
    global.conn.collection("products").updateOne({_id:new ObjectId(id)}, {$set:{nome:product.nome, quantidade:product.quantidade}}, callback);
    }

function deleteOne(id, callback){
    global.conn.collection("products").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, search, update, deleteOne }