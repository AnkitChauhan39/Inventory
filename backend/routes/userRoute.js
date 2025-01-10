const  express = require("express") 
const router = express.Router() 
const {registerUser, LoginUser, logoutUser, getUser, LoginStatus, updateUser, changepassword} = require("../controllers/userController")
const { protect } = require("../middleWare/protect")


router.post("/register",registerUser)
router.post("/login",LoginUser)
router.get("/logoutUser",logoutUser)
router.get("/getuser", protect , getUser )
router.get("/loginstatus",LoginStatus)
router.patch("/updateuser",protect,updateUser)
router.patch("/changepassword",protect,changepassword)
  
module.exports = router   