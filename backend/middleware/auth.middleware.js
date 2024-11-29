import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerMiddleware = async (req, res, next) => {
  try {
    const findUser = await userModel.findOne({ email: req.body.email });
    if (findUser) {
      const err = new Error("User Already Exists");
      err.statusCode = 500;
      throw err;
    }
    next();
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};

export const loginMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      const err = new Error("USER NOT FOUND");
      err.statusCode = 404;
      throw err;
    }
    req.user = user;
    next();
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};

export const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, config.JWT_SECRET);
    if (!verifyToken) {
      const err = new Error("INVALID TOKEN");
      err.statusCode = 400;
      throw err;
    }
    const user = await userModel.findById(verifyToken.userId);
    req.user = user;
    next();
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};
