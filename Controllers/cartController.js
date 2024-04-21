const carts=require('../Models/cartSchema')


exports.addToCart=async(req,res)=>{

    // get details

    const {id,title,price,image,quantity}=req.body;
    try{

        const cartitem=await carts.findOne({id})
        if(cartitem)
        {
            cartitem.quantity+=1;
            cartitem.grandTotal=cartitem.quantity*cartitem.price;
            res.status(200).json("product updated succesfully")
        }
        else{
            const cartNewProduct=new carts({id,title,price,image,quantity,grandTotal:price*quantity})
            await cartNewProduct.save()
            res.status(200).json("product added successfully")
        }

    }
    catch(err)
    {
        res.status(404).json(err)
    }

}

exports.getcart=async(req,res)=>{
    try{
const allcartProducts=await carts.find()
res.status(200).json(allcartProducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}
exports.deleteitem=async(req,res)=>{
    const {id}=req.params;
    try{
const item=await carts.deleteOne({id})
if(item)
{
const cartlist=await carts.find()
res.status(200).json(cartlist)

}
    }
    catch(err)
    {
        res.status(404).json(err)
    }
}
exports.incrementCart=async(req,res)=>
{
const {id}=req.params;
try{
const incrementProduct=await carts.findOne({id})
if(incrementProduct)
{
    incrementProduct.quantity+=1;

    incrementProduct.grandTotal=incrementProduct.price*incrementProduct.quantity;
    await incrementProduct.save()
    const allcart=await carts.find()
res.status(200).json(allcart)
}
else{
    res.status(402).json("item not found")
}

}
catch(err)
{
    res.status(404).json(err)
}
}
exports.decrementcart=async(req,res)=>{

    const {id}=req.params;
try{
const decrementProduct=await carts.findOne({id})
if(decrementProduct)
{
   decrementProduct.quantity-=1;
   if(decrementProduct.quantity==0)
   {
    const item=await carts.deleteOne({id})
if(item)
{
const cartlist=await carts.find()
res.status(200).json(cartlist)

}
   }
else
{


    decrementProduct.grandTotal=decrementProduct.price*decrementProduct.quantity;
    await decrementProduct.save()
    const allcart=await carts.find()
res.status(200).json(allcart)
}
   
}
else{
    res.status(402).json("item not found")
}

}
catch(err)
{
    res.status(404).json(err)
}
}