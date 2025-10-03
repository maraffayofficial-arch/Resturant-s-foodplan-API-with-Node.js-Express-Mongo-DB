const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:[true,"User name is required!!"]
    },
    email:{
        type:String,
        required:[true,"Email is required!!"],
        unique: true
    },
    password:{
        type:String,
        required:[true,"Password  is required!!"]
    
    },
    address:{
        type:Array,
       
    
    },
    phone:{
        type:String,
        required:[true,"Phone number  is required!!"]
    
    },
    profile:{
        type:String,
       default:"https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg"
    
    },
    usertype:{
        type:String,
        required:[true,"user type  is required!!"]
       ,default:"client"
       ,enum:['client','admin','vendor','driver']
    },
    answer:{
        type:String,
        required:true,
    }
},{timestamps:true})


module.exports=mongoose.model('User',userSchema)