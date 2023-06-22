import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// ---------------------- ไม่ต้องเขียน ----------------------

function Profile() {
    const navigate = useNavigate( )
    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setUser] = useState([]);
    const MySwal = withReactContent(Swal) 

    useEffect(() => {
        const token = localStorage.getItem('token') 
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://www.melivecode.com/api/auth/user", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            if (result.status === 'ok'){
                setUser(result.user)
                setIsLoaded(false)
            } else if (result.status === 'forbidden'){
                MySwal.fire({
                    html: <i>{result.message}</i>,
                    icon: 'error'
                  }).then ((value) => {
                    navigate('/')
                  })
            }
            })
          .catch(error => console.log('error', error));
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/ ')
    }    
    if (isLoaded) return (
      <div>Loding</div>
    )

// ---------------------- ไม่ต้องเขียน ----------------------
    
    else {
        return(
            <div>
                <div>{ user.id }</div>
                <div>{ user.fname }</div>
                <div>{ user.lname }</div>
                <div>{ user.username }</div>
                <div>{ user.email }</div>
                <img src={ user.avatar } alt={user.id} width={100}></img>
                <div><button onClick={logout}>logout</button></div>
            </div>
        )
    }
}
 
export default Profile