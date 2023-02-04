const Brand = require("../models/Brand")





exports.createBrandService = async(data) => {
    const result = await Brand.create(data);
    return result
}
exports.getBrandService = async() => {
    // const brands = await Brand.find({}).select('-products -supplier');
    const brands = await Brand.find({}).populate('products');
    return brands
}
exports.getBrandServiceById = async(id) => {
    const brands = await Brand.find({ _id: id });
    return brands
}
exports.updateService = async(id, data) => {
    const brands = await Brand.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return brands
}