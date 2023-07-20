import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content';
import './style/profile.css'; // Import the CSS file for styling

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
