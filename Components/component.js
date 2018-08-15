import React from "react";

module.exports = {
    //post message to websocket and state
    onSubmit = evt => {
        if (evt.key === "Enter" && evt.target.value) {
            evt.preventDefault();
            const messageInput = {
                type: "postMessage",
                username: this.props.currentUser,
                message: evt.target.value
            };
            this.props.sendMessage(messageInput);
            evt.target.value = "";
        }
    },
    //post username change to websocket and state
    onChange = evt => {
        if (
            evt.key === "Enter" &&
            evt.target.value &&
            evt.target.value !== this.props.currentUser
        ) {
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
    }
}