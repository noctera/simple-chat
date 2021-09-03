import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router";


type ChatProps = {
  socket: any
}

type ChatParams = {
  username: string,
  room: string
}

type MessageProps = {
  userId: any,
  username: string,
  text: string
}

const Chat = ({ socket }: ChatProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const sendMessage = useCallback(() => {
    socket.emit("messageSent", { text });
  }, [socket, text]);

  useEffect(() => {
    socket.on("message", ({ userId, username, text }: MessageProps) => {
      console.log("message received");
      const tempMessage: MessageProps = { userId, username, text };
      setMessages(oldMessage => [...oldMessage, tempMessage]);
    });
  }, [messages, socket]);

  return (
    <div className="chat">
      <input type="text" placeholder="Message" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value); }} />

      <button onClick={sendMessage}>Send</button>
      {messages.map((message) => (
        <div>
          <p>{message.username}</p>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Chat;