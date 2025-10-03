const {orderstatusUpdate,createFoods,getAllfoods,deletefood,updatefood,getSinglefood,createOrder,getFoodsbasedOnResturant}=require("../controler/foodcontroler")
const express=require("express")
const router=express.Router()
const {authMiddleware}=require("../middlewares/authMiddlewares")
const adminMiddleware  = require("../middlewares/adminMiddleware")


//   FOOD    ROUTES
router.post("/create",authMiddleware,createFoods)
router.get("/getallfoods",getAllfoods)
router.get("/getFoodsbasedOnResturant/:id",getFoodsbasedOnResturant)
router.get("/getSinglefood/:id",getSinglefood)
router.patch("/updatefood/:id",authMiddleware,updatefood)
router.delete("/deletefood/:id",authMiddleware,adminMiddleware,deletefood)



//   ORDER    ROUTES
router.post("/createOrder",authMiddleware,createOrder)
router.post("/status/:orderId",authMiddleware,orderstatusUpdate)


module.exports=router



