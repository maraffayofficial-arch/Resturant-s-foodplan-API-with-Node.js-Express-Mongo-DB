const userModel = require('../models/userModels')

module.exports=async (req, res, next)=> {
    try {
        const userId = req.body.id
        console.log(userId )
        const admin = await userModel.findById(userId)

        if (admin.userType !== "admin") {
            return res.status(401).send("Un Authorized access")
        }
        next()
    }

    catch (error) {
    res.send("Admin middle is not responding")
console.log("Admin middle is not responding")    
}
}
