import express from "express";
import multer from "multer";
import { checkToken } from "../middleware/auth.middleware.js";
import {
  uploadPhoto,
  myPhotos,
  familyMembersPhotos,
  likePhoto,
  selectedPhoto,
} from "../controller/photoUpload.controller.js";

const route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pictures/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

route.post("/upload/photo", upload.single("image"), checkToken, uploadPhoto);
route.get("/get/photos", checkToken, myPhotos);
route.get("/get/family-photos", checkToken, familyMembersPhotos);
route.patch("/like/:id", checkToken, likePhoto);
route.get("/photo/:id", checkToken, selectedPhoto);

export default route;
