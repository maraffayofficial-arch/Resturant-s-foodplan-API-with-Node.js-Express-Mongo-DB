const express=require("express")
const { authMiddleware } = require("../middlewares/authMiddlewares")
const { getallCategory,createCategory,deleteCategory,updateCategory } = require("../controler/categoryController")
const router=express.Router()

router.post("/create",authMiddleware,createCategory)
router.patch("/updatecatergory/:id",authMiddleware,updateCategory)
router.delete("/deletecategory/:id",authMiddleware,deleteCategory)
router.get("/getallcategories",getallCategory)


module.exports=router