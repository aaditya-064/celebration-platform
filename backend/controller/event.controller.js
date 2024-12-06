import eventModel from "../model/event.model.js";
import userModel from "../model/user.model.js";

export const eventUpload = async (req, res) => {
  try {
    // const findEvent = await eventModel.findOne({ title: req.body.title });
    // if (findEvent) {
    //   const err = new Error("EVENT ALREADY EXISTS, PLEASE CREATE A UNIQUE ONE");
    //   err.statusCode = 400;
    //   throw err;
    // }
    const event = await eventModel.create({
      ...req.body,
      userId: req.user._id,
      participants: req.user._id,
      created_by: req.user.name,
    });
    res.json({ message: "EVENT CREATED SUCCESSFULLY", event: event });
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const eventParticipants = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventModel.find({ _id: eventId });
    const participants = event[0].participants;
    const users = await userModel.find({ _id: { $in: participants } });
    res.json(users);
  } catch (err) {
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const user = req.user;
    const findEvent = await eventModel.findOne({ _id: req.params.eventId });
    if (findEvent.participants.includes(user._id))
      return res.json({ msg: "YOU ARE ALREADY IN THE EVENT" });
    if (user.familyMembers.includes(findEvent.userId)) {
      const event = await eventModel.findOneAndUpdate(
        { _id: req.params.eventId },
        { $addToSet: { participants: user._id } },
        { new: true }
      );
      res.json({ msg: "JOINED THE EVENT SUCCESSFULLY", event: event });
    } else {
      return res.json({
        msg: "PLEASE ADD THE EVENT CREATER TO JOIN THE EVENT",
      });
    }
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const allEventFromUser = async (req, res) => {
  try {
    const user = req.user;
    const findEvent = await eventModel
      .find({
        participants: { $in: user._id },
      })
      .populate("userId");
    res.json(findEvent);
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const unjoinedFamilyEvents = async (req, res) => {
  try {
    const user = req.user;
    const membersEvent = await eventModel.find({
      userId: { $in: user.familyMembers },
      participants: { $ne: user._id },
    });
    res.json(membersEvent);
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};
