var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define the schema
var relationshipSchema = new Schema({
    from_id: String,
    to_id: String,
    status: Number,
    action_user_id: String,
    createDate: {type: Date, default: Date.now}
});

 //Export chathistory model
 module.exports = mongoose.model('relationship', relationshipSchema);

 //var Event = mongoose.model('chatHistory', chatSchema);
 //module.exports = { createEvent : createEvent, getEvents:getEvents,Event: Event };

