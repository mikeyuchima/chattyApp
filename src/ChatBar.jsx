import React, { Component } from "react";

class ChatBar extends Component {
  onSubmit = evt => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      console.log("something", this);
      const messageInput = {
        type: "postMessage",
        username: this.props.currentUser,
        message: evt.target.value
      };
      this.props.sendMessage(messageInput);
      evt.target.value = "";
    }
  };

  onChange = evt => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      const messageInput = {
        type: "postNotification",
        username: evt.target.value,
        message: `${this.props.currentUser} have changed their name to ${
          evt.target.value
        }`
      };
      this.props.changeUser(messageInput);
    }
  };
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser}
          onKeyPress={this.onChange}
        />
        <input
          type="text"
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onSubmit}
        />
      </footer>
    );
  }
}
export default ChatBar;
