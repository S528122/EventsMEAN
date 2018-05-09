var http = require('http');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var url = "mongodb://127.0.0.1:27017";
const route = require('./routes/route');
//var subscriptions = require('./JsFiles/getchannelbysubscription');
//console.log(subscriptions);
//const route1 = require('./JsFiles/getchannelbyuser');

var app = express();
const port = 3000;

//const schema = require('./Model/getchannel');
app.listen(port, ()=> {
    console.log("server started at port:" + port);
});

//connect to mongodb
mongoose.connect(url);

mongoose.connection.on('connected', ()=> {
    console.log('connected');
});

mongoose.connection.on('error', (err)=> {
    
    if(err){
    console.log('database error : '+ err);
    }
});

app.get('/', (req, res) =>{
    res.send("hello how are you?");
});
app.use(cors());
app.use(bodyparser.json());

app.use('/api', route);

app.get('/subscriptions', (req, res) => {
    console.log("into subscriptions");
var subscriptions1 = require('./JsFiles/getchannelbysubscription.js');
    // console.log('data line 1  ', subscriptions1.getdata());

//var s =new subscriptions1;
console.log(subscriptions1.getdata());

//      subscriptions1.getdata().then((req, res) => {
//           console.log("response in get data ");
//   });

//   subscriptions1.subs((req, res)=>{
//     console.log(res);
//     console.log("end of subscriptions");
//   }); 
  //console.log("end of subscriptions");
res.send(subscriptions1.getdata);  
});
