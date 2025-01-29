const express = require("express");
const app = express();
const port = 3000;
const authRoute = require("./routes/authRoutres");
const messageRoute = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./config/db");
connect();
app.use(
  cors({
    origin: "*", // Allow all domains (use a specific domain in production for security)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // 👈 Allow frontend origin
    methods: ["GET", "POST"],
  },
});
let users = {};

io.on("connection", (socket) => {
  userId = socket.handshake.query.userId;
  console.log(userId);
  if (userId) {
    users[userId] = socket.id;
  }
  console.log(users);
  io.emit("onlinePeoples", Object.keys(users));
  socket.on("disconnect",() =>
{
    console.log("user disconnected")
   
})
});



app.use(express.json());

app.use("/auth", authRoute);
app.use("/message", messageRoute);
app.use("/user", userRoutes);
server.listen(port, () => {
  console.log("server  is runnig at " + port);
});
