import messageModel from "../model/message.model.js";
import eventModel from "../model/event.model.js";

export const getEventMessages = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await eventModel.findById(eventId);
    if (!event || !event.participants.includes(userId)) {
      return res
        .status(403)
        .json({ message: "Not authorized to view messages" });
    }

    const messages = await messageModel
      .find({ eventId })
      .populate("senderId")
      //   .select("name email profilePicture")
      .sort("createdAt");
    console.log(messages);
    res.json(messages);
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};
