var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model("User",userSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findByCredential = findByCredential;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    console.log("model"+user);
    return userModel.create(user);
}

function findUserById(id) {
    return userModel.findById(id);
}

function findUserByUserName(username) {
    return userModel.findOne({username:username});
}

function findByCredential(username,password){
    return userModel.findOne({username:username,password:password});
}

function updateUser(userId,user) {
    return userModel.findOneAndUpdate(userId,user);
}

function deleteUser(userId){
    return userModel.findOneAndRemove(userId).then(function (user) {
        console.log('user model: ' + user);
        return user;
    });
}
