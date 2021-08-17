import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import './App.css';
import { useEffect } from 'react';

import Home from "./screens/Home";
import Chat from "./screens/Chat";

const socketIOClient = require("socket.io-client");

const socket = socketIOClient();

function App() {

  return (
    <HashRouter>
      <div className="App">
      <Switch>
        <Route path="/">
          <Home socket={socket} />
        </Route>
        <Route path="/chat/:roomname/:username">
          <Chat socket={socket} />
        </Route>
      </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
