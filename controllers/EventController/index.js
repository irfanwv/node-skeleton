/**
 * do something with the user model
 *
 */
var Event = require('../../models/event');
var EventController = {};

EventController.index = function (req, res) {
    Event.createEvent({
        email: 'tom@gmail.com',
        username: 'tom',
        password: '123456'
    });
  res.render('login', {
      title: 'Sipl Directory Admin Login',
      body: 'login'
  });
};




EventController.event = function (req, res) {

    Event.Event.find(function (err, userJson) {
        if(err){
            console.log(err);
        } else {
            res.render('event', {
                title: 'Sipl Directory Admin Dashboard',
                user: req.user
            });
        }
    });
};

EventController.eventApi = function (req,res) {

    var  noOfRecords = parseInt(req.query.length);
    var  noOfRecordSkip = parseInt(req.query.start);
    var  search = req.query.search.value;
    var  searchQry = {};

    if(search !='' && search != undefined){
        searchQry = {$or: [{event_name: {'$regex': search}}, {event_description:search},{event_location:search}, {event_date:{'$regex': search}},{"likes":{$gte:50}}]};
    }

    // This is callback for total count
    var countCallBack = function(callback) {
        Event.Event.find(searchQry,{event_name:1,event_description:1,event_url:1,event_location:1,event_date:1,event_id_PK:1}).count(function (e, count) {
            callback(count);
        });
    };

    //This method return user list
    Event.Event.find(searchQry,
        {event_name:1,event_description:1,event_url:1,event_location:1,event_date:1,event_id_PK:1},
        function (err, userJson) {
        if(err){
            console.log(err);
        } else {
            countCallBack(function( count) {  res.json({recordsTotal:count,recordsFiltered:count,data:userJson}); })
            //res.json({recordsTotal:200,recordsFiltered:200,data:userJson});
        }
    }).sort([['username', 'ascending']]).limit(noOfRecords).skip(noOfRecordSkip);
};

EventController.add = function (req, res) {
    Event.createEvent({
        event_name:req.body.event_name,
        event_description:req.body.event_description,
        event_url:req.body.event_url,
        event_location:req.body.event_location,
        event_date:req.body.event_date,
        event_id_PK:req.body.event_time
    });
    res.json({status: true, message: 'Event added'});
};

module.exports = EventController;