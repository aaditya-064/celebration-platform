import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  allUser,
  addFamily,
  familyMembers,
  individualUser,
  searchUser,
  removeFamily,
  editUser,
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

route.post("/register", registerMiddleware, registerUser);
route.post("/login", loginMiddleware, loginUser);
route.get("/all-user", allUser);
route.patch(
  "/edit-user",
  upload.single("profilePicture"),
  checkToken,
  editUser
);
route.post("/add/family/:familyId", checkToken, addFamily);
route.get("/get/family", checkToken, familyMembers);
route.get("/get-user", checkToken, individualUser);
route.get("/search-user/:email", checkToken, searchUser);
route.delete("/remove-family/:id", checkToken, removeFamily);

export default route;
