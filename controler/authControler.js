const userModels = require("../models/userModels")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
    try {
        const { username, email, password, address, phone,answer,usertype } = req.body
        // await userSchema.create({})
        if (
            !username ||
            !email ||
            !password ||
            !address ||
            !usertype ||
            !phone
            || !answer) {
            res.status(500).send("All feilds are required")
        }
        //check registeration
        const existing = await userModels.findOne({ email })
        
        if (existing) {
            return res.status(500).send({
                success: true
                , message: 'User already exists please login'
            })
        }
        //  incrypt password || Hasing password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //create new user
        const user = await userModels.create({ username, email, password: hashPassword, address, phone,answer,usertype })
        res.status(201).send({
            success: true
            , message: 'User Registered', user
        })

    } catch (error) {
        console.log({
            success: true
            , message: 'Error cant register user'
            , error
        })
    }

}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please enter both email and password"
            })
        }

        // check user
        const user = await userModels.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found please signup"
            })
        }
        // decrypt password |compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.send("Incorrect password")
        }
        // tokenizaztion
        const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: "7d" })

        user.password = undefined
        return res.status(200).send({
            success: true,
            message: "login successful"
            , user
            , token

        })

    } catch (error) {
        return res.status(500).send({
            success: true
            , message: 'Error  loging in'
            , error
        })

    }

}

// const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Please enter both email and password"
//             });
//         }

//         const user = await userModels.findOne({ email });
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "User not found, please signup"
//             });
//         }

//         // Here you should also check password (bcrypt compare if hashed)
//         // Right now it just logs in anyone with correct email.

//         return res.status(200).send({
//             success: true,
//             message: "Login successful",
//             user
//         });

//     } catch (error) {
//         return res.status(500).send({
//             success: false,
//             message: "Error logging in",
//             error
//         });
//     }
// };


module.exports = { registerController, loginController }