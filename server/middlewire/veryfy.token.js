const jwt = require("jsonwebtoken")
const {promisify}=require("util");
const User = require("../models/user");
exports.verifyToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")?.[1];
        if (!token) {
            return res.status(401).json({
                status: "fail",
                error: "you are not logged in"
            });
        }

        const decode=await promisify(jwt.verify)(token,process.env.ACCESS_TOKEN)
  //  const user=User.findOne({email:decode.email})
        req.user=decode;
    next()
    } catch (error) {
      res.status(400).json({
        status:"fail",
        error:"invalid token"
      })
    }
}