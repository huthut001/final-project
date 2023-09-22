import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import './style/register.css'; // Import the CSS file for styling
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';

import Navbar from '../layout/nav';

function Register() {
  const [showNavSecond, setShowNavSecond] = useState(false);
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
        <div className="register-container">
        <Navbar/>
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
          <div className='mask gradient-custom-3'></div>
          <MDBCard className='m-5' style={{maxWidth: '600px'}}>
            <MDBCardBody className='px-5'>
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>
              <form onSubmit={handleSubmit}>
                <MDBInput 
                  wrapperClass='mb-4'
                  label='Username'
                  type="text"
                  name="username"
                  value={inputs.username || ''}
                  onChange={handleChange}
                />

                <MDBInput 
                  wrapperClass='mb-4'
                  label='First name'
                  type="text"
                  name="fname"
                  value={inputs.fname || ''}
                  onChange={handleChange}
                />

                <MDBInput 
                  wrapperClass='mb-4'
                  label='Last name'
                  type="text"
                  name="lname"
                  value={inputs.lname || ''}
                  onChange={handleChange}/>

                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Your Email'          
                  type="text"
                  name="email"
                  value={inputs.email || ''}
                  onChange={handleChange}/>

                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Your Avatar'                 
                  type="text"
                  name="avatar"
                  value={inputs.avatar || ''}
                  onChange={handleChange}/>

                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Password'
                  type="password"
                  name="password"
                  value={inputs.password || ''}
                  onChange={handleChange}/>

                {/* <MDBBtn className='mb-4 w-100 gradient-custom-4' >Register</MDBBtn> */}
                <button type="submit" className='mb-4 w-100 gradient-custom-4' >
                Submit
                </button>
              </form>
              
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        </div>
    </div>
  );
}

export default Register;