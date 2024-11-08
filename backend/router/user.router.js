import express from "express";
import {
  loginUser,
  registerUser,
  allUser,
  addFamily,
} from "../controller/auth.controller.js";
import {
  loginMiddleware,
  registerMiddleware,
  checkToken,
} from "../middleware/auth.middleware.js";
import multer from "multer";

const route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

route.post(
  "/register",
  upload.single("profilePicture"),
  registerMiddleware,
  registerUser
);

route.post("/login", loginMiddleware, loginUser);
route.get("/allUser", allUser);
route.post("/add/family", checkToken, addFamily);

export default route;
