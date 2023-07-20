import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import './style/register.css'; // Import the CSS file for styling
import { Link } from "react-router-dom";

function Register() {
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
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      fname: inputs.fname,
      lname: inputs.lname,
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      avatar: inputs.avatar,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://www.melivecode.com/api/users/create', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success',
          }).then((value) => {
            localStorage.setItem('token', result.accessToken);
            navigate('/');
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
    <div>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">My App</Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to="/question">Question</Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to="/profile">Profile</Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to="/crud">Crud</Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to="/compiler">Compiler</Link>
                      </li>
                  </ul>
                </div>
            </nav>
          </div>
        <div className="register-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>First Name:</label>
            <input
                type="text"
                name="fname"
                value={inputs.fname || ''}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Last Name:</label>
            <input
                type="text"
                name="lname"
                value={inputs.lname || ''}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Email:</label>
            <input
                type="text"
                name="email"
                value={inputs.email || ''}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Avatar:</label>
            <input
                type="text"
                name="avatar"
                value={inputs.avatar || ''}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Username:</label>
            <input
                type="text"
                name="username"
                value={inputs.username || ''}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={inputs.password || ''}
                onChange={handleChange}
            />
            </div>

            <button type="submit" className="submit-btn">
            Submit
            </button>
        </form>
        </div>
    </div>
  );
}

export default Register;