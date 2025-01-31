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
const users = new Map()
io.on('connection',(socket) =>
  {
    console.log("user coneected")
   socket.on("register",(userId) =>
  {
   
    users.set(userId,socket.id)
    console.log(users)
  })
  socket.on("send",(data) =>
  {
  
    console.log(data)
    const receiverSocektId = users.get(data.receiver)
    console.log(users,receiverSocektId,data.receiver)
    if(receiverSocektId)
    {
      socket.to(receiverSocektId).emit("receive",data)
    }
  })

  socket.on("disconnect" ,() =>
{

  for (let [userId, socketId] of users) {
    if (socketId === socket.id) {
      users.delete(userId);
      console.log(`User ${userId} disconnected and removed from the Map`);
      break;
    }
  }
})

  
  
  })

const port = process.env.PORT || 5000; 
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});