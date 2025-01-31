
const userModel = require('../models/userModel');
const  bcrypt = require('bcryptjs')

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 🔴 FIXED: Return 409 Conflict for duplicate emails
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ fullName, email, password: hashPassword });
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
const signIn = async(req,res) =>
{
    
    const { email, password } = req.body;

    try {
        if (!email|| !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
        
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  

  
      res.status(200).json({
        _id:user._id,
        fullName: user.fullName,
        email: user.email,
        profileImg: user.profileImg,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = {signup,signIn}