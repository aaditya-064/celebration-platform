import photoModel from "../model/photo.model.js";

export const uploadPhoto = async (req, res) => {
  try {
    const user = req.user;
    console.log(req.file);
    const uploadPhoto = await photoModel.create({
      ...req.body,
      userId: user._id,
      imageUrl: `/uploads/pictures/${req.file.filename}`,
    });
    console.log(
      req.file ? `/uploads/pictures/${req.file.filename}` : "NOT FOUND"
    );
    res.json(uploadPhoto);
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const allPhotos = async (req, res) => {
  try {
    const user = req.user;
    const photos = await photoModel.find({ userId: user._id });
    res.json(photos);
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};
