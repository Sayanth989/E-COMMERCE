import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { MongoStore } from "connect-mongo";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import router from "./routes/cartRoutes.js";

import Orderrouter from "./routes/orderRoutes.js";



dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use('/api/cart',router)

app.use('/api/orders',Orderrouter)

/*
app.use(
  session({
    secret: process.env.SESSION_SEC,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 1000 * 600,
      httpOnly: true,
      secure: false,
    },
  })
);
*/

app.get("/", (req, res) => {
  res.json({ msg: "server is running" });
});

const check = process.env.PORT || 3000;

app.listen(check, () => console.log(`server running ${check}`));