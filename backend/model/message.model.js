import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("messageExchange", messageSchema);
export default messageModel;
