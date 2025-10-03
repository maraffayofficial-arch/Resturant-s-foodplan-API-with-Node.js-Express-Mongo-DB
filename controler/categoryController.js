const categoryModel = require("../models/categoryModel")

const createCategory = async (req, res) => {
    try {
        const { title, imageUrl } = req.body

        const newCategory = new categoryModel({
            title, imageUrl
        })

        if (!newCategory) {
          return  res.statue(400).send("Can not create new category")
        }
        await newCategory.save()
        return res.status(200).send({message:"New category created",
            newCategory
        })

    } catch (error) {
       return res.statue(500).send({
            success: false
            , message: "Error creating new category"
            , error
        })
    }



}

const updateCategory=async(req,res)=>{
try {

    const id= req.params.id
    console.log(id)
    const updatecategory=await categoryModel.findOneAndUpdate({_id:id},{title:req.body.title},{imageUrl:req.body.imageUrl})
    if (!updatecategory){
    return res.status(404).send("Culd not find category")    
    }
    await updatecategory.save()
   return res.send({message:"Category upadted successfully",
    updatecategory
   })
} catch (error) {
    return res.status(500).send("Error in Update category api")
}
}



const deleteCategory=async(req,res)=>{
try {
    id=req.params.id
    const deletecategory=await categoryModel.findByIdAndDelete(id)
    if(!deletecategory){
    return res.status(404).send("ID not found to delete category")       
    }
    return res.status(200).send("category successfully deleted")
} catch (error) {
    return res.status(500).send("Error in delete category api")
}
}
const getallCategory=async(req,res)=>{
try {
    const getcategories=await categoryModel.find({})
    return res.status(200).send({message:"All categories"
        ,getcategories}
    )
} catch (error) {
    return res.status(500).send("Error in delete category api")
}
}

module.exports = {
    createCategory,deleteCategory,updateCategory,getallCategory
}