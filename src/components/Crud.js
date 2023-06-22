import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';


function Crud() {

    const createUser = {
        textAlign: "right",
        padding: "22px",
        backgroundColor: "#FFDFBF",
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        UsersGet()
      }, [])

    const UsersGet = () => {
        fetch("https://www.melivecode.com/api/users")
          .then(res => res.json())
          .then(
            (result) => {
              setUsers(result)
            }
          )
      }
    
    const UpdateUser = id => {
        window.location = '/update/'+id
    }
    
    const UserDelete = id => {
        var data = {
        'id': id
        }
        fetch('https://www.melivecode.com/api/users/delete', {
        method: 'DELETE',
        headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(
            (result) => {
                alert(result['message'])
                if (result['status'] === 'ok') {
                    UsersGet();
                }
            }
        )
    }

    return(
        <div>
            <div style={createUser}><a href="register">Create</a></div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 18 }} align="right">ID</TableCell>
                        <TableCell sx={{ fontSize: 18 }} align="center">Avatar</TableCell>
                        <TableCell sx={{ fontSize: 18 }} align="left">First</TableCell>
                        <TableCell sx={{ fontSize: 18 }} align="left">Last</TableCell>
                        <TableCell sx={{ fontSize: 18 }} align="left">Username</TableCell>
                        <TableCell sx={{ fontSize: 18 }} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                    <TableRow key={user.ID}>
                        <TableCell align="right">{user.id}</TableCell>
                            <TableCell align="center">
                                <Box display="flex" justifyContent="center">
                                    <Avatar src={user.avatar} />
                                </Box>
                            </TableCell>
                            <TableCell align="left">{user.fname}</TableCell>
                            <TableCell align="left">{user.lname}</TableCell>
                            <TableCell align="left">{user.username}</TableCell>
                            <TableCell align="center">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                                <Button onClick={() => UserDelete(user.id)}>Del</Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}
export default Crud;

