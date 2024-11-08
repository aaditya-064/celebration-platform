import mongoose from "mongoose";

const photoSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    imageurl: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const photoModel = mongoose.model("photo", photoSchema);
export default photoModel;
