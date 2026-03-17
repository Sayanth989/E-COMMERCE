// routes/auth.js (example)

// const express = require("express");
// const router = express.Router();
//\ const User = require("../models/User");
// const signup = require('../controllers/auth/signup')
// const login = require('../controllers/auth/login')

// router.post('/signup',signup)
// router.post('/login',login)

// module.exports = router;

import express from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout",logout)

export default router;