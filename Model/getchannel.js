var mongoose = require('mongoose');

const channelschema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    channelid:{
        type: String,
        required: true
    },
    channelimage:{
        type: String,
        required: true
    }
});
const Channelmodel = module.exports = mongoose.model('Channelmodel', channelschema);