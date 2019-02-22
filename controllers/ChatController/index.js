/**
 * do something with the user model
 *
 */
var Chat = require('../../models/chatHistory');
var RelationShip = require('../../models/relationship');
var User = require('../../models/user');
var mongoose       = require('mongoose');
var ChatController = {};




    ChatController.user = function (req, res) {
        //var list = User.getUsers();
        User.User.find(function (err, userJson) {
            if(err){
                console.log(err);
            } else {
                res.render('user', {
                    title: 'Sipl Directory Admin Dashboard',
                    user: req.user
                });
            }
        });
    };

    ChatController.userAdd = function (req, res) {
        User.createUser({
            user_id_PK:272,
            name: req.body.name,
            email: req.body.email,
            mobile_number: req.body.mobile,
            employee_code: req.body.employee_code,
            blood_group: req.body.blood_group,
            skype_id: req.body.skype_id,
            dob: req.body.birth_date,

            secondary_mobile_number:req.body.seconday_mobile,
            password:"1111",
            myIMei:"",
            random_number:"",
            image:"",
            fixed_image:"",
            skills:"",
            designation_id_FK:req.body.designation,
            grade_id_FK:req.body.grade,
            dept_id_FK:req.body.department,
            anniversary:req.body.anniversary_date,
            joining_date:req.body.join_date,
            leaving_date:"0000-00-00",
            office_location:req.body.location,
            address_local:req.body.address,
            address_permanent:req.body.per_address,
            isCommitteeMember:req.body.is_member,
            device_token:"",
            device_type:"0",
            priority:"0",
            isActive:req.body.is_active
        });
        res.json({status: true, message: 'recored added'});
    };

    ChatController.index = function (req, res) {
        res.render('chat', {
            title: 'Sipl Directory Admin Dashboard',
            user: req.user,
        });
    };

    ChatController.getChatList = function (req,res) {
        var  searchQry = {};
        //searchQry = {$or: [{from_id: {'$regex': req.user.id}}, {to_id:{'$regex': req.user.id}},{"likes":{$gte:50}}]};
        //searchQry ={$and: [{$or : [{from_id: {'$regex': req.user.id}}, {to_id:{'$regex': req.body.to_id}}]},{$or : [{from_id: {'$regex': req.body.to_id}}, {to_id:{'$regex': req.user.id}}]}] };

        searchQry = {$and: [{$or : [{'from_id':req.user.id},{'to_id':req.user.id}]},{$or : [{'to_id':req.body.to_id},{'from_id':req.body.to_id}]}] }

        //This method return user list
        Chat.find(searchQry, {},
            function (err, userJson) {
                if(err){
                    console.log(err);
                } else {
                      res.json({data:userJson});
                    //res.json({recordsTotal:200,recordsFiltered:200,data:userJson});
                }
        });
    };

    //Save chat
    ChatController.saveMessage = function (req,cb) {
        var dataObj = undefined;
        dataObj = new Chat(req);
        dataObj.save(function(err,room){
            var newRoomId = room._id;
            //Return chat id to callback function
            cb(newRoomId);

        });
    };


    ChatController.getUserList = function (data,clients) {
        /*console.log('online===')
        console.log('USERID: ',data.user_id)
        console.log(clients)*/

        RelationShip.find({'from_id':data.user_id},{to_id: 1, _id:0},function (err, toUser) {
            if(err){
                console.log(err);
            } else {
                RelationShip.aggregate([{$match:{"to_id":data.user_id}},{$project:{to_id:"$from_id", _id:0}}],function (err, fromUser) {
                    if(err){
                        console.log(err);
                    } else {
                        var userFList=[];

                        //Get all connected users
                        var userList = fromUser.concat(toUser);
                        userList.forEach(function (item) {
                            userFList.push(item.to_id);
                            /*userDetails(item, function (result) {

                                userFList.push({"user_id":item.to_id,"user_name":result.name,"user_image":result.image})
                            });*/
                        });
                        //callback(userFList);

                    }
                });
            }
        });
    }

    ChatController.conntedUsers = function (req,res) {

        RelationShip.find({'from_id':req.user.id},{to_id: 1, _id:0},function (err, toUser) {
            if(err){
                console.log(err);
            } else {
                RelationShip.aggregate([{$match:{"to_id":req.user.id}},{$project:{to_id:"$from_id", _id:0}}],function (err, fromUser) {
                    if(err){
                        console.log(err);
                    } else {
                        var userFList=[];

                        //Get all connected users
                        var userList = fromUser.concat(toUser);
                        userList.forEach(function (item) {
                            userFList.push(new mongoose.Types.ObjectId(item.to_id));
                        });
                        userDetails(userFList, function (result) {

                            res.json(result);
                        });
                    }
                });
            }
        });

        var userDetails = function(item,callback) {
            User.aggregate(
                [
                    {$match:{_id: { $in: item}}},
                    {
                        $project: {
                            "user_name":"$name",
                            "user_image":"$image"
                        }
                    }
                ], function (err, userJson) {
                if(err){
                    console.log(err);
                } else {
                    callback(userJson);
                }
            });


            /* User.find( { _id: { $in: item } },{name:1,image:1}, function (err, userJson) {
                 if(err){
                     console.log(err);
                 } else {
                     callback(userJson);
                 }
             });*/

        };

    }


//

module.exports = ChatController;