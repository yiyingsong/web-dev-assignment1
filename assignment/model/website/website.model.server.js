var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model("Website",websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsiteForUser = findAllWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel.create(website)
        .then(
            function (website) {
                userModel.findUserById(userId)
                    .then(
                        function (user) {
                            console.log('website model create: user' + JSON.stringify(user));
                            if (user.websites) user.websites = [];
                            user.websites.push(website);
                            userModel.updateUser(userId,user);
                            user.save();
                            website.save();
                        }
                    );
                return website;
            }
        )
}

function findAllWebsiteForUser(userId) {
    return websiteModel.find({_user:userId.toString()});
}

function findWebsiteById(id) {
    return websiteModel.findById(id);
}

function updateWebsite(id,website) {
    return websiteModel.findByIdAndUpdate(id,website);
}

function deleteWebsite(id){
    return websiteModel.findByIdAndRemove(id);
}
