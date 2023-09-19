import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content';
import './style/profile.css'; // Import the CSS file for styling
import Navbar from '../layout/nav';

function Profile() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
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
          setUser(result.user);
          setIsLoaded(false);
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error',
          }).then((value) => {
            navigate('/');
          });
        }
      })
      .catch((error) => console.log('error', error));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  
  if (isLoaded) return <div>Loading</div>;

  return (
    <div>
      <Navbar/>
      <div className="profile-container">
        <div className="profile-item">
          <label>Avatar:</label>
          <img src={user.avatar} alt={user.id} width={100} />
        </div>
        <div className="profile-item">
          <label>ID:</label>
          <div>{user.id}</div>
        </div>
        <div className="profile-item">
          <label>First Name:</label>
          <div>{user.fname}</div>
        </div>
        <div className="profile-item">
          <label>Last Name:</label>
          <div>{user.lname}</div>
        </div>
        <div className="profile-item">
          <label>Username:</label>
          <div>{user.username}</div>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <div>{user.email}</div>
        </div>
        <div className="profile-item">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
