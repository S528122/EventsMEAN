//import { resolve } from 'path';

var http = require('http');
// var mongo = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
var express = require('express');
//var db = mongoose('ChannelsList', ['Channels'] );
//var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
var assert = require('assert');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
//var dbconn = require('./JsFiles/mongoconnection');
//var url = "mongodb://127.0.0.1:27017";
const route = require('./routes/route');
//var fetch = require('node-fetch');
var  Channelmodel  = require('./Model/getchannel');

var app = express();
const port = 3000;

//const schema = require('./Model/getchannel');
app.listen(port, () => {
    console.log("server started at port:" + port);
});

//connect to mongodb
// mongoose.connect(url);

// mongoose.connection.on('connected', ()=> {
//     console.log('connected to database');
// });

// mongoose.connection.on('error', (err)=> {

//     if(err){
//     console.log('database error : '+ err);
//     }
// });

app.get('/', (req, res) => {
    res.send("hello how are you?");
});
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/api', route);

app.get('/subscriptions', (req, res, next) => {
var dbconn = require('./JsFiles/mongoconnection');
    
    var subscriptions1 = require('./JsFiles/getchannelbysubscription');
    //console.log("subscriptions1", subscriptions1());
    try {
        subscriptions1().then((data) => {
         console.log(data);
         const insertDocs = function(db, callback){
             console.log('aaa');
             const collection = db.collection('documents');
             db.collection.insertMany(data, function(err, res){
                 assert.equal(err.null);
                console.log('inserted data');
                 callback(res);
             })
         }
         return res.json(data);
         
       
        });
    } catch (err) {
        console.log('error in subs ', err);
    }
    
});


