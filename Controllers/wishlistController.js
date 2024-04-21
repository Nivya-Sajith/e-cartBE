const wishlists=require('../Models/wishlistSchema')

// add to wishlist

exports.addWishlist=async (req,res)=>{
    // get an id
    const {id,title,price,image}=req.body
    // get an userid
    const userId=req.payload
    // add details of the product to the db
    try{
const existingProduct=await wishlists.findOne({id})
if(existingProduct)
{
    res.status(404).json("product already exist")
}
else{
    const newproduct=new wishlists({
        id,title,price,image,
        userId
    })
    await newproduct.save()
    res.status(200).json("Product added successfully")
}
    }
    catch(err)
    {
        res.status(404).json(err)
    }
}

// delete an item from wishlist
exports.deleteitem=async(req,res)=>{
    const {id}=req.params
    try{
const deleteitem=await wishlists.deleteOne({id})
if(deleteitem)
{
    const wishlistproduct=await wishlists.find()
    res.status(200).json(wishlistproduct)
}
    }
    catch(err)
    {
        res.status(500).json("error",err)
    }
}
// getwishlist
exports.getwishlist=async(req,res)=>{
    try{
        const products=await wishlists.find();
        if(products)
        {
         res.status(200).json(products)   
        }
        else{
            res.status(404).json("empty wishlist")
        }
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}