const mongoose = require("mongoose");

const messageSchmea = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);
const messageModel  = mongoose.model("Message",messageSchmea)
module.exports = messageModel   
