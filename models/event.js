var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define the schema
var eventSchema = new Schema({
    event_id_PK: String,
    event_name: String,
    event_description: String,
    event_url: String,
    event_location: String,
    event_date: String,
    event_time: String,
    createDate: {type: Date, default: Date.now}
});



 module.exports = mongoose.model('Event', eventSchema);
 var Event = mongoose.model('Event', eventSchema);


//This method use for create user
var createEvent = function(jsonData){
  console.log('Insert New Record')
  console.log(jsonData)
    var dataObj = undefined;
    dataObj = new Event(jsonData);
    dataObj.save();
};

//This method use for get userList
var getEvents = function(){
    Event.find(function (err, userJson) {
             userJson;
        })
};

/*var obj = {
     getUsers : function(){
            resultRsp: [],
             User.find(function (err, userJson) {
                obj.resultRsp = userJson;
            })
    }
};*/


 module.exports = { createEvent : createEvent, getEvents:getEvents,Event: Event };
/* module.exports = { User: User };
 module.exports = obj;*/
