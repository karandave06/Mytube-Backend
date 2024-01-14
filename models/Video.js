const mongoose =require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoViews: {
      type: Number,
      default:0,
    },
    tags: {
      type:[String],
      default:[],
    },
    likes: {
      type: [String],
      default:[],
    },
    dislike:{
        type:[String],
        default:[],
    }
  },
  { timestamps: true }
);

exports.Video = mongoose.model("Video", VideoSchema);
