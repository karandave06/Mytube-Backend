const { Comment } = require("../models/Cooment.js");
const {Video} = require("../models/Video.js");

// add comment

exports.addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body});
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

// delete comment

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);

    if (req.user.id === comment.userId || req.params.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).send("Comment has been delated!");
    } else {
      res.send("Your can delete only your comment.");
    }
  } catch (error) {
    next(error);
    console.log(error)
  }
};

// get comment

exports.getComments = async (req, res, next) => {
  try {
    const comment = await Comment.find({ videoId: req.params.videoId }).sort({ _id: -1 });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
