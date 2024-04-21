require('dotenv').config()

const express=require('express')
const cors=require('cors');
const db=require('./Connection/db')

const router=require('./Routes/route')
const ecartserver=express();
ecartserver.use(cors())
ecartserver.use(express.json())
ecartserver.use(router)
const PORT= 3000 || process.env.PORT
ecartserver.listen(PORT ,()=>{
    console.log('listening to port ',PORT);
})
ecartserver.get('/',(req,res)=>{
    res.send("E-cart server started")
})