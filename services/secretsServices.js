const userModel = require("../models/user");

exports.registerUser = async (user) => {
    return await userModel.create(user);
}

exports.checkUser = async (userEmail) => {
    return await userModel.findOne({email: userEmail});
}