const express = require("express");
const env = require("dotenv");
const app = express();
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const videoRouter = require('./routes/video.js')
const VideoRouter = require('./routes/video2.js')
const commentRouter = require("./routes/comment.js")
const CookieParser = require("cookie-parser");
const Cors = require("cors")

env.config();
const connectDB = require("./mongodb/connect.js");
const { Video } = require("./models/Video.js");

const port = process.env.PORT || 3000;
app.use(CookieParser());
app.use(Cors());
app.use(express.json());
app.use("/api/user", userRouter.router);
app.use("/api/auth", authRouter.router);
app.use("/api/video", videoRouter.router);
app.use("/api/Video",VideoRouter.router)
app.use("/api/comment", commentRouter.router);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
  next();
});

const startServer = async () => {
  
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, (req,res) => {
       
      console.log(`server is started on the port of  ${process.env.PORT}`); 
    });
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req,res) => res.send("hello i am working completly"));

startServer();
