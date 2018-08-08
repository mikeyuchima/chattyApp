// unique id
const uuid = require('uuid')
// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server, path: "/websocket" });

const createMessage = content = ({
  type: "message",
  data: {
    id: uuid(),
    content
  }
});

// SocketServer.broadcast = (data, ws) => {
//   SocketServer.clients.forEach(client => {
//     if (client !== ws && client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// };

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', data => {
    console.log("Message Received", data);
    const msg = JSON.parse(data);

    console.log('parsed', msg)

    switch (msg.type) {
      case "message":
        const message = createMessage(msg.text);

        socketServer.broadcast(JSON.stringify(message));
        break;
      case "setBackground":
        backgroundColor = msg.backgroundColor;
        const data = JSON.stringify(backgroundMessage());

        socketServer.broadcast(data, ws);
        break;
      default:
    }

  }),

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});