const mongoose = require("mongoose")
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: 'Product',
    },
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: [true, "Name must be unique."],
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "liter", "pcs", "bag"],
            message: "Not match {VALUE}"
        }

    },
    imageURLs: [{
        type: String,
        required: true,
        validate: {
            validator: () => {
                if (!Array.isArray(value)) {
                    return false;
                }
                let isValid = false;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        isValid = false;
                    }
                });
                return isValid;
            },
            message: "Please provide valid image URLS"

        }
    }],
    category: {
        type: String,
        required: true,
    },
    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true,
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity vant be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "quantity can be float"
    },
    stor: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a brand name"],
            lowercase: true,
            enum: {
                values: ["dhaka", "chattogram", "rajshahi", "sylhet"],
                message: "{VALUE} is not valid name"
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: 'Store'
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please supplier   name"],

        },
        id: {
            type: ObjectId,
            ref: 'Supplier'
        }
    }
    // status: {
    //     type: String,
    //     required: true,
    //     enum: {
    //         values: ["in-stock", "out-of-stock", "discontinued"],
    //         message: "{Value} not found"
    //     }



    // },


    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
    // Supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]



}, {
    timestamps: true,
})

//mongoose middlewire for saving pre post 

// productSchema.pre('save', function(next) {
//     if (this.quantity == 0) {
//         this.status = 'out-of-stock'
//     }
// })
// productSchema.post('save', function(doc, next) {
//     console.log('After saving data')
//     next()
// })

// productSchema.methods.logger = function() {
//     console.log(`Data saved for ${this.name}`)
// }

//Schema->Model->Query
const Stock = mongoose.model('Product', stockSchema)

module.exports = Stock;