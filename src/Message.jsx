import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super();
    this.state = { props };
  }
  render() {
    let style = { fontStyle: "normal" };
    if (!this.props.userName) style = { fontStyle: "italic" };

    return (
      <div className="message">
        <span className="message-username">{this.props.userName}</span>
        <span className="message-content" style={style}>
          {this.props.content}
        </span>
        <div className="messageSystem" />
      </div>
    );
  }
}
export default Message;
