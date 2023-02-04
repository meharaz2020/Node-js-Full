const { createBrandService, getBrandService, getBrandServiceById, updateService } = require("../services/brand.service");

exports.createBrand = async(req, res, next) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: "success",
            message: "Brand created successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't create data",
            error: error.message
        });
    }

}
exports.getBrand = async(req, res, next) => {
    try {
        const result = await getBrandService(req.body);
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't create data",
            error: error.message
        });
    }

}
exports.getBrandById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await getBrandServiceById(id);
        if (!brand) {
            return res.status(400).json({
                status: "Failed to find",
                error: "Could not find"
            })
        }
        res.status(200).json({
            status: "success",
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't find data",
            error: error.message
        });
    }

}
exports.updateBrand = async(req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await updateService(id, req.body);
        if (!brand.modifiedCount) {
            return res.status(400).json({
                status: "Failed to update",
                error: "Could not update"
            })
        }
        res.status(200).json({
            status: "success",
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't find data",
            error: error.message
        });
    }

}