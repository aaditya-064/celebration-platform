import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { messageHandler } from "./messageHandler.js";

export const socketConnect = (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: config.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    io.use(async (socket, next) => {
      try {
        const token = socket?.handshake.auth?.token;
        if (!token) return console.log("TOKEN NOT FOUND");

        const decoded = jwt.verify(token, config.JWT_SECRET);
        socket.user = decoded;

        next();
      } catch (err) {
        next(new Error("Authentication error"));
        console.log("Authentication Error");
      }
    });

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.user.userId}`);

      socket.on("join-event", (data) => {
        const room = `event: ${data.eventId}`;
        socket.join(room);
        console.log(`User ${socket.user.userId} joined event ${data.eventId}`);
      });

      messageHandler(io, socket);

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.user.userId}`);
      });
    });
    return io;
  } catch (err) {
    console.log(err);
  }
};
