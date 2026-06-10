const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

console.log("Server running on 3000");

wss.on("connection", ws => {

ws.on("message", msg => {

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg.toString());
    }
  });
});

});
