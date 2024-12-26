const User = require("../models/userModel")

const registerUser = async (req,res) =>{ 
    try{
        const {name,email} = req.body
        if(!email ){
            res.status(400)
            throw new Error("Please add email")
        }
        res.send("Resgister User ")
    }catch(error){
        res.status(500).json({
            message:" user not registered "
        })
    }
} 

module.exports = {
    registerUser
}