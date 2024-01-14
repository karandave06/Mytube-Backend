const express = require("express");
const {update,delate,unsuscribe,suscribe,like,dislike,getUser, like2, dislike2} = require("../controler/User.js");
const { verifyToken } = require("../verifyToken.js");
const router = express.Router();
 
 
// update user
router.put("/:id",verifyToken,update)

// delate user
router.delete("/:id",verifyToken,delate)

// get user
router.get("/find/:id",getUser)

// suscribe user
router.put("/sub/:id",suscribe)

// unsuscribe user 
router.get("/unsub/:id",unsuscribe)

// like a video
router.put("/like/:videoId",verifyToken,like)
router.put("/like2/:Id",like2)

// dislike a video
router.put("/dislike/:videoId",verifyToken,dislike)
router.put("/dislike2/:Id",dislike2)

exports.router = router;