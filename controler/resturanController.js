const resturant=require("../models/resturanModels")


// create a new resturant 
const createResturant=async (req,res)=>{

    try {
        const {title,imageurl,foods,pickup,delivery,isopen,
            logourl,rating,ratingcount,code,time,coords}=req.body
        
            if(!title||!coords){
        return resturant.status(500).send("Please provide title and address")
        }
        
        const newResturant= new resturant({
            title,imageurl,foods,pickup,delivery,isopen,
            logourl,rating,ratingcount,code,time,coords
        })

        await newResturant.save()
        res.status(200).send({
            success:true,
            message:'Resturant created',
            newResturant
        })

        
    } catch (error) {
        
        res.status(500).send({
            success:true,
            message:'Error in resturant creation api',
            newResturant
        })

    }


}
// get all resturants

const getResturants=async(req,res)=>{
try {
    
    const resturants=await resturant.find({})
    if (!resturants){
        res.status(404).send("could not get resturants")

    }
          res.status(200).send({
            
        success:true,
        totalresturants:resturants.length
        ,resturants
          })
} catch (error) {
    res.status(500).send({
        success:false,
        message:"error getting Resturants"
    })
}
    
}

// get a resturant by id
const getResturantById =async(req,res)=>{
    const resturantId=req.params.id
const getResturant=await resturant.findById(resturantId)

if (!getResturant){
    res.status(404).send("Resturant not found")
}
res.status(200).send({
    success:true,
    getResturant
})
}

//delete a Resturant by id
const  deleteResturantById=async(req,res)=>{
try {
const resturantId=req.params.id
const deleteResturant=await resturant.findByIdAndDelete(resturantId)
if (!deleteResturant){
 return res.status(404).send("Could not find resturant to delete")
}
else{
    
    return res.status(200).send("Resturant deleted successfuly")
}
    
} catch (error) {
  return  res.status(500).send("Error in deleting resturant api")
}
}

module.exports={
    createResturant,getResturants,getResturantById,deleteResturantById
}