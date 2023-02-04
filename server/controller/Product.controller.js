const Product = require("../models/Product");
const { getProductServices, createProductServices, updateProductServices, bulkupdateService, deleteProductByid, bulkdeleteService } = require("../services/product.services");


exports.getProduct = async(req, res, next) => {
    try {

        let filters = {...req.query };
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])
            //gt,gte,lt,lte 
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString)
        const queries = {}

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
        }


        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }



        const products = await getProductServices(filters, queries)
            // const products = await getProductServices()
            //query
            /* middle of {}
            1._id:".....",name:"..." =>only name and id data found 
            2. $or:[{_id:'...'},{name:'....}]
            3.status:{$ne:'.....'}
            4.quantity:{$gt:100}//$gte 
            5.$lt/$lte
            6.name:{$in:['...','....']}
            7.projection:
            find({},'name quantity') only this 2 show
            find({},'-name -quantity') all data show without this 2 show
        
            8.find({}).limit(1)
            9.find({}).sort({quantity:-1}) -1=desc 1=asc 
            10.find({}).select({name:1}) only name show 
            11. we use where without find Product.where("name").equals("chal").where("quantity").gt(100).lt(600).limit(2).sort({quantity:-1})
            12. Product.findById('....)
            */

        //Advance filtering 
        /*
           1.sort many dta=> find().sort('quantity price name)
            2.
            
        */
        res.status(200).json({
            status: "Success",
            data: products
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get data",
            error: error.message
        });
    }
}


exports.createProduct = async(req, res, next) => {
    try {
        const result = await createProductServices(req.body)
            // const product = new Product(req.body)
            // const result = await product.save()
            // result.logger()
        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Data insert failed',
            error: error.message
        })
    }


}




exports.updateProduct = async(req, res, next) => {
    try {

        const { id } = req.params;
        const result = await updateProductServices(id, req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Data update successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Data update failed',
            error: error.message
        })
    }
}
exports.bulkupdateProduct = async(req, res, next) => {
    try {

        const result = await bulkupdateService(id, req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Data update successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Data update failed',
            error: error.message
        })
    }
}

exports.deleteProduct = async(req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteProductByid(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could not delete thr product"
            })
        }
        res.status(200).json({
            status: 'Success',
            message: 'Data delete successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Data delete failed',
            error: error.message
        })
    }
}


exports.bulkdeleteProduct = async(req, res, next) => {
    try {

        const result = await bulkdeleteService(req.body.ids);
        res.status(200).json({
            status: 'Success',
            message: 'Data delete successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Data delete failed',
            error: error.message
        })
    }
}

exports.fileupload = async(res, req) => {
    try {
        res.status(200).json(req.file) //single
            // res.status(200).json(req.file)//multi
    } catch (error) {

    }
}

//aggration find data
// exports.getStockByIdService = async(id) => {
//     const stock = await Stock.aggregation([
//         { $match: { _id: ObjectiId(id) } },
//         {
//             $project: {
//                 name: 1,
//                 category: 1,
//                 'brand.name': { $toLower: '$brand.name' }
//             }
//         },
//         {
//             $lookup: {
//                 from: 'brands',
//                 localField: 'brand.name',
//                 foreignField: 'name',
//                 as: 'brandDetails'
//             }
//         }
//     ])

// }

// const data = await stock.aggregate([
//     { $match: {} },
//     {
//         $project: {
//             price: { $convert: { input: '$price', to: 'int' } }
//         }

//     },
//     { $group: { _id: '$store.name', totalProductsPrice: { $sum: { $multiply: ['$price', '$quantity'] } } } }

// ])