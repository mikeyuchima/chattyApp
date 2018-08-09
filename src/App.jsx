import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
const $ = require("jquery");

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: { name: "anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientSize: 0
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // Setup the WebSocket client
    this.socket = new WebSocket("ws://localhost:3001/websocket");

    // Handle when the socket opens (i.e. is connected to the server)
    this.socket.addEventListener("open", e => {
      console.log("Connected to websocket server", e);
    });

    // Handle messages using `this.receiveMessage`
    // this.socket.addEventListener("message", this.receiveMessage);
    this.socket.addEventListener("message", evt => {
      debugger;
      const pkg = JSON.parse(evt.data);
      console.log(evt);
      switch (pkg.type) {
        case "incomingMessage":
          console.log("/incomingMessage");
          const messages = [...this.state.messages, pkg.data];
          this.setState({ messages });
          break;
        case "incomingNotification":
          console.log("/incomingNotification");
          this.setState({ messages: [...this.state.messages, pkg] });
          break;
        case "incomingClientSize":
          console.log("/incomingClientSize");
          this.setState({ clientSize: pkg.size });
        default:
          throw new Error("Unknown event type " + pkg.type);
      }
    });
  }

  changeUser = message => {
    this.setState({ currentUser: { name: message.username } });
    this.socket.send(JSON.stringify(message));
  };

  sendMessage = message => {
    this.socket.send(JSON.stringify(message));
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <p>Current Users: {this.state.clientSize}</p>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          changeUser={this.changeUser}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}
export default App;
