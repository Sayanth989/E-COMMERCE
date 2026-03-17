// const { urlencoded } = require('express');
import User from "../../models/User.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    // get data from request body
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "fill the fields first" });
    }

    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res.status(400).json({ msg: "email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      msg: "Account created successfully",
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log("error on signup.js");
    res.status(500).json({ msg: err.message });
  }
};

export default signup;