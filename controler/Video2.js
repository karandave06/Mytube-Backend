const { User } = require("../models/User.js");
const model = require("../models/Video.js"); 
const Video = model.Video;
 
exports.gateVideo = async (req, res, next) => {

  res.status(200).json("working ")

  console.log(user);
};
 
exports.postVideo = async (req, res, next) => {
  const id = req.params.id;

  const video = await Video.findById(id);

 
  // const user = await Video.findById(id);
  // if(user) {
  //   console.log("founded")
  //   res.status(200).json("suscess")
  // }
  // else{
  //   console.log("can not find..")
  //   res.status(500).json("failura")

  // }
  
};
 