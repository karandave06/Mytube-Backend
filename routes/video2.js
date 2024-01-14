const express = require("express");
const { verifyToken } = require("../verifyToken");
const router = express.Router(); 
const {gateVideo, postVideo} = require("../controler/Video2.js")
   
router.get("/",gateVideo)
router.get("/Find/:id",postVideo)
exports.router = router;