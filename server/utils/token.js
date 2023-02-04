const jwt = require("jsonwebtoken")
exports.generatetoken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "7days"

    });
    return token;

}