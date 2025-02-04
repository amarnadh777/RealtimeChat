const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./config/db");

dotenv.config();
connect();

const app = express();

app.use(cors());
app.use(express.json());

const authRoute = require("./routes/authRoutres");
const messageRoute = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/auth", authRoute);
app.use("/message", messageRoute);
app.use("/user", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("register", (userId) => {
    users.set(userId, socket.id);
    console.log(`User registered: ${userId}`);

    // Broadcast updated online users list
    io.emit("onlineUsers", Array.from(users.keys()));
  });

  socket.on("send", (data) => {
    const receiverSocketId = users.get(data.receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive", data);
    }
  });
  io.emit("onlineUsers", Array.from(users.keys()));
  socket.on("typing",(data) =>
  {
    const receiverSocketId = users.get(data.receiver);
    if (receiverSocketId) {
     
      io.to(receiverSocketId).emit("typing", {sender:data.sender});
    }
    
   
  })
  socket.on("disconnect", () => {
    let disconnectedUser = null;

    for (let [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        disconnectedUser = userId;
        users.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }

  
   
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
