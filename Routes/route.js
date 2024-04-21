const express=require('express')
const projectController=require("../Controllers/productController")
const wishlistController=require('../Controllers/wishlistController')
const router=new express.Router();
const userController=require('../Controllers/userController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const cartController=require('../Controllers/cartController')
// get all products

router.get('/all-products',projectController.getAllProducts)

// register
router.post('/user/register',userController.register)

// login

router.post('/user/login',userController.login)

// getaproduct
router.get('/view-product/:id',projectController.viewProduct)

// wishlist
router.post('/wishlist',jwtMiddleware,wishlistController.addWishlist)

router.get('/wishlist-products',jwtMiddleware,wishlistController.getwishlist)

// delete item from wishlist
router.delete('/wishlist-delete/:id',jwtMiddleware,wishlistController.deleteitem)

// cart

router.post('/add-cart',jwtMiddleware,cartController.addToCart)
router.get('/get-cart',jwtMiddleware,cartController.getcart)
router.delete('/delete-cartitem/:id',jwtMiddleware,cartController.deleteitem)
router.get('/increment-cart/:id',jwtMiddleware,cartController.incrementCart)
router.get('/decrement-cart/:id',jwtMiddleware,cartController.decrementcart)
module.exports=router