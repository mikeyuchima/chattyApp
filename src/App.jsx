import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

      // Setup the WebSocket client
      this.socket = new WebSocket("ws://localhost:3001/websocket");

      // Handle when the socket opens (i.e. is connected to the server)
      this.socket.addEventListener("open", e => {
        console.log("Connected to websocket server");
      });
  
      // Handle messages using `this.receiveMessage`
      // this.socket.addEventListener("message", this.receiveMessage);
  }

  addMessage(message) {
    // console.log("tasks", oldTaskNames, message);
    const newMessage = [
      {
        id: 0,
        username: this.state.currentUser.name,
        content: message
      }
    ];
    const messages = this.state.messages.concat(newMessage)
    this.socket.send(JSON.stringify(messages));

    this.setState({
      messages: messages  
    });
  }

  render() {
    return (
      <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
