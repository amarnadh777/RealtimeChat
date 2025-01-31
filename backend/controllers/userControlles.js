const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const getUserList = async (req, res) => {
    try {
     
      const { loggedInUserId } = req.body;
  
 
      if (!loggedInUserId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
  
      const user = await userModel.find({_id: { $ne:loggedInUserId}}).select("email fullName")
    
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
      return res.status(200).json(user);
  
    } catch (error) {
      console.error("Error in getUserList:", error.message);
     
    }
  };
module.exports = {getUserList}