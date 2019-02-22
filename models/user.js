var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//Define the schema
var userSchema = new Schema({
    user_id_PK: String,
    name: String,
    mobile_number: String,
    secondary_mobile_number: String,
    email: String,
    employee_code: String,
    password: String,
    random_number: String,
    image: String,
    fixed_image: String,
    blood_group: String,
    skills: String,
    skype_id: String,
    designation_id_FK: String,
    grade_id_FK: String,
    dept_id_FK: String,
    dob: String,
    anniversary: String,
    joining_date: String,
    leaving_date: String,
    office_location: String,
    address_local: String,
    address_permanent: String,
    isCommitteeMember: String,
    device_token: String,
    device_type: String,
    priority: String,
    isActive: String,
    myIMei: String,
    created_date: {type: Date, default: Date.now}
});

userSchema.plugin(passportLocalMongoose);

 module.exports = mongoose.model('User', userSchema);
 var User = mongoose.model('User', userSchema);


//This method use for create user
var createUser = function(jsonUser){
  console.log('Insert New Record')
  console.log(jsonUser)
    var objUser = undefined;
    objUser = new User(jsonUser);
    objUser.save();
};

//This method use for get userList
var getUsers = function(){
        User.find(function (err, userJson) {
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


// module.exports = { createUser : createUser, getUsers:getUsers,User: User };
/* module.exports = { User: User };
 module.exports = obj;*/
