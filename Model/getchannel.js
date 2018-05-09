var mongoose = require('mongoose');

const channelschema = mongoose.Schema({
    channelid:{
        type: String,
        required: true
    },
    channelname:{
        type: String,
        required: true
    },
    channelimage:{
        type: String,
        required: true
    }
});
const Channelmodel = module.exports = mongoose.model('Channelmodel', channelschema);