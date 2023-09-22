const questions = {
    easy: [
      {
        text: 'Question 1',
        testCases: [
          { input: 'input1', output: 'input1' },
          { input: 'input2', output: 'input2' },
          { input: 'input3', output: 'input3' }
          // Add more test cases as needed
        ],
        detail: "print('hello, world')"
      },
      // Add more easy questions
    ],
    
    medium: [
      {
        text: 'Question 1',
        testCases: [
          { input: 'input1', output: 'output1' },
          { input: 'input2', output: 'output2' },
          // Add more test cases as needed
        ],
      },
      // Add more medium questions
    ],
    hard: [
      {
        text: 'Question 1',
        testCases: [
          { input: 'input1', output: 'output1' },
          { input: 'input2', output: 'output2' },
          // Add more test cases as needed
        ],
      },
      // Add more hard questions
    ],
  };
  
  module.exports = questions;
