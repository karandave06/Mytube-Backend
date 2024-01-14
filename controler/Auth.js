const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const model = require("../models/User.js");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const User = model.User;
exports.signup = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({ ...req.body, password: hash });

  await newUser
    .save()
    .then(() => res.status(200).json(newUser))
    .catch((error) => res.status(500).send(error));
};

exports.signin = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      const { password, ...other } = user._doc;
      if (isCorrect) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.cookie("access_token", token, { httpOnly: true });
        res.status(200).json({ token: token, other });
      } else {
        res.send("wrond password plase try again");
      }
    } else {
      res.status(400).josn("user not found");
    }
  } catch {
    res.status(400).send("user not found");
  }
};

exports.getDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      const { password, ...other } = user._doc;
      if (isCorrect) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.cookie("access_token", token, { httpOnly: true });
        res.status(200).json({ token: token, other });
      } else {
        res.send("wrond password plase try again");
      }
    } else {
      res.send("user not found");
    }
  } catch {
    res.status(400).send("user not found");
  }
};

exports.google = async (req, res) => {
  try {
    const newUser = await User.findOne({ email: req.body.email });
    if (newUser) {
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
      // res.cookie("access_token", token, { httpOnly: true });
      const { password, ...other } = newUser._doc;
      console.log(other);
      res.status(200).json({ token: token, other });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.email,
        img: req.body.img,
        fromGoogle: true,
      });

      const { password, ...other } = newUser._doc;
      
      const savedUser = await newUser
        .save()
        .then((res) => console.log("saved........"))
        .catch((err) => console.log(err));
      
      res.status(200).json(other);
    }
  } catch {
    res.status(500).send("not founded");
  }
};
