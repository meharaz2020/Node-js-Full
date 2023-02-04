const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

app.use(express.json())
app.use(cors())
    //schema
    //routes 
const productRoute = require('./routes/product.route')
const brandRoute = require('./routes/brand.route')
const userRoute = require('./routes/user.route')
app.get("/", (req, res) => {
    res.send("yeh connect")
})


app.use('/api/v1/product', productRoute)
app.use('/api/v1/brand', brandRoute)
app.use('/user', userRoute)






module.exports = app;