const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/********* TOKEN GENRATOR ********/
const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//********* REGISTER USER **********//
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all required fields!!");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password Should be upto 6 characters");
  }
  // check if user email already exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email has Already been registered!!");
  }
  // create a new user ..
  const user = await User.create({
    name,
    email,
    password, // you don't want to store the password as it is in the database.... so for this we have implemented pre function reffer to user model
  });
  const token = genrateToken(user._id);
  res.cookie("token", token, {
    path: "/", // if you dont set then by deafult it is going to be root directorty
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day me expire ho jayega
    sameSite: "none", // means our frontend and backend can have diffrent urls
    secure: true, // we specify we are using https
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("Invaild user Data");
  }
});

//*********** LOGIN USER  ***********//

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Add Email and Password");
  }

  // check user exit

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found !! please sign up ");
  }

  //user Exist now check if password is correct

  const PasswordIsCorrect = await bcrypt.compare(password, user.password);

  const token = genrateToken(user._id);

  res.cookie("token", token, {
    path: "/", // if you dont set then by deafult it is going to be root directorty
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day me expire ho jayega
    sameSite: "none", // means our frontend and backend can have diffrent urls
    secure: true, // we specify we are using https
  });

  if (PasswordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//************* LOG OUT USER  *************//

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/", // if you dont set then by deafult it is going to be root directorty
    httpOnly: true,
    expires: new Date(0), // 1 day me expire ho jayega
    sameSite: "none", // means our frontend and backend can have diffrent urls
    secure: true, // we specify we are using https
  });

  res.status(200).json({
    message: "Succefully logged out",
  });
});

// ********* GET USER  *********/

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(401);
    throw new Error("User Not Found");
  }
});

/********** LOGIN STATUS ***********/

const LoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json(false);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.status(200).json(true);
  } else {
    return res.status(400).json(false);
  }
});

/********* UPDATE USER ********/

const updateUser = asyncHandler( async(req,res) => { 
  //if you return function wrapped in async hndler then function is returned wrapperin async handler [Function: asyncUtilWrap] use try catch id want to return 
    const user =  await User.findById(req.user._id) ; 

    if(user){
      const { name,email,photo,phone,bio } = user 
      
      user.email = email , 
      user.name = req.body.name || name 
      user.photo = req.body.photo || photo
      user.phone = req.body.phone || phone 
      user.bio = req.body.bio || bio 

      const updatedUser = await user.save() 

      res.json({
        _id: updatedUser._id,
        email: updatedUser.email , 
        name: updatedUser.name , 
        photo: updatedUser.photo , 
        phone: updatedUser.phone , 
        bio:updatedUser.bio 
      })
    }else{
      res.status(404) 
      throw new Error("User Not Found")
    }
} )


/*********** Change Password *********/
const changepassword = asyncHandler( async(req,res) => {
   const user = await  User.findById(req.user.id) 
   
   const {oldpassword , newpassword } = req.body 
   

   // check if the request is proper 
   if(!oldpassword || !newpassword) {
      res.status(400) 
      throw new Error("Please add all required field!!")
   }

   // check if the user is present 
   if(!user){
    res.status(400)
    throw new Error("User not Found !!!")
   }

   // check if the old password is valid 
   // #validation 

   const PasswordIsCorrect = await bcrypt.compare(oldpassword , user.password );

   if(PasswordIsCorrect){
    user.password = newpassword 
    user.save()
    res.status(200).send("Password changed Successfully!!") 
   }else{
    res.status(400)
    throw new Error("Invalid Password !!!!")
   }
} )

/*********** RESET THE PASSWORD **********/

module.exports = {
  registerUser,
  LoginUser,
  logoutUser,
  getUser,
  LoginStatus,
  updateUser,
  changepassword
};
