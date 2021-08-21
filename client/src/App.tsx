import React from 'react';
import { BrowserRouter , Switch, Route, Redirect } from "react-router-dom";
import './App.scss';
import { useEffect } from 'react';

import Home from "./screens/Home/Home";
import Chat from "./screens/Chat/Chat";

const socketIOClient = require("socket.io-client");


const socket = socketIOClient();

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <div className="inner-wrapper">
          <Switch>
            <Route path="/home">
              <Home socket={socket}/>
            </Route>
            <Route path="/chat/:room/:username">
              <Chat socket={socket} />
            </Route>
            <Route path="/">
                <Redirect to="/home" />
              </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
