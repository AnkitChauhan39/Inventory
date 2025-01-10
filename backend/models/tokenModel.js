const mongoose = require("mongoose")

const tokenSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref:"user"
        },
        token:{
            type:String,
            required: true 
        },
        createdAt:{
            type:Date,
            required: true
        },
        expiresAt:{
            type:Date ,
            required: true 
        }
    }
)

const Token = mongoose.model("Token",tokenSchema)
module.exports = Token 

//this token will be used for reseting the password 
// user clicks on the forgot password 
// create reset token and save the token in the database 
// send the reset token with the url to the user email 
// when user clicks the link , compare the token with thst in the database 
// if they matches then change the user password