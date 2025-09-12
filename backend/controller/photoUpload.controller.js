import photoModel from "../model/photo.model.js";
import userModel from "../model/user.model.js";

export const uploadPhoto = async (req, res) => {
  try {
    const user = req.user;
    console.log(req.file);
    const uploadPhoto = await photoModel.create({
      ...req.body,
      userId: user._id,
      name: user.name,
      profilePicture: user.profilePicture,
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

export const myPhotos = async (req, res) => {
  try {
    const user = req.user;
    const photos = await photoModel.find({ userId: user._id });
    res.json(photos);
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const familyMembersPhotos = async (req, res) => {
  try {
    const user = req.user;
    const family_members = await userModel.find({
      _id: { $in: user.familyMembers },
    });

    const membersId = family_members.map((item) => item._id);

    const family_members_photos = await photoModel.find({
      userId: { $in: membersId },
    });
    res.json(family_members_photos);
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export const likePhoto = async (req, res) => {
  try {
    const user = req.user;
    const photoId = req.params.id;
    const photo = await photoModel.findOne({ _id: photoId });
    if (photo.likes.includes(user._id)) {
      const updateLike = await photoModel.findOneAndUpdate(
        { _id: photoId },
        { $pull: { likes: user._id } }
      );
      return res.json(updateLike);
    }
    const updateLike = await photoModel.findOneAndUpdate(
      { _id: photoId },
      { $set: { likes: user._id } }
    );
    res.json(updateLike);
  } catch (err) {
    console.log(err);
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};

export const selectedPhoto = async (req, res) => {
  try {
    // const user = req.user;
    const data = await photoModel.findOne({ _id: req.params.id });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res
      .status(err?.statusCode || 500)
      .json({ success: false, msg: err?.message });
  }
};
