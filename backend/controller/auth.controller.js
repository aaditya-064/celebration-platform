import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : "",
    });
    res.status(201).json({ message: "REGISTERD SUCCESSFULLY", user });
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = req.user;
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      const err = new Error("PASSWORD INCORRECT");
      err.statusCode = 400;
      throw err;
    }
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRTY_DATE || "1d",
    });
    res.json({ msg: "LOGGED IN SUCCESSFULLY", token: token });
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const allUser = async (req, res) => {
  try {
    const allUser = await userModel.find().populate("familyMembers");
    res.json(allUser);
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const addFamily = async (req, res) => {
  try {
    const userId = req.user._id;
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};
