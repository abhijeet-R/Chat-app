const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const  authRoutes  = require("./routes/auth")
const  messageRoutes  = require("./routes/messages")
const socket = require("socket.io")

const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log(`connected to database`);
}).catch((err)=>{
    console.log(err.message)
})

const server = app.listen(process.env.PORT,() => {
    console.log(`server connected to port ${process.env.PORT}`)
})
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});