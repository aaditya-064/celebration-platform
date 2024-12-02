import express from "express";
import config from "./config/config.js";
import db from "./config/db.js";
import userRouter from "./router/user.router.js";
import eventRouter from "./router/event.router.js";
import photoRouter from "./router/photo.router.js";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import tikaModel from "./model/tikaExchange.model.js";

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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/event/", eventRouter);
app.use("/api/v1/photo/", photoRouter);
app.use("/uploads", express.static("uploads"));

// Socket.io
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data.room);
//   });

//   socket.on("send_message", (data) => {
//     io.to(data.room).except(socket.id).emit("receive_message", data);
//     console.log(data);
//   });
// });

io.on("connection", (socket) => {
  console.log("What is socket: ", socket);
  console.log("Socket is active");

  socket.on("chat", (payload) => {
    console.log("what is payload: ", payload);
    io.emit("chat", payload);
  });
});

db.then(() => {
  console.log("DATABASE CONNECTED");
}).catch((err) => {
  console.log(err);
});

server.listen(
  config.PORT,
  console.log(`SERVER IS RUNNING AT PORT ${config.PORT}`)
);
