const jwt = require("jsonwebtoken")

const authMiddleware=async(req,res,next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1] // this line will decode the token i get from the login 
        jwt.verify(token,process.env.jwt_secret,(err,decoded)=>{
            if (err){
              return   res.send("User not auathorized")
            }
            else{
            req.user=decoded
            console.log("middleware fine")
            next()
            }
    })

    } catch (error) {
        return res.send("Error in auth api (Middleware)")
    }
    
}

module.exports={authMiddleware}
