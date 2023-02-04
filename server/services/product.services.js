const Brand = require('../models/Brand')
const Product = require('../models/Product')
exports.getProductServices = async(filters, queries) => {
    const products = await Product.find({})
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fields)
    const totalproducts = await Product.countDocuments(filters)
    const pagecount = Math.ceil(totalproducts / queries.limit)

    return { products, pagecount, totalproducts }

}
exports.createProductServices = async(data) => {
    // const product = new Product(req.body)
    // const result = await product.save()
    const product = await Product.create(data)

    const { _id: productId, brand } = product;

    await Brand.updateOne({
        _id: brand.id
    }, { $push: { products: productId } })
    return product

}
exports.updateProductServices = async(productId, data) => {
    // const product = new Product(req.body)
    // const result = await product.save()
    // const result = await Product.updateOne({ _id: productId }, { $set: data }, {
    //     runValidators: true
    // });

    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;

}

exports.bulkupdateService = async(data) => {
    //update many data same value
    // const result = await Product.updateMany({ _id: data.ids }, data, {
    //     runValidators: true

    // })
    //update many data using singla singla
    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data))
    });
    const result = await Promise.all(products)
    return result
}

exports.deleteProductByid = async(id) => {
    const result = await Product.deleteOne({ _id: id });
    return result
}

exports.bulkdeleteService = async(ids) => {

    const result = await Product.deleteMany({ _id: ids })


    return result
}