import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import { Link } from "react-router-dom";
import './style/question.css'; // Import the CSS file for styling

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBTextArea
} from 'mdb-react-ui-kit';

import Navbar from '../layout/nav';

function Question() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    const testcases = [];

    if (Array.isArray(inputs.output)) {
      // Handle multiple test case outputs
      inputs.output.forEach((output) => {
        testcases.push({ output });
      });
    } else {
      // Handle single test case output
      testcases.push({ output: inputs.output });
    }

    const payload = {
      id: 0,
      title: inputs.title,
      // "answer": inputs.answer,
      mode: inputs.mode,
      status: 'ok',
      cpu_usage: parseFloat(inputs.cpu),
      runtime: parseFloat(inputs.runtime),
      memory: parseFloat(inputs.memory),
      detail: inputs.detail,
      testcases: testcases,
    };

    fetch('http://127.0.0.1:8000/questionsCreate', {
      method: 'POST',
      // mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success',
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error',
          });
        }
      })
      .catch((error) => console.log('error', error));
  };

  return (
    // <div>
    //   <Navbar></Navbar>
    //     <div className="question-container">
    //         <form onSubmit={handleSubmit}>
    //             <div className="form-group">
    //             <label>Title Name:</label>
    //             <input
    //                 type="text"
    //                 name="title"
    //                 value={inputs.title || ''}
    //                 onChange={handleChange}
    //             />
    //             </div>

    //             {/* <div className="form-group">
    //             <label>Answer:</label>
    //             <input
    //                 type="text"
    //                 name="answer"
    //                 value={inputs.answer || ''}
    //                 onChange={handleChange}
    //             />
    //             </div> */}

    //             <div className="form-group">
    //             <label>Mode:</label>
    //             <input
    //                 type="text"
    //                 name="mode"
    //                 value={inputs.mode || ''}
    //                 onChange={handleChange}
    //             />
    //             </div>

    //             <div className="form-group">
    //             <label>Testcase:</label>
    //             <input
    //                 type="text"
    //                 name="output"
    //                 value={inputs.output || ''}
    //                 onChange={handleChange}
    //             />
    //             </div>

    //             <div className="form-group">
    //             <label>Detail:</label>
    //             <input
    //                 type="text"
    //                 name="detail"
    //                 value={inputs.detail || ''}
    //                 onChange={handleChange}
    //             />
    //             </div>

    //             <div className="form-group">
    //             <label>Runtime:</label>
    //             <input
    //                 type="text"
    //                 name="runtime"
    //                 value={inputs.runtime || ''}
    //                 onChange={handleChange}
    //             />
    //             </div>

    //             <div className="form-group">
    //             <label>Memory:</label>
    //             <input
    //                 type="text"
    //                 name="memory"
    //                 value={inputs.memory || ''}
    //                 onChange={handleChange}
    //             />
    //             </div>

    //             <div className="form-group">
    //             <label>Cpu Usage:</label>
    //             <input
    //                 type="text"
    //                 name="cpu"
    //                 value={inputs.cpu || ''}
    //                 onChange={handleChange}
    //             />
    //             </div>

    //             <button type="submit" className="submit-btn">
    //             Submit
    //             </button>
    //         </form>
    //     </div>

        <div>
          <Navbar></Navbar>
          <form className='container' style={{ padding:30 }}>
          <MDBRow className='mb-4'>
            <MDBCol>
              <MDBInput id='form6Example1' label='Title' />
            </MDBCol>
            <MDBCol>
              <MDBInput id='form6Example2' label='Mode' />
            </MDBCol>
          </MDBRow>

          <MDBTextArea wrapperClass='mb-4' label='Detail' id='textAreaExample' rows={6} />
          <MDBInput wrapperClass='mb-4' id='form6Example4' label='runtime' />
          <MDBInput wrapperClass='mb-4' type='email' id='form6Example5' label='Memory usage' />
          <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='testcase' />

          <MDBBtn className='mb-4' type='submit' block>
            Create
          </MDBBtn>
        </form>

      </div>
      
    // </div>
  );
}

export default Question;
