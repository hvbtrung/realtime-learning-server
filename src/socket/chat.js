const app = require("../../app");
const http = require("http");
const server = http.createServer(app);

const socketIO = require("socket.io")(server, {
  cors: { origin: "*" },
});

socketIO.on("connection", (socket) => {
  // console.log("New client connected " + socket.id);

  socket.on("createRoom", (roomId) => {
    // console.log("roomID:", roomId);
    socket.currentRoom = roomId;
    socket.leave(socket.id);
    socket.join(roomId);
  });

  socket.on("sendMarkQuestionToServer", ({ questionId }) => {
    socketIO.sockets
      .to(socket.currentRoom)
      .emit("sendMarkQuestionToClient", { questionId });
  });
  socket.on("sendDataVoteQuestionToServer", ({ questionId, votingType }) => {
    console.log("Update Vote Question: ", questionId, votingType);

    socketIO.sockets
      .to(socket.currentRoom)
      .emit("sendDataVoteQuestionToClient", { questionId, votingType });
  });

  socket.on(
    "sendMessageToServer",
    ({ message, userId, name, questionId, totalVotes, isAnswered }) => {
      // console.log(message, userId);

      let data = {
        message: message,
        userId: userId,
        name: name,
      };

      if (questionId !== null) {
        data = { ...data, questionId, totalVotes, isAnswered };
      }
      // console.log("data", data);
      socketIO.sockets.to(socket.currentRoom).emit("sendMessageToClient", data);
    }
  );

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

module.exports = { server, socketIO };
