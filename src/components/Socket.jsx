import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Socket.css";
import { RiWechat2Line } from "react-icons/ri";

const socket = io("http://192.168.215.111:3000");

function Socket() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const endRef = useRef();

  function sendMessage(){
    if(username && message){
        socket.emit("message",{username,message})
        setMessage("");
    }
  }

  useEffect(()=>{
    socket.on("message",(data)=>{
        setChat((prev)=>{
            return[...prev,data]
        })
    })
  },[])

 

  function formatTime(t){
    if(t)
      {
        return new Date(t).toLocaleTimeString();
      } 
      else
      {
        return "";
      }
  }

  return (
    <div className="chat-container">
      <h2><RiWechat2Line /> WhosUP</h2>
      <ul className="chat-list">
        {chat.map((e, i) => (
          <li key={i} className={e.username === username ? "user" : "stranger"}>
            <div>
              <strong>{e.username}</strong>: {e.message}
              <div className="timestamp">{formatTime(e.time)}</div>
            </div>
          </li>
        ))}
        <div ref={endRef} />
      </ul>
      <input
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} >Send</button>
    </div>
  );
}

export default Socket;
