// unique id
const uuid = require('uuid')

// server.js
const express = require('express');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({
  server,
  path: "/websocket"
});

const clientSize = size => ({
  type: "incomingClientSize",
  size,
});

const createMessage = (msg, color) => ({
  type: "incomingMessage",
  data: {
    id: uuid(),
    username: msg.username,
    content: msg.message,
    color,
  }
});

const createNotification = msg => ({
  type: "incomingNotification",
  content: msg.message,
});

wss.broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('client', wss.clients)

  const userSize = clientSize(wss.clients.size)
  wss.broadcast(JSON.stringify(userSize));

  const randomColor = "#" + (Math.random().toString(16) + "000000").slice(2, 8);

  ws.on('message', data => {
      console.log("Message Received", data);
      const msg = JSON.parse(data);

      console.log('parsed', msg)

      switch (msg.type) {
        case "postMessage":
          const message = createMessage(msg, randomColor);
          console.log('innnnfiltrated', message)

          wss.broadcast(JSON.stringify(message));
          break;
        case "postNotification":
          const notification = createNotification(msg)
          wss.broadcast(JSON.stringify(notification));
          break;
        default:
          throw new Error("Unknown event type " + msg.type);
      }
    }),
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', (ws) => {
      console.log('Client disconnected')
      const userSize = clientSize(wss.clients.size)
      wss.broadcast(JSON.stringify(userSize));
    });
});