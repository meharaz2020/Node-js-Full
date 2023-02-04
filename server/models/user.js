 const mongoose = require("mongoose")
 const validator = require("validator")
 const bcrypt = require("bcrypt")
 const crypto = require("crypto")
 const userSchema = mongoose.Schema({
     email: {
         type: String,
         validate: [validator.isEmail, "Provide a valid Email"],
         trim: true,
         lowercase: true,
         unique: true,
         requires: [true, "Email address is required"],
     },
     password: {
         type: String,
         required: [true, "Password is required"],
         validate: {
             validator: (value) =>
                 validator.isStrongPassword(value, {
                     minLength: 6,
                     minLowercase: 3,
                     minNumbers: 1,
                     minUppercase: 1,
                     minSymbols: 1,
                 }),
             message: "Provide {VALUE} is not strong",


         },
     },
     confirmPassword: {
         type: String,
         required: [true, "Please confirm your password"],
         validate: {
             validator: function(value) {
                 return value === this.password;
             },
             message: "Password does not match",
         },
     },
     role: {
         type: String,
         enum: ["buyer", "store-manager", "admin"],
         default: "buyer",
     },
     //  firstName: {
     //      type: String,

     //  },
     //  lastName: {
     //      type: String,

     //  },


     status: {
         type: String,
         default: "inactive",
         enum: ["active", "inactive", "blocked"]
     },
     confirmationToken: String,
     confirmationTokenExpries: Date,
     passwordChangeAt: Date,
     passwordResetToken: Date,
     passwordResetExpires: Date,
 }, {
     timestamps: true
 });

 userSchema.pre("save", function(next) {
     const password = this.password;
     const salt = bcrypt.genSaltSync(10);
     const hashedPassword = bcrypt.hashSync(password, salt);

     this.password = hashedPassword;
     this.confirmPassword = undefined;
     next();
 })
 userSchema.methods.generateConfirmationToken = function() {
     const token = crypto.randomBytes(32).toString("hex");

     this.confirmationToken = token;
     const date = new Date();

     date.setDate(date.getDate() + 1);
     this.confirmationTokenExpries = date;
     return token;
 }
 const User = mongoose.model("USER", userSchema);
 module.exports = User;