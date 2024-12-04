import express from "express";
import {
  eventUpload,
  allEventFromUser,
  joinEvent,
  unjoinedFamilyEvents,
} from "../controller/event.controller.js";
import { getEventMessages } from "../controller/message.controller.js";

import { checkToken } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/upload", checkToken, eventUpload);
route.get("/get", checkToken, allEventFromUser);
route.post("/:eventId/join", checkToken, joinEvent);
route.get("/unjoined-events", checkToken, unjoinedFamilyEvents);

route.get("/:eventId/messages", checkToken, getEventMessages);

export default route;
