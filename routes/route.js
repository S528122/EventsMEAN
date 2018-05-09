var express = require('express');
var routes = express.Router();
const schema = require('../Model/getchannel')
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var request = require('request');
var mongoose = require('mongoose');
//var schema1 = mongoose.Schema;
//var postSchema = new schema1(
    // 'post',
    // {
    //   title: String,
    //   Description: String,
    //   thumbnails: String
    // });
//var Model = mongoose.model('Model', postSchema);
//var list = new post;
routes.get('/getchannel', (req, res, next) => {
    schema.find(function (err, getchannel) {
        res.json(getchannel);
    });
    // res.send('getchannels will be the response');
});

routes.get('/getchannellist', (req, res, next) => {
    request({
        uri: 'https://www.googleapis.com/youtube/v3/channels?id=UC-t-jclTgTavcGegFfz_DvA&key=AIzaSyDzDW3QIjmTIlFBt4G3D2dBXlLV3gdqWh4&part=snippet,contentDetails',
        json: true
    }, function(error, res, body){
        if(!error && res.statusCode === 200){
            list = JSON.stringify(body);
          //  Model.save();
            // .then(function(err){
            //     if(err)
            //         console.log('error' + err);
            //     else
            //         console.log("Data written to Db");
            // });
            
        }
    }).pipe(res);
});

routes.post('/channels', (req, res, next) => {
    let newChannel = new schema({
        channelid: req.body.channelid,
        channelname: req.body.channelname,
        channelimage: req.body.channelimage
    });

    newChannel.save(function (err, res) {
        if (err) {
            res.json({ msg: 'failed to save' });
        }
        else {
            //  res.json({msg: 'Saved succesfully'});;
        }
    });
});

routes.delete('/id/:id', (req, res, next) => {
    res.send('deleteing channels');
});

module.exports = routes;