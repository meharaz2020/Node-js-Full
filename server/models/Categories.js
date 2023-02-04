const mongoose = require("mongoose")
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types;

const categoriesSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, "please provide a category name"],
        lowercase: true,
        unique: true
    },
    description: String,
    imageUrl: {
        type: String,
        validator: [validator.isURL, "Please provide a valid URL"]
    }

}, {
    timestamps: true
})

const Category = mongoose.model('Category', categoriesSchema)

module.exports = Category;