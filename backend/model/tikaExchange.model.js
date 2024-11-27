import mongoose from "mongoose";

const tikaSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const tikaModel = mongoose.model("tikaExchange", tikaSchema);
export default tikaModel;
