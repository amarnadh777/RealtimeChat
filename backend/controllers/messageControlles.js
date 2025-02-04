const { getSocketIdbyUserId } = require("../lib/socket");
const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");
const cloudinary = require("../config/cloudinary")
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


  try {

    const { sender, receiver, message } = req.body;
    console.log(req.body)
    console.log(sender, receiver, message)
    if (!sender || !receiver) {
      console.log("all fie")
      return res.status(400).json({ message: "All fields are required" });
    }


    const Issender = await userModel.findById(sender);
  

    if (!Issender) {
      return res.status(404).json({ message: "Sender not found" });
    }
    const Isreceiver = await userModel.findById(receiver);
    if (!Isreceiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    let imgUrl = null ; 
    if(req.file) 
    {
      const result = await cloudinary.uploader.upload(req.file.path)
      image = result.secure_url
    }
    const newMessage = new messageModel({
      sender: sender,
      receiver: receiver,
      message,
      image
    });
    await newMessage.save();

  
    res.json(newMessage);
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = { sendMessage ,getMessageBtw};
