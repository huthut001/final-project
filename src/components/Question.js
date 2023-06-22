import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';


function Question(){

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

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
            "id":0,
            "title": inputs.title,
            // "answer": inputs.answer,
            "mode": inputs.mode,
            "status": "ok",
            "cpu_usage": parseFloat(inputs.cpu),
            "runtime": parseFloat(inputs.runtime),
            "memory": parseFloat(inputs.memory),
            "detail": inputs.detail,
            "testcases": testcases,
        };
      
        fetch("http://127.0.0.1:8000/questionsCreate", {
            method: "POST",
            // mode: "no-cors",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.status === "ok") {
              MySwal.fire({
                html: <i>{result.message}</i>,
                icon: "success",
              });
            } else {
              MySwal.fire({
                html: <i>{result.message}</i>,
                icon: "error",
              });
            }
          })
          .catch((error) => console.log("error", error));
      };
      
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Title Name:
                <input 
                    type="text" 
                    name="title" 
                    value={inputs.title || ""} 
                    onChange={handleChange}
                />
                </label>

                {/* <label>Answer:
                <input 
                    type="text" 
                    name="answer" 
                    value={inputs.answer || ""} 
                    onChange={handleChange}
                />
                </label> */}

                <label>Mode:
                <input 
                    type="text" 
                    name="mode" 
                    value={inputs.mode || ""} 
                    onChange={handleChange}
                />
                </label>

                <label>Testcase:
                <input 
                    type="text" 
                    name="output" 
                    value={inputs.output || ""} 
                    onChange={handleChange}
                />
                </label>

                <label>Detail:
                <input
                    type="text"
                    name="detail"
                    value={inputs.detail || ""}
                    onChange={handleChange}
                />
                

                </label>
                <label>Runtime:
                <input 
                    type="text" 
                    name="runtime" 
                    value={inputs.runtime || ""} 
                    onChange={handleChange}
                />
                </label>

                <label>Memory:
                    <input 
                    type="text" 
                    name="memory" 
                    value={inputs.memory || ""} 
                    onChange={handleChange}
                    />
                </label>

                <label>Cpu Usage:
                    <input 
                    type="text" 
                    name="cpu" 
                    value={inputs.cpu || ""} 
                    onChange={handleChange}
                    />
                </label>
                <input type="submit" />
            </form>
        </div> 
    )
}

export default Question;