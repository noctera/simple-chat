const path = require('path');
const http = require("http");
const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");

const routes = require("./routes/index.ts")


app.use(cors());
app.use('/', routes);
app.use(express());

const port = 8000;

app.use(cors());

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
  )
);

const io = socket(server);

//initializing the socket io connection 

io.on("connection", (socket) => {
    console.log("user connected");

    //when the user exits the room
    socket.on("disconnect", () => {
        console.log("user disconnected")
    });
});




