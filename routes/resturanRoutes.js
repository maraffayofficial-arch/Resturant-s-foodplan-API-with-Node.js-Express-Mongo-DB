const express=require("express")
const {createResturant,getResturants,getResturantById,deleteResturantById}=require("../controler/resturanController")
const { authMiddleware } = require("../middlewares/authMiddlewares")
const router=express.Router()


// routes
//user routes get
router.post("/create",authMiddleware,createResturant)
// router.post("/create",authMiddleware,createResturant)
router.get("/getResturants",getResturants)
router.get("/getResturant/:id",getResturantById)
router.delete("/deleteResturant/:id",deleteResturantById)

module.exports=router