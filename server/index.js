const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const socket = require("socket.io");

const userRoutes = require('./src/routes/auth.js')
const messageRoutes = require('./src/routes/message.js')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    const server = app.listen(8080, () => {
      console.log(`server started at 8080 port`)
    })

    const io = socket(server, {
      cors: {
        origin: "https://chatapp-as.netlify.app",
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

  } catch (error) {
    console.log(error)
  }
}

start()
