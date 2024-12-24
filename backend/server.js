const express = require("express") ; 
const mongoose = require("mongoose") ; 

require("dotenv").config(); 

const app = express(); 

const PORT = process.env.PORT ; 

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database succesfully connected") 
    app.listen(PORT , () => {
        console.log(`Server is live succesfully on PORT ${PORT}`) 
    })
})
.catch((err) => {
    console.log(err); 
}) 
 