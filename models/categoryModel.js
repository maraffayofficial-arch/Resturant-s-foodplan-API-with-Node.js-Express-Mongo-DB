const mongoose = require("mongoose")


const categorySchema = new mongoose.Schema(

    {title: {
    type: String,
    required: true
},

    imageUrl: {
    type: String,
    required: true,
    default:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"

}},{timestamps:true}
)


const categoryModel= mongoose.model("categories",categorySchema)

module.exports=categoryModel