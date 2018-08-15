import React, { Component } from "react";

class Message extends Component {
  render() {
    //to change url to image if applicable
    let content = "";
    if (this.props.content.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      content = <img src={this.props.content} style={{ maxHeight: "60vh" }} />;
    } else {
      content = this.props.content;
    }

    //font colour
    let color = { color: `${this.props.color}` };

    //font style for system message
    let font = { fontStyle: "normal" };
    if (!this.props.userName) font = { fontStyle: "italic" };

    //templating
    return (
      <div className="message">
        <span className="message-username" style={color}>
          {this.props.userName}
        </span>
        <span className="message-content" style={font}>
          {content}
        </span>
        <div className="messageSystem" />
      </div>
    );
  }
}
export default Message;
