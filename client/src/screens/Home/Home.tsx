import React, {useState, useEffect, useCallback} from 'react';
import { useHistory } from "react-router-dom";
import "./Home.scss"

interface HomeProps {
    socket: any
}

const Home = ({socket}: HomeProps) => {

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");


  const joinChat = useCallback(() => {
    socket.emit("joinRoom", {username, room});
    history.push(`/chat/${room}/${username}`);
  }, [history, room, socket, username]);
  
  return (
    <div className="home">
        <input type="text" placeholder="Username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value);}}/>
        <input type="text" placeholder="Room" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setRoom(e.target.value);}}/>
        <button onClick={joinChat}>Join</button>
    </div>
  );
}

export default Home;