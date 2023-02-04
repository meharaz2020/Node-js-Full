const User = require("../models/user")


exports.signupservices = async(userInfo) => {
    const user = await User.create(userInfo);
    return user;
}

exports.finduser = async(email) => {
    return await User.findOne({ email })
}

exports.finduserByToken = async(token) => {
    return await User.findOne({ confirmationToken: token })
}