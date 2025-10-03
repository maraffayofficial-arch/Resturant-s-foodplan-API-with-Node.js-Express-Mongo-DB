const userModels = require("../models/userModels")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//get user info   // in this function make sure that you send only one response by using return keyword you can make sure that only one response is sent 
const getUserController = async (req, res) => {
    try {
        console.log(req.user.id)
        // res.send("Updated the usercontroller")
        const user = await userModels.findById(req.user.id)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not available"
            })
        } else {
            user.password = undefined
            return res.send({
                success: true,
                message: "user get successful"
                , user
            })
        }
    } catch (error) {
        return res.status(500).send("error auth user")
    }
}

const updateUserController = async (req, res) => {
    try {

        const id = req.user.id
        console.log(id)
        const User = await userModels.findById(id)
        if (!User) {
            return res.status(404).send("User not found")
        }
        else {
            const { username, address, phone } = req.body
            if (username) User.username = username
            if (phone) User.phone = phone
            if (address) User.address = address
            await User.save()
            User.password = undefined
            return res.send({
                User
            })
        }
    } catch (error) {
        return res.status(500).send("Cannot upateuser")
    }

}


const updatepassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body
        if (!oldpassword || !newpassword) {
            return res.send("please provide both old and new password")
        }
        const user = await userModels.findById({ _id: req.user.id })
        if (!user) {
            return res.send("User not Found")
        }
        const isMatch = await bcrypt.compare(oldpassword, user.password)
        if (!isMatch) {
            return res.send("Incorrect password")
        }
        console.log({ user })

        user.password = newpassword
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(newpassword, salt)
        user.password = hashpassword
        await user.save()
        return res.send("Update password successfuly")
    }
    catch (error) {
        return res.status(500).send({
            success: false
            , message: "Error in Update Password api"
        })
    }
}

const resetpassword = async (req, res) => {
    try {
        const { email, newpassword, answer } = req.body
        const user = await userModels.findOne({ email })
        if (!email || !newpassword || !answer) {
            return res.status(400).send("PLEASE enter all feields")
        }
        user.password = newpassword
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(newpassword, salt)
        user.password=hashpassword
        await user.save()
        return res.status(200).send("Password reset successful")
    } catch (error) {
        return res.status(500).send("error in resest password api")
    }

    
    
    
}


const deleteuser= async(req,res)=>{
    // const {email,password,answer}= req.body
    try {
        const id= req.params.id
        // const user=await userModels.findByIdAndDelete(req.params.id)
        const user=await userModels.findByIdAndDelete(id)
        
        if (!user){
        return res.status(401).send("user not found")
        }
        return res.status(200).send("user deleted successfuly")

    } catch (error) {
        return res.status(500).send("error in delete user  api")
    }


}
module.exports = {deleteuser, resetpassword, updatepassword, getUserController, updateUserController }

