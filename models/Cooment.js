const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
     required: true
    },

    userId: {
      type: String,
      required: true,
    },
     
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

exports.Comment = mongoose.model("Comment", CommentSchema);
