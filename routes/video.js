const express = require("express");
const { verifyToken } = require("../verifyToken");
const router = express.Router();
const {
  addVideo,
  updateVideo,
  search,
  gateVideo,
  deleteVideo,
  addViews,
  trend,
  random,
  sub,
  getByTag,
  getSubvideo,
} = require("../controler/Video.js");
// const {gateVideo} = require("../controler/Video2.js")
// create a video
router.post("/", addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", gateVideo);
router.put("/view/:id", addViews);
router.get("/trand", trend);
router.get("/random", random);
router.post("/sub", sub);
router.get("/tags", getByTag);
router.get("/search", search); 
// router.get("/get",gateVideo)
exports.router = router;
