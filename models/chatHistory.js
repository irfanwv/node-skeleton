var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define the schema
var chatSchema = new Schema({
    from_id: String,
    message: String,
    receiver_name: String,
    socket_id: String,
    to_id: String,
    user_image: String,
    user_name: String,
    read_flag: Boolean,
    createDate: {type: Date, default: Date.now}
});

 //Export chathistory model
 module.exports = mongoose.model('chatHistory', chatSchema);

 //var Event = mongoose.model('chatHistory', chatSchema);
 //module.exports = { createEvent : createEvent, getEvents:getEvents,Event: Event };

