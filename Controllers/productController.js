const product=require('../Models/productSchema')

// get all products from the db

exports.getAllProducts=async(req,res)=>{
    // get all products from mongodg using find()

    try{
const allproducts=await product.find()

res.status(200).json(allproducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.viewProduct=async(req,res)=>{
    const {id}=req.params;
try{
    const item= await product.findOne({id})
    console.log(item)
    res.status(200).json(item)

}
catch(err)
{
    res.status(404).json(err)
}
}