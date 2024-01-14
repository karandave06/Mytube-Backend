const express = require("express");
const { verifyToken } = require("../verifyToken.js");
const { addComment, deleteComment, getComments } = require("../controler/Comments");

const router = express.Router();

router.post("/",addComment)
router.delete("/:id",verifyToken,deleteComment)
router.get("/:videoId",getComments) 

exports.router = router