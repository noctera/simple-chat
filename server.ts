const path = require('path');
const http = require("http");
const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");

import {joinUser, getUserById, disconnectUser} from "./utils/users";

const routes = require("./routes/index")


app.use(cors());
app.use('/', routes);

const port = 8000;

app.use(cors());

const server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
  )
);

const io = socket(server);

//initializing the socket io connection 

interface joinRoomProps {
  username: string,
  room: string
}

interface messageSentProps {
  message: string
}

io.on("connection", (socket: any) => {
    console.log("user connected");
    socket.on("joinRoom", ({username, room}: joinRoomProps) => {
      const tempUser = joinUser(socket.id, username, room);

      // send message to user who joined
      socket.emit("message", {
        userId: tempUser.id,
        username: tempUser.name,
        text: `You are now in the ${tempUser.room} room`
      })

      //send notify message to other users that are in the same room
      socket.broadcast.to(tempUser.room).emit("message", {
        userId: tempUser.id,
        username: tempUser.name,
        test: `${tempUser.name} has joined the chat`
      })
    })

    socket.on("messageSent", ({message}: messageSentProps) => {
      //find username by the socket id
      const tempUser = getUserById(socket.id);

      io.broadcast.to(tempUser.room).emit("message", {
        userId: tempUser.id,
        username: tempUser.name,
        text: message
      })
    })

    //when the user exits the room
    socket.on("disconnect", () => {
        const tempUser = disconnectUser(socket.id);

        if(tempUser) {
          io.broadcast.to(tempUser.room).emit("message", {
            userId: tempUser.id,
            username: tempUser.name,
            text: `${tempUser.name} left the chat`
          })
        }
        
    });
});




