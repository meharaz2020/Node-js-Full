const { signupservices, finduser, finduserByToken } = require("../services/user.service")
const bcrypt = require("bcrypt");
const { generatetoken } = require("../utils/token");
const { sendMailWithMailgun } = require("../utils/email");
exports.signup = async(req, res) => {
    try {
        const user = await signupservices(req.body);
        const token=user.generateConfirmationToken();
        await user.save({validateBeforeSave:false})
        const maildata={
            to:[user.email],
            subject:"Veryfy your account",
            // text:`thank you for creating your account. ${
            //     req.protocol
            // }://${req.get("host")}${req.originalUrl}/confirmation/${token}`,
            text:`http://localhost:5000/user/signup/confirmation/${token}`
        }
        sendMailWithMailgun(maildata);
        res.status(200).json({
            status: "Success",
            message: "Successfully signed up"
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Signup failed',
            error: error.message
        })
    }
}
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // const user = await signupservices(req.body);

        if (!email || !password) {
            return res.status(401).json({
                status: "Failed",
                message: "Please provide your info"
            })
        }
        const user = await finduser(email);
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Please create an account"
            })
        }

        const isPasswordvalid = bcrypt.compare(password, user.password);
        if (!isPasswordvalid) {
            return res.status(403).json({
                status: "fail",
                error: "Password not correct"
            })
        }
        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                message: "please check your mail"
            })
        }


        const token = generatetoken(user);
        const { password: pwd, ...other } = user.toObject();
        res.status(200).json({
            status: "Success",
            message: "Successfully log in",
            data: {
                user: other,
                token
            }
        })

    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Signin failed',
            error: error.message
        })
    }
}
exports.getMe = async(req, res) => {
    try {
        // res.json(req.user)
        const user=await finduser(req.user?.email);
        res.status(200).json({
            status:"fail",
            error
        })
    } catch (error) {

    }
}


exports.confirmEmail=async(req,res)=>{
    try {
        const {token}=req.params;
         const user=await finduserByToken(token);
         console.log(user)
      if(!user){
        return res.status(403).json({
            status:"fail",
            message:"invalid token"
        })
      }
        const expired=new Date()> new Date(user.confirmationTokenExpries);

        if(expired){
            return res.status(401).json({
                status:"Failed",
                error:"Token expired"
            })
        }
       user.status="active";
       user.generateConfirmationToken=undefined;
       user.confirmationTokenExpries=undefined;
       user.save({validateBeforeSave:false})
        res.status(200).json({
            status:"Success",
            message:"Successfully active your account"
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'token failed',
            error: error.message
        })
    }
}