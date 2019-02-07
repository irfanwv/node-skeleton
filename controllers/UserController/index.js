/**
 * do something with the user model
 *
 */
var User = require('../../models/user');
var UserController = {};

    UserController.index = function (req, res) {
        User.createUser({
            email: 'tom@gmail.com',
            username: 'tom',
            password: '123456'
        });
      res.render('login', {
          title: 'Sipl Directory Admin Login',
          body: 'login'
      });
    };

    UserController.user = function (req, res) {
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

    UserController.userApi = function (req,res) {

        var  noOfRecords = parseInt(req.query.length);
        var  noOfRecordSkip = parseInt(req.query.start);
        var  search = req.query.search.value;
        var  searchQry = {};

        if(search !='' && search != undefined){
            searchQry = {$or: [{name: {'$regex': search}}, {email:search}, {mobile_number:{'$regex': search}},{"likes":{$gte:50}}]};
        }

        // This is callback for total count
        var countCallBack = function(callback) {
            User.User.find(searchQry,{name:1,email:1,mobile_number:1,dept_id_FK:1}).count(function (e, count) {
                callback(count);
            });
        };

        //This method return user list
        User.User.find(searchQry,
            {name:1,email:1,mobile_number:1,dept_id_FK:1},function (err, userJson) {
            if(err){
                console.log(err);
            } else {
                countCallBack(function( count) {  res.json({recordsTotal:count,recordsFiltered:count,data:userJson}); })
                //res.json({recordsTotal:200,recordsFiltered:200,data:userJson});
            }
        }).sort([['username', 'ascending']]).limit(noOfRecords).skip(noOfRecordSkip);
    };

    UserController.userAdd = function (req, res) {
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

module.exports = UserController;