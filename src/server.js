const express = require("express");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const allowedUsers = ["huthut", "user2", "user3"]; // Replace these with the actual allowed usernames



io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for the "username" event from the client
  socket.on("username", (username) => {
    if (allowedUsers.includes(username)) {
      // If the username is allowed, add it to the socket's data
      socket.username = username;
      console.log(socket.username);
    } else {
      // If the username is not allowed, disconnect the socket
      socket.disconnect();
    }
  });

  // Handle other socket events or messages from the client, if needed.

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const port = 3001; // Replace this with your desired port number
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});