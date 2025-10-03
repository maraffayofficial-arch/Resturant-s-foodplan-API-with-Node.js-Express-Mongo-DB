const express=require('express')
const router=express.Router()
const {testusercontroller}=require("../controler/testcontroler")


//Routes get/post/patch/delete
router.get("/test-user",testusercontroller)


module.exports=router