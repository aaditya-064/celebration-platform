import express from "express";
import config from "./config/config.js";
import db from "./config/db.js";
import userRouter from "./router/user.router.js";
import eventRouter from "./router/event.router.js";
import photoRouter from "./router/photo.router.js";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import { socketConnect } from "./socket/socket.js";

var whitelist = ["http://localhost:5173", null];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
const server = http.createServer(app);

const io = socketConnect(server);

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/event/", eventRouter);
app.use("/api/v1/photo/", photoRouter);
app.use("/uploads", express.static("uploads"));
app.set("io", io);

db.then(() => {
  console.log("DATABASE CONNECTED");
}).catch((err) => {
  console.log(err);
});

server.listen(
  config.PORT,
  console.log(`SERVER IS RUNNING AT PORT ${config.PORT}...`)
);
