const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        },
        message: (props) => `${props.value} email is not valide`,
      },
      required: true,
    },
    password: { type: String, minLength: 6, required: true },
    fromGoogle: {
      type: Boolean,
      default: false,
    },

    img: {
      type: String,
    },
    suscribers: {
      type: Number,
      default: 0,
    },
    suscribedUsers: {
      type: [String],
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model("user", User);
