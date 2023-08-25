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

// const allowedUsers = ["huthut", "user2", "user3"]; // Replace these with the actual allowed usernames
const userMemory = {};
const userOutputs = {};
let submittedUsers = 0; // Keep track of the number of users who have submitted


io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for the "username" event from the client
  socket.on("username", (username) => {
      // If the username is allowed, add it to the socket's data
      socket.username = username;
      console.log(socket.username);

      socket.on('solutionData', (data) => {
        // Here you can access the received memory and time values
        const memory = data.memory;
        const time = data.time;
        const user = data.user
        const stdout = data.stdout
        // Do whatever you want with the received data on the server side
        console.log(`user name: ${user}` );
        console.log(`Received memory: ${memory} bytes`);
        console.log(`Received time: ${time} Swecs`);
        console.log(`output: ${stdout}`);
        console.log(`type data ${typeof stdout}`);

        if (!(user in userMemory) || memory < userMemory[user]) {
          userMemory[user] = memory;
          userOutputs[user] = stdout;
        }

        submittedUsers++;

        if (submittedUsers === io.engine.clientsCount) {
          evaluateSubmissions();
        }
      });
  });

  // Handle other socket events or messages from the client, if needed.

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// function announceWinner() {
//   let leastMemoryUser = null;
//   let leastMemoryValue = Infinity;
//   for (const [user, memory] of Object.entries(userMemory)) {
//     if (memory < leastMemoryValue) {
//       leastMemoryValue = memory;
//       leastMemoryUser = user;
//     }
//   }

//   if (leastMemoryUser) {
//     console.log(`User with least memory: ${leastMemoryUser} (${leastMemoryValue} bytes) wins!`);
//   }
// }

function evaluateSubmissions() {
  // Define the expected outputs or patterns to check
  const expectedOutput = "hello world";
  const invalidOutputPatterns = ["leetcode", "error"];

  let winner = null;
  let leastMemoryValue = Infinity;

  for (const [user, memory] of Object.entries(userMemory)) {
    if (memory < leastMemoryValue) {
      leastMemoryValue = memory;
      const userOutput = userOutputs[user];

      if (userOutput === expectedOutput) {
        winner = user;
        break; // Exit loop since this user meets the winning condition
      } else if (!invalidOutputPatterns.some(pattern => userOutput.includes(pattern))) {
        winner = user; // If output is not invalid, this user becomes winner
      }
    }
  }

  if (winner) {
    console.log(`User with least memory: ${winner} wins with valid output!`);
  } else {
    console.log("No valid winner.");
  }
}

// Start the server
const port = 3001; // Replace this with your desired port number
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});