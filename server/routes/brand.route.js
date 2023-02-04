const express = require('express')
const brandControllers = require("../controller/brand.controller")
const router = express.Router()



router.route("/")
    .post(brandControllers.createBrand)
    .get(brandControllers.getBrand)
    .patch(brandControllers.updateBrand)


router.route("/:id")
    .get(brandControllers.getBrandById)








module.exports = router