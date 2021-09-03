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

io.on("connection", (socket: any) => {
  require('./sockets/joinUser')(io, socket);
  require('./sockets/sendMessage')(io, socket);
  require('./sockets/disconnect')(io, socket);
});




