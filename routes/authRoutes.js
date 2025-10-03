const express=require("express")
const {registerController,loginController}=require("../controler/authControler.js")
const router=express.Router()


// routes
//REGISTER POST
console.log("Auth routes loaded 1")
router.post("/login",loginController)
console.log("Auth routes loaded 2")
// router.route("/register").post(registerController)
router.post("/register",registerController)
console.log("Auth routes loaded 3")

    //Login POST
    // router.post("/login",loginController)

module.exports=router