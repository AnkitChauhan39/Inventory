const express = require("express")  
const mongoose = require("mongoose") 
const bodyParser = require("body-parser")
const cors = require("cors") 
const userRoutes = require("./routes/userRoute")
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser")
require("dotenv").config();  

const app = express(); 
 
const PORT = process.env.PORT||4000 ; 
  
// middlewares 
app.use(express.json()) // help us handle the json data in our application 
app.use(express.urlencoded({extended : false})) // help us handle the data whic comes via url 
app.use(bodyParser.json()) // when we pass on info from frontend to backend the body parser helps us to convert that data to read able objects 
app.use("/api/users", userRoutes) 

//Routes  
app.get( "/" , (req,res) => {
    res.send("HOME PAGE")
})

//Error MiddleWare 
app.use(errorHandler) 
// Buliding the server and conneting to database 

mongoose.connect(process.env.MONGO_URL) // mongoose verion use 8.0.4 for newer version database not connected 
.then(() => {
    console.log("Database succesfully connected")  
    app.listen(PORT , () => {
        console.log(`Server is live succesfully on PORT ${PORT}`)  
    })
})
.catch((err) => {
    console.log(err); 
}) 
 