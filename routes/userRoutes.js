const express=require("express")
const {resetpassword,getUserController,updateUserController,updatepassword,deleteuser}=require("../controler/userController")
const { authMiddleware } = require("../middlewares/authMiddlewares")
const router=express.Router()


// routes
//user routes get

router.get("/getuser",authMiddleware,getUserController)
router.post("/update",authMiddleware,updateUserController)
router.post("/updatepassword",authMiddleware,updatepassword)
router.post("/resetpassword",authMiddleware,resetpassword)
router.delete("/deleteuser/:id",authMiddleware,deleteuser)
// router.delete("/deleteuser/",authMiddleware,deleteuser)

module.exports=router