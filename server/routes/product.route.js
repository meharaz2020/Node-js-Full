const express = require('express')
const productController = require('../controller/Product.controller')

const router = express.Router()

const multer = require("multer");
const uploader = require('../middlewire/uploader');
const { verifyToken } = require('../middlewire/veryfy.token');
// router.use(verifyToken)
const authorization = require("../middlewire/authorization")
    // const uploader = multer({ dest: "images/" })
router.post('/file-upload', uploader.single("image"), productController.fileupload) //single
router.post('/file-upload', uploader.array("image"), productController.fileupload) //multi



router.route('/bulk-update').patch(productController.bulkupdateProduct)
router.route('/bulk-delete').delete(productController.bulkdeleteProduct)


router.route('/')
    .get(productController.getProduct)
    .post(verifyToken, authorization("admin", "store-manage"), productController.createProduct)

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router