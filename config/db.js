const mongoose=require("mongoose")

const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log(`Connected to MONGOOSE host ${mongoose.connection.host}`)
        
    } catch (error) {
        console.log('error connecting to Database')
    }
}


module.exports={connectdb}