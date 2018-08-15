import React, { Component } from "react";
import Message from "./Message.jsx";

const MessageList = props => (
  <main className="messages">
    {props.messages.map(message => (
      <Message
        key={message.id}
        userName={message.username}
        content={message.content}
        color={message.color}
      />
    ))}
  </main>
);
export default MessageList;
