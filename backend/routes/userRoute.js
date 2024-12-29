const  express = require("express") 
const router = express.Router() 
const {registerUser, LoginUser, logoutUser, getUser, LoginStatus} = require("../controllers/userController")
const { protect } = require("../middleWare/protect")

router.post("/register",registerUser)
router.post("/login",LoginUser)
router.get("/logoutUser",logoutUser)
router.post("/getuser", protect , getUser )
router.post("/loginstatus",LoginStatus)
  
module.exports = router   