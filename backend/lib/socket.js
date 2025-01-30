const express = require('express')
const http = require('http')
const {Server } = require('socket.io')
const cors  = require('cors');
const { model } = require('mongoose');
const app = express();
app.use(cors());
const server = http.createServer(app)
const io =  new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
io.on('connection',(socket) =>
{
    console.log( `user connected ${socket.id}`)

})

