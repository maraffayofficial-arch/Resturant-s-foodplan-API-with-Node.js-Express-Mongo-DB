const foodModel = require("../models/foodmodel")
const orderModel = require("../models/orderModel")

const createFoods = async (req, res) => {
    try {
        const { title, price, discription, code, category, resturant, imageUrl, foodtags, ratings, ratingcount } = req.body
        if (!title || !price || !discription) {
            return res.stattus(400).send("title,price,discription are required")
        }
        const newfood = new foodModel(req.body)
        await newfood.save()
        return res.status(201).send("Food successfully added")
    } catch (error) {
        return res.status().send({
            success: false,
            message: "Error in creat food api",
        })
    }
}
const getAllfoods = async (req, res) => {
    const allfoods = await foodModel.find({})
    if (!allfoods) {
        return res.status(404).send("no foods found")
    }

    return res.send({
        success: true,
        totalfoods: allfoods.length,
        allfoods
    })
}

const updatefood = async (req, res) => {
const foodId=req.params.id
const updatefood=await foodModel.findById(foodId)
console.log(updatefood)
if (!updatefood){
    return res.status(404).send("Food not found")
}
const {title,price,discription,code,category,resturant,imageUrl,foodtags,ratings,ratingcount}=req.body
updatefood.title=title
updatefood.price=price
updatefood.discription=discription

await updatefood.save()
return res.status(200).send("food updated successfully")

}
const deletefood = async (req, res) => {
const foodId=req.params.id
const deletefood=await foodModel.findByIdAndDelete(foodId)
if (!deletefood){
    return res.status(404).send("Food not found")

}
return res.status(200).send("Food deleted successfully")
}

const getSinglefood=async(req,res)=>{
const foodid=req.params.id
const food=await foodModel.findById(foodid)
if (!food){
    return res.send("food not found")
}
return res.status(200).send(food)

}

const getFoodsbasedOnResturant=async(req,res)=>{
const resturantId=req.params.id
console.log(resturantId)
const resturantFoods=await foodModel.find({resturant:resturantId})
if (!resturantFoods){
    return res.send("cant find resturants food")
}
return res.status(200).send(resturantFoods)

}


//ORDER CONTROLLER

const createOrder=async(req,res)=>{
try {
    const {cart}=req.body
    if (!cart){
        return res.status(500).send("Cart not found")
    }
    let total=0
    
    cart.map((i)=>{
    total+=i.price
    })
    console.log(cart)
    const newOrder=new orderModel({
        foods:cart,
        payment:total,
        buyer:req.body.id,
        // status:status
    })
    console.log(newOrder)
    await newOrder.save()
        return res.status(201).send({
            success:true
            ,message: "order created"
            ,newOrder
        })

    
} catch (error) {
    return res.status(500).send({success:false,
        message:"Error in ORDER Api"})
    , error
}
}

const orderstatusUpdate=async(req,res)=>{
const orderId=req.params.orderId
const orderStatus=await orderModel.findByIdAndUpdate(orderId,{status:req.body.status},{new:true})
if(!orderStatus){
    return res.status(404).send("Status not found")
}
return res.status(200).send({
    success:true,
    message:orderStatus
})}
module.exports = {
    orderstatusUpdate,createFoods, getAllfoods, deletefood, updatefood,getSinglefood,getFoodsbasedOnResturant,createOrder
}