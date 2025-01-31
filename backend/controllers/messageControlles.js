const { getSocketIdbyUserId } = require("../lib/socket");
const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");
const getMessageBtw = async (req, res) => {
  const { senderId, receiverId } = req.body;
  
  try {
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const messages = await messageModel
      .find({
        $or: [
          { sender:senderId, receiver:receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      })
      .sort({
        createdAt: 1,
      });
      res.status(200).json(messages);
  } catch (error) {}
};
const sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    if (!sender || !receiver || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sender = await userModel.findById(sender);
  

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }
    const receiver = await userModel.findById(receiver);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    const newMessage = new messageModel({
      sender: sender,
      receiver: receiver,
      message,
    });
    await newMessage.save();

  
    res.json(newMessage);
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = { sendMessage ,getMessageBtw};
