import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const Front = () => {
  const [question, setQuestion] = useState(null);
  const socket = socketIOClient('http://localhost:3001'); // Replace with your server URL

  useEffect(() => {
    socket.on('newQuestion', (newQuestion) => {
      setQuestion(newQuestion);
    });

    // Start the game when the component mounts
    socket.emit('startGame');

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderTestCases = (testCases) => {
    return (
      <div>
        <h3>Test Cases:</h3>
        <ul>
          {testCases.map((testCase, index) => (
            <li key={index}>
              Input: {testCase.input}, Expected Output: {testCase.output}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Programming Competition Game</h1>
      {question && (
        <div>
          <h2>Question:</h2>
          <p>{question.text}</p>
          {renderTestCases(question.testCases)}
          {/* Render options and handle user responses */}
        </div>
      )}
    </div>
  );
};

export default Front;
