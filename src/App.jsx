import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: { name: "anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);

    // Setup the WebSocket client
    this.socket = new WebSocket("ws://localhost:3001/websocket");

    // Handle when the socket opens (i.e. is connected to the server)
    this.socket.addEventListener("open", e => {
      console.log("Connected to websocket server", e);
    });

    // Handle messages using `this.receiveMessage`
    // this.socket.addEventListener("message", this.receiveMessage);
    this.socket.addEventListener("message", evt => {
      const pkg = JSON.parse(evt.data);
      console.log(pkg);
      switch (pkg.type) {
        case "incomingMessage":
          const messages = [...this.state.messages, pkg.data];
          console.log(messages);
          this.setState({ messages });
          break;
        case "incomingNotification":
          $(".message system").text("notificatioooon");
          break;
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
