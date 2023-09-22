import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from '../layout/nav';
import Footer from "../layout/footer";
import Header from "../layout/header";

function Home() {
  return (
    <div>
      <Navbar/>
      {/* <h1>Welcome to the Home Page</h1> */}
      {/* Add your content here */}
      <Footer/>
      <Header></Header>
    </div>
  );
}

export default Home;
