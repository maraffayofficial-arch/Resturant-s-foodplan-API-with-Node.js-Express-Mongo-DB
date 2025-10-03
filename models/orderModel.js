const mongoose=require("mongoose")

const orderSchema= new mongoose.Schema({
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food"
    }],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
    status:{
        type:String,
        enum:['preparing','prepared','out for delivery','delivered']
        ,default:"preparing"
    }
},{timestamps:true}
)

const orderModel=mongoose.model("order",orderSchema)

module.exports=orderModel