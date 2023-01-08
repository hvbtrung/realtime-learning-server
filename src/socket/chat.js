const app = require("../../app");
const http = require("http");
const server = http.createServer(app);

const socketIO = require("socket.io")(server, {
  cors: { origin: "*" },
});

socketIO.on("connection", (socket) => {
  console.log("New client connected " + socket.id);
  socket.emit("getUserId", socket.id);
  socket.on("createRoom", (roomId) => {
    socket.currentRoom = roomId;
    socket.leave(socket.id);
    socket.join(roomId);
  });

  socket.on("sendMessageToServer", ({ message, userId, name }) => {
    console.log(message, userId);
    socketIO.sockets.to(socket.currentRoom).emit("sendMessageToClient", {
      message: message,
      userId: userId,
      name: name,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

module.exports = server;
