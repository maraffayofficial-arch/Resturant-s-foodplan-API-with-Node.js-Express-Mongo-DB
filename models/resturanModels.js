const mongoose=require("mongoose")


const resturant=new mongoose.Schema({
title:{
    type:String,
    required:true
},
imageurl:{
    type:String,
 default:true   
},
foods:{
    type:Array
},
pickup:{
    type:Boolean,
    default:true
},
delivery:{
    type:String
    ,default:true
},
isopen:{
    type:Boolean
    ,default:true
},
logourl:{
    type:String
    ,default:true
},
rating:{
    type:Number
    ,default:1
,min:1
,max:5
},
ratingcount:{
type:Number
},
code:{
type:String
},
time:{
    type:String
},
coords:{
    id:{type:String},
    longitude:{type:Number},
    longitudeDelta:{type:Number},
    latitude:{type:Number},
    latitudeDelta:{type:Number},
address:{type:String},
title:{type:String},
},
    
},{timestamps:true})


module.exports=mongoose.model('resturant',resturant)