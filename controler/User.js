const modle = require("../models/User.js");
const video = require("../models/Video.js");

const User = modle.User;
const Video = video.Video;

exports.update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const UpdatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.json(UpdatedUser);
      
    } catch (error) {
      next(error);
    }
  } else {
    res.status(500).send("You can update only your account!");
  }
};

exports.delate = async (req, res, next) => {
  const reqId = req.params.id;
  if (reqId === req.user.id) {
    try {
      await User.findByIdAndDelete(reqId);

      res.send("User has been Delated successfully");
    } catch (error) {
      next(error);
    }
  } else {
    res.status(500).send("You can delate only your account!");
  }
};

exports.getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {}
};
exports.suscribe = async (req, res, next) => {
  try {
    const id = req.body.token;

    await User.findByIdAndUpdate(id, {
      $push: { suscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { suscribers: 1 },
    });

    res.status(200).json("Subscription successfull.");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
exports.unsuscribe = async (req, res, next) => {
  const id = req.body.token;
 
  try {
    await User.findByIdAndUpdate(id, {
      $pull: { suscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { suscribers: -1 },
    });

    res.status(200).json("Unsubscription successfull.");
  } catch (error) {}
};

exports.like = async (req, res, next) => {
  const id = req.user.id;
 
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

exports.like2 = async (req, res, next) => {
  const id = req.params.Id;
  
  res.send("workings");
  try {
    const user = await Video.findById(id);

    await Video.findByIdAndUpdate(id, {
      $addToSet: { likes: req.body.token },
      $pull: { dislike: req.body.token },
    });
    res.status(200).json("The video has been liked.");
  } catch (error) {}
};

exports.dislike2 = async (req, res, next) => {
  const id = req.params.Id;
   
  res.send("workings");
  try {
    const user = await Video.findById(id);
    

    await Video.findByIdAndUpdate(id, {
      $addToSet: { dislike: req.body.token },
      $pull: { likes: req.body.token },
    });
    res.status(200).json("The video has been liked.");
  } catch (error) {}
};

exports.dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.user.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSe: { likes: id },
      $pull: { dislike: id },
    });

    res.status(200).json("Video has been unliked.");
  } catch (error) {
    next(error);
  }
};
