import eventModel from "../model/event.model.js";
import messageModel from "../model/message.model.js";

export const messageHandler = (io, socket) => {
  try {
    socket.on("send-message", async (data) => {
      try {
        const { eventId, message } = data;

        console.log(eventId, message);
        //verify user is participant
        const event = await eventModel.findById(eventId);
        if (!event || !event.participants.includes(socket.user.userId)) {
          socket.emit("error", {
            message: "Not authorized to send messages",
          });
          return;
        }

        const message_db = await messageModel.create({
          eventId,
          senderId: socket.user.userId,
          message,
        });

        io.to(`event: ${eventId}`).emit("new-message", message_db);
        console.log("message", message_db);
      } catch (err) {
        socket.emit("error", { message: "Error sending message" });
      }
    });
  } catch (err) {
    socket.emit("error", { message: "Error sending data" });
  }
};
