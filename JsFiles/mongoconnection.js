var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

//connect to mongodb
mongoose.connect(url);

mongoose.connection.on('connected', ()=> {
    console.log('connected to mongo db database');
});

mongoose.connection.on('error', (err)=> {

    if(err){
    console.log('database error : '+ err);
    }
});