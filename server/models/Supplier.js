const mongoose = require("mongoose")
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types
const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100
    },
    email: {
        type: String,
        validator: [validator.isEmail],
        trim: true,
        unique: true
    },
    brand: {
        name: {
            type: String
        },
        id: {
            id: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    contactnumber: [{
        type: String,
        validator: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "please provide a valid phone number"
        }
    }]
})