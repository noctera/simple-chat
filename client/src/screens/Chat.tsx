import React, {useEffect} from 'react';
import { useParams } from "react-router";


interface ChatProps {
    socket: any
}

interface ChatParams {
  username: string,
  room: string
}

const Chat = ({socket}: ChatProps) => {
  
  const { username, room } = useParams<ChatParams>();
    useEffect(() => {
    
        socket.on("FromAPI", () => {
        });
    }, [socket]);
  return (
    <div className="chat">
      <p>{username}</p>
      <p>{room}</p>
    </div>
  );
}

export default Chat;