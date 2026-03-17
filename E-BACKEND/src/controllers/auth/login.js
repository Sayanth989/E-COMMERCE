// const User = require('../../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require ('jsonwebtoken');


 
// const login = async (req,res)=>{

//     try{
//         const {email,password} = req.body;
        
//         if(!email || !password){
//             return res.status(400).json({msg:'please fill the fields'});
//         }

//         //check if user exitsss
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(400).json({msg:'Email not found'})
//         }
          
//          //check the password
//         const isMatch = await bcrypt.compare(password,user.password)
//         if(!isMatch){
//             return res.status(400).json({msg:'Invalid password'});
//         }


//         // req.session.user={
//         //     id: user._id,
//         //     role:user.role,
//         // };
//         const token = jwt.sign(
//     {id:user._id,role:user.role},
//      process.env.JW,
//     {expiresIn:'5d'});


//         return res.status(200).json({
//            msg:'login successful',
//            token,
//            user:{id: user._id }
//                  });
//     }
//     catch(err){
//         return res.status(500).json({msg: err.message});
//     }
// };

// module.exports = login;
import dotenv from "dotenv";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const login = async (req, res) => {
  try {
    // step 1 - get data from request body
    const { email, password } = req.body;

    // step 2 - check all fields are filled
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    // step 3 - check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email not found" });
    }

    // step 4 - check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    // step 5 - create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // step 6 - send response
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export default login;