//requirements
const express=require("express")
const {connectdb}=require("./config/db")
const app=express()
const cors =require("cors")
const morgan=require('morgan')
const dotenv=require('dotenv')

//configurations
dotenv.config()

//DB connectoion
connectdb()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev'))

//routes
// app.use("/api/v1/test",require("./routes/testroutes"))
app.use("/api/v1/auth",require("./routes/authRoutes"))
app.use("/api/v1/user",require("./routes/userRoutes"))
app.use("/api/v1/resturant",require("./routes/resturanRoutes"))
app.use("/api/v1/categories",require("./routes/categoryRoutes"))
app.use("/api/v1/food",require("./routes/foodroutes"))


app.get("/",(req,res)=>{
return res.status(200).send('<h1> this is food app</h1>')
})


const port=process.env.port||80
app.listen(port,(req,res)=>{
    console.log(`Server started on ${port}`)

})

