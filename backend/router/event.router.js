import express from "express";
import {
  eventUpload,
  allEventFromUser,
} from "../controller/event.controller.js";

const route = express.Router();

route.post("/upload", eventUpload);
route.get("/get", allEventFromUser);

export default route;
