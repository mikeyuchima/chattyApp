import React, {Component} from 'react';

class ChatBar extends Component {
    onSubmit = evt => {
        if (evt.key === "Enter") {
        evt.preventDefault();
        // console.log("something", evt);
        const messageInput = evt.target.value;
        this.props.addMessage(messageInput);
        }
      };
    render() {
    return (
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.username}/>
        <input type="text" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onSubmit}/>
      </footer>
    );
  }
}
export default ChatBar;
