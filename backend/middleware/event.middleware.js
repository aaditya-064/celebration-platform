import express from "express";
import eventModel from "../model/event.model";
import userModel from "../model/user.model";
import jwt from "jsonwebtoken";

export const isFriend = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(verifyToken.userId);
    req.user = user;
    next();
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};
