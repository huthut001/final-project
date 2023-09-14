const questions = require('./question'); // Import the question structure

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
  
io.on('connection', (socket) => {
  socket.on('startGame', () => {
    // Generate a random question based on the category (easy, medium, hard)
    const category = 'easy'; // You can change this dynamically
    const randomQuestion = getRandomQuestion(questions[category]);

    // Emit the question and test cases to the client
    socket.emit('newQuestion', randomQuestion);
  });

  socket.on('disconnect', () => {
    // Handle disconnections
  });
});

function getRandomQuestion(questionArray) {
  const randomIndex = Math.floor(Math.random() * questionArray.length);
  return questionArray[randomIndex];
}

http.listen(5000, () => {
  console.log('Server is running on port 5000');
});