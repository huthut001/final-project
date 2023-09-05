import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse
  }
  from 'mdb-react-ui-kit';
import { useState } from 'react';

function Navbar() {
  const [showNavSecond, setShowNavSecond] = useState(false);

  return(  
  <MDBNavbar expand='lg' light bgColor='light'>
  <MDBContainer fluid>
    <MDBNavbarBrand href='/'>Navbar</MDBNavbarBrand>
    <MDBNavbarToggler
      aria-expanded='false'
      aria-label='Toggle navigation'
      onClick={() => setShowNavSecond(!showNavSecond)}
    >
      <MDBIcon icon='bars' fas />
    </MDBNavbarToggler>
    <MDBCollapse navbar show={showNavSecond}>
      <MDBNavbarNav>
        <MDBNavbarLink active aria-current='page' href='login'>Login</MDBNavbarLink>
        <MDBNavbarLink active aria-current='page' href='question'>Question</MDBNavbarLink>
        <MDBNavbarLink active aria-current='page' href='profile'>Profile</MDBNavbarLink>
        <MDBNavbarLink href='register'>Register</MDBNavbarLink>
        <MDBNavbarLink href='crud'>Crud</MDBNavbarLink>
        <MDBNavbarLink href='compiler'>Compiler</MDBNavbarLink>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBContainer>
  </MDBNavbar>
  )
}

export default Navbar;