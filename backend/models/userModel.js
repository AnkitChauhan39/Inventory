const mongoose = require("mongoose") 


const userSchema = mongoose.Schema({
    name:{
        type:String ,
        required :[true ,  "Please add a name"]
    }, 
    email:{
        type:String,
        required: [true , "Please Enter a email"] ,
        unique: true , 
        trim : true , 
        match:[
            /^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/i , 
            "Please Enter a valid email"
        ]
    },
    password:{
        type: String ,
        require:[true,"Please  enter the Password "],
        minLength:[6,"Password too short!! Not less than 6 characters"],
        maxLength:[23,"Password too large!! Not more than 23 characters"],
    },
    photo:{
        type:String,
        // required:[true,"Please Enter a Photo"],
        default: "",
    },
    phone:{
        type:String,
        default: "+91" ,
    },
    bio:{
        type:String,
        maxLength:[250,"Bio too large!! Not more than 250 characters"],
        default: "" ,
    }
},{
    timespamps:true 
}
)


const User = mongoose.model("User",userSchema)
module.exports = User