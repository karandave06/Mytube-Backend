const { User } = require("../models/User.js");
const { Video } = require("../models/Video.js");
const NodeCache = require("node-cache");
//  add Video -------------------

exports.addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.body.token, ...req.body });

  try {
    const saveVideo = await newVideo.save();
    res.status(200).json("video send suscessfully");
  } catch (error) {
    next(error);
    console.log(error);
  }
};

//  update Video -------------------

exports.updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.send(404).send("Video not found");

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findById(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return res.status(403).send("You can update only your video");
    }
  } catch (error) {
    next(error);
  }
};

exports.gateVideo = async (req, res, next) => {
  const id = req.params.id;

  const video = await Video.findById(id);

  res.status(203).json(video);
};

//  delete Video -------------------

exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.send(404).send("Video not found");

    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("video has been delated success fully");
    } else {
      return res.status(403).send("You can delate only your video");
    }
  } catch (error) {
    next(error);
  }
};

//  add Views -------------------

exports.addViews = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { videoViews: 1 },
    });

    res.status(200).josn("The view has been increased");
  } catch (error) {
    next(error);
  }
};

//  random videos-------------------
const nodeCache = new NodeCache();
exports.random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

    let VideoCache;
    if (nodeCache.has("videos")) {
      VideoCache = JSON.parse(nodeCache.get("videos"));
    } else {
      VideoCache = await Video.aggregate([{ $sample: { size: 40 } }]);
      nodeCache.set("videos", JSON.stringify(VideoCache));
    }

    res.status(200);
    res.send(VideoCache);
 
  } catch (error) {
    next(error);
    console.log(error);
  }
};

//  trends -------------------

exports.trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ videoViews: -1 });
    res.status(200).josn(videos);
  } catch (error) {
    next(error);
  }
};

//  suscribe -------------------

exports.sub = async (req, res, next) => {
  const id = req.body.body;
  
  try {
    const user = await User.findById(id);
    const suscribedChannels = user.suscribedUsers;
    const list = await Promise.all(
      suscribedChannels.map((channelId) => Video.find({ userId: channelId }))
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

//  getByTag -------------------

exports.getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(25);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
//  search -------------------

exports.search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
