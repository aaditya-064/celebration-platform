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
    res
      .status(201)
      .json({ success: true, message: "REGISTERD SUCCESSFULLY", user });
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
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
    res.status(201).json({ msg: "LOGGED IN SUCCESSFULLY", token: token });
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};

export const allUser = async (_, res) => {
  try {
    const allUser = await userModel.find().populate("familyMembers");
    res.json(allUser);
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};

export const individualUser = async (req, res) => {
  try {
    const user = req.user;
    const findUser = await userModel.findOne({ _id: user._id });
    res.json(findUser);
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};

export const addFamily = async (req, res) => {
  try {
    const userId = req.user._id;
    const memberId = req.params.familyId;
    // const user = await userModel.find({ _id: userId });
    if (req.user.familyMembers.includes(memberId)) {
      const err = new Error("FAMILY MEMBER ALREADY EXISTS");
      err.statusCode = 400;
      throw err;
    }
    const newUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { familyMembers: memberId } },
      { new: true }
    );
    const memberUpdate = await userModel.findOneAndUpdate(
      { _id: memberId },
      { $addToSet: { familyMembers: userId } },
      { new: true }
    );
    res.json({ newUser, memberUpdate });
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};

export const familyMembers = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findOne({ _id: userId });
    const familyMembers = await userModel.find({
      _id: { $in: user.familyMembers },
    });
    res.json(familyMembers);
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};
