const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const colors = require("colors")

const app = require("./app")

mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Database Connect successfully`);
})
const port = process.env.POST || 5000;
app.listen(port, () => {
    console.log(`App is running on porty ${port}`.yellow.bold)
})