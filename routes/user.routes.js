const express = require("express");
const { userModel } = require("../models/user.model");
var jwt = require("jsonwebtoken");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        console.log("Err", err);
      } else {
        const user = new userModel({ name, email, password: hash });
        await user.save();
        res.send("Signup Success");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("user signup Failed");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async function (err, result) {
        if (result) {
          const token = jwt.sign({ foo: "bar" }, "masai");

          res.send({ login: "Login Success", token: token });
        } else {
          res.send("Login Failed");
        }
      });
    } else {
      res.send("No User Found");
    }
  } catch (error) {
    console.log(error);
    res.send("user signup Failed");
  }
});

module.exports = { userRouter };
