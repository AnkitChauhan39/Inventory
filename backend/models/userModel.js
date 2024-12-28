const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter a email"],
      unique: true,
      trim: true,
      match: [
        /^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/i,
        "Please Enter a valid email",
      ],
    },
    password: {
      type: String,
      require: [true, "Please  enter the Password "],
      minLength: [6, "Password too short!! Not less than 6 characters"],
    },
    photo: {
      type: String,
      // required:[true,"Please Enter a Photo"],
      default: "",
    },
    phone: {
      type: String,
      default: "+91",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio too large!! Not more than 250 characters"],
      default: "",
    },
  },
  {
    timespamps: true,
  }
);

// encrypt password before saving it to the data base 
// userSchema.pre("save", async (next) => {
//   if (!this.isModified("password")) {
//     return next();
//   }

//   //encrypt Password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
// });
// above code will give error that this.modified is not defined 
//  the reason being 
// This can happen if you use an arrow function (=>) instead of a regular function. Arrow functions do not bind their own this but inherit it from the parent scope, which might not be the document.

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  //encrypt Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword
  next()
});

const User = mongoose.model("User", userSchema);
module.exports = User;
