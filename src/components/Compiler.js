import React, { Component } from "react";
import "./style/Compiler.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import io from 'socket.io-client'; // Import the socket.io-client library
import Question from "./Question";


const MySwal = withReactContent(Swal);

export default class Compiler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: localStorage.getItem('input')||``,
      output: ``,
      language_id:localStorage.getItem('language_Id')|| 2,
      user_input: ``,
      user:'hello',
      testCaseResults: {}, // Initialize test case results object,
      isLoaded: true,
      allTestCasesPassed: false,
      question: {},
      connectedUsers: [],
      remainingTime: null,
    };
    this.navigate = this.navigate.bind(this);
    this.socket = io();
  }
  
  componentDidMount() {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();

    myHeaders.append('Authorization', 'Bearer ' + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
  
    fetch('https://www.melivecode.com/api/auth/user', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 'ok') {
          this.setState({
            user: result.user, 
          });
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error',
          }).then((value) => {
            window.location.href = '/';
          });
        }
      // Send the username to the server
      this.socket.emit("username", result.user.username);
      })
      .catch((error) => console.log('error', error));
          
    this.socket=io("http://localhost:3001", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    
    this.socket.on('newQuestion', (newQuestion) => {
      this.setState({question: newQuestion})
      console.log(newQuestion);
    })

    this.socket.on("connectedUsers", (users) => {
      // Update the component's state with the list of connected users
      this.setState({ connectedUsers: users,
        isLoaded: false 
        });
      console.log("Connected Users:", users);
      });

    this.socket.on("timeUpdate",(remainingTime) => {
      this.setState({ remainingTime });
    })
  }


  navigate(path) {
    this.props.history.push(path);
  }

  input = (event) => { 
    event.preventDefault();
    this.setState({ input: event.target.value });
    localStorage.setItem('input', event.target.value) 
  };
  
  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
  };
  
  language = (event) => {  
    event.preventDefault();
    this.setState({ language_id: event.target.value });
    localStorage.setItem('language_Id',event.target.value)
   
  };


  run = async (e) => {
    e.preventDefault();
    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    const qTestCases = this.state.question.testCases
    for (const qtestCase of qTestCases){
      console.log(qtestCase.input);
      console.log(qtestCase.output);
    }
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "be061a261dmsh0b67cecce0e7afcp1c8d54jsn3d1482f87e23",
          // 'X-RapidAPI-Key': '42c866f057msha262e41210b2ac8p16a477jsnfcb2b6ab82bb',// Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: this.state.input,
          stdin: this.state.user_input,
          language_id: this.state.language_id,
        }),
      }
    );
  
    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();
    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };
    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "be061a261dmsh0b67cecce0e7afcp1c8d54jsn3d1482f87e23",
            // 'X-RapidAPI-Key': '42c866f057msha262e41210b2ac8p16a477jsnfcb2b6ab82bb',// Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });
        jsonGetSolution = await getSolution.json();
      }
    }
    
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      outputText.innerHTML = "";
      outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;

    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      outputText.innerHTML = "";
      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
      outputText.innerHTML = "";
      outputText.innerHTML += `\n Error :${compilation_error}`;
    }
  }

  submit = async (e) => {
    e.preventDefault();
    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";

    const qTestCases = this.state.question.testCases
    for (const qtestCase of qTestCases){
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "be061a261dmsh0b67cecce0e7afcp1c8d54jsn3d1482f87e23",
            // 'X-RapidAPI-Key': '42c866f057msha262e41210b2ac8p16a477jsnfcb2b6ab82bb',// Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            source_code: this.state.input,
            stdin: qtestCase.input,
            language_id: this.state.language_id,
          }),
        }
      );
    
      outputText.innerHTML += "Submission Created ...\n";
      const jsonResponse = await response.json();
      let jsonGetSolution = {
        status: { description: "Queue" },
        stderr: null,
        compile_output: null,
      };
      while (
        jsonGetSolution.status.description !== "Accepted" &&
        jsonGetSolution.stderr == null &&
        jsonGetSolution.compile_output == null
      ) {
        outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
        if (jsonResponse.token) {
          let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
          const getSolution = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key": "be061a261dmsh0b67cecce0e7afcp1c8d54jsn3d1482f87e23",
              // 'X-RapidAPI-Key': '42c866f057msha262e41210b2ac8p16a477jsnfcb2b6ab82bb',// Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
              "content-type": "application/json",
            },
          });
          jsonGetSolution = await getSolution.json();
        }
      }
      
      if (jsonGetSolution.stdout) {
        const output = atob(jsonGetSolution.stdout);
        outputText.innerHTML = "";
        outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
        
        // const newTestCaseResults = { ...this.state.testCaseResults };
        // newTestCaseResults[testCase] = "Passed";
        // this.setState({ testCaseResults: newTestCaseResults });
        // Compare the actual output with the expected output

        const actualOutput = output.trim();
        const expectedOutput = qtestCase.output.trim();

        console.log(actualOutput === expectedOutput);

        if (actualOutput === expectedOutput) {
          // Test case passed
          const newTestCaseResults = { ...this.state.testCaseResults };
          newTestCaseResults[qtestCase.input] = "Passed";
          this.setState({ testCaseResults: newTestCaseResults }, () => {
            // Check if all test cases have passed
            const allTestCasesPassed = Object.values(newTestCaseResults).every(
              (result) => result === "Passed"
            );
            if (allTestCasesPassed) {
              // If all test cases passed, emit the solution data
              this.socket.emit("solutionData", {
                user: this.state.user.username,
                memory: jsonGetSolution.memory,
                time: jsonGetSolution.time,
                stdout: output,
              });
            }
          });
          
        } else {
          // Test case failed
          const newTestCaseResults = { ...this.state.testCaseResults };
          newTestCaseResults[qtestCase.input] = "Failed";
          this.setState({ testCaseResults: newTestCaseResults });
        }

        // this.checkTestCases(output)

      } else if (jsonGetSolution.stderr) {
        const error = atob(jsonGetSolution.stderr);
        outputText.innerHTML = "";
        outputText.innerHTML += `\n Error :${error}`;
      } else {
        const compilation_error = atob(jsonGetSolution.compile_output);
        outputText.innerHTML = "";
        outputText.innerHTML += `\n Error :${compilation_error}`;
      }
    }
  }

  checkTestCases = (output) => {
    const newTestCaseResults = { ...this.state.testCaseResults };
    const question = { ...this.state.question };
  
    question.testCases.forEach((testCase, index) => {
      const expectedOutput = testCase.output.trim();
      const actualOutput = output.trim();
      if (expectedOutput === actualOutput) {
        newTestCaseResults[index] = "PASS";
      } else {
        newTestCaseResults[index] = "FAIL";
      }
    });
  
    this.setState({ testCaseResults: newTestCaseResults, question });
  };

  render() {
    if (this.state.isLoaded) {
      return <div>Loading...</div>;
    }

    const testCases = this.state.question.testCases.map((testCase, index) => (
      <li key={index}>
        Input: {testCase.input}, Expected Output: {testCase.output}, Result: {this.state.testCaseResults[index]}
      </li>
    ));
  
    return (
      <div className="leetcode-container">
        <header className="leetcode-header">
          <h1>{this.state.user.username}</h1>
        </header>
        <div className="leetcode-content">
          <div className="leetcode-sidebar">
            <div className="leetcode-sidebar-item">
              <span className="leetcode-icon">
                <i className="fas fa-stopwatch"></i>
              </span>
              Remaining Time: {Math.ceil(this.state.remainingTime / 1000)} seconds
            </div>
            <div className="leetcode-sidebar-item">
              <label htmlFor="solution" className="leetcode-label">
                <span className="leetcode-icon">
                  <i className="fas fa-code"></i>
                </span>
                Code Here
              </label>
              <textarea
                required
                name="solution"
                id="source"
                onChange={this.input}
                className="leetcode-textarea"
                value={this.state.input}
              ></textarea>
              <button
                type="submit"
                className="leetcode-button"
                onClick={this.submit}
              >
                <i className="fas fa-cog"></i> Submit
              </button>
              <button
                type="submit"
                className="leetcode-button"
                onClick={this.run}
              >
                <i className="fas fa-cog"></i> Run
              </button>
              <label htmlFor="tags" className="leetcode-label">
                <span className="leetcode-heading">Language:</span>
              </label>
              <select
                value={this.state.language_id}
                onChange={this.language}
                id="tags"
                className="leetcode-select"
              >
                <option value="54">C++</option>
                <option value="50">C</option>
                <option value="62">Java</option>
                <option value="71">Python</option>
              </select>
            </div>
          </div>
    
          <div className="leetcode-main">
            <div className="leetcode-alert">
              <span className="leetcode-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
              Output
            </div>
            <textarea id="output" className="leetcode-textarea"></textarea>
          </div>
        </div>
    
        <div className="leetcode-user-input">
          <span className="leetcode-heading">
            <i className="fas fa-user"></i> User Input
          </span>
          <textarea id="input" onChange={this.userInput} className="leetcode-textarea"></textarea>
        </div>
    
        <div className="leetcode-question">
          <p>{this.state.question.text}</p>
          <p>{this.state.question.detail}</p>
        </div>
    
        <div className="leetcode-test-cases">
          <ul className="leetcode-list">
            {this.state.question.testCases.map((testCase, index) => (
              <li key={index} className="leetcode-list-item">
                <code>
                  Input: {testCase.input}, Expected Output: {testCase.output}
                </code>
              </li>
            ))}
          </ul>
        </div>
    
        <div className="leetcode-test-results">
          <ul className="leetcode-list">
            {Object.keys(this.state.testCaseResults).map((testCaseInput) => (
              <li key={testCaseInput} className="leetcode-list-item">
                Test Case Input: {testCaseInput} - {this.state.testCaseResults[testCaseInput]}
              </li>
            ))}
          </ul>
        </div>
    
        <div className="leetcode-connected-users">
          <ul className="leetcode-list">
            {this.state.connectedUsers.map((user, index) => (
              <li key={index} className="leetcode-list-item">{user}</li>
            ))}
          </ul>
        </div>
      </div>
    );
    
  }
}