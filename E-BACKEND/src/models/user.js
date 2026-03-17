// const mongoose = require('mongoose');


// const userShema = new mongoose.Schema({
//     name:{
//         type :String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true
//     },
//     password:{
//         type:String,
//         required:[true,'passwrod is required']
         
//     },
//     role:{
//         type:String,
//         enum:["user","admin"],
//         default:"user"
//     }
// },
// {
//     timestamps:true

// });

// //then hash the password
// //const user = new User({ password: "123456" });
// //await user.save();

// // userShema.pre('save',async function(next){

// //     if(!this.isModified("password")) return next();

// //     this.password = await bcrypt.hash(this.password,10);
// //     next();
// // });

// // //compare the password
// // userShema.method.matchPassword = async function(enterd){
// //     return await bcrypt.compare.apply(enterd,this.password);
// // }


// const User = mongoose.model('User',userShema)
// module.exports = User;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: [true, "password is required"]
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;