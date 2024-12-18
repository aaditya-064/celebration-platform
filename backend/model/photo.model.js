import mongoose from "mongoose";

const photoSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    imageUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    description: {
      type: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const photoModel = mongoose.model("photo", photoSchema);
export default photoModel;
