import eventModel from "../model/event.model.js";

export const eventUpload = async (req, res) => {
  try {
    const findEvent = await eventModel.findOne({ title: req.body.title });
    if (findEvent) {
      const err = new Error("EVENT ALREADY EXISTS, PLEASE CREATE A UNIQUE ONE");
      err.statusCode = 400;
      throw err;
    }
    const event = await eventModel.create(req.body);
    res.json({ message: "EVENT CREATED SUCCESSFULLY", event: event });
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const allEventFromUser = async (req, res) => {
  try {
    const findEvent = await eventModel.find({ userId: req.body.userId });
    res.json(findEvent);
  } catch (err) {
    res.status(err?.statusCode).json({ msg: err?.message });
  }
};
