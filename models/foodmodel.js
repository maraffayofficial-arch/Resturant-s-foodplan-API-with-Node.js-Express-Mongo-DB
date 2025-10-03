const mongoose=require("mongoose")

const foodSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide food name"]
    },
    price:{
        type:String,
        required:[true,"Please provide food price"]
    },
    discription:{
        type:String,
        required:[true,"Please provide food discription"]
    },
    code:{
        type:String,
        // required:true
    },
    category:{
        type:String,
        // required:true
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"resturant"
        
    },
    imageUrl:{
        type:String,
        default:"www.example.com"
    },
    foodtags:{
        type:String,
        // required:true
    },
    ratings:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingcount:{
        type:String,
    },
},{timestamps:true})

const foodModel=mongoose.model("food",foodSchema)

module.exports=foodModel