import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Navbar({ Toggle }) {
  // Storing data in localStorage
  const history = useNavigate();

// Retrieving data from localStorage
const storedUsername = localStorage.getItem('username');
const storedRoleName = localStorage.getItem('role');

// Using the retrieved data
const [username, setUsername] = useState(storedUsername);
const [roleName, setRoleName] = useState(storedRoleName);

const handleLogout = () => {
  axios.delete("http://localhost:8080/api/v1/logout")
    .then((response) => {
      // Clear local storage and reset state values
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      setUsername('');
      setRoleName('');
      history('/');
    })
    .catch((error) => {
      console.log(error);
    });
};
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand d-none d-md-block" href="#">{username}({roleName})</a>
    <a className="navbar-brand d-md-none d-md-block" onClick={Toggle} >
        <i className='bi bi-justify'></i>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item mx-1 border rounded   ">
          <a className="nav-link text-white" aria-current="page" href="#">Account</a>
        </li>
        <li className="nav-item">
          <a className="nav-link  border rounded text-white "  onClick={handleLogout}>Logout</a>
        </li>
        
       
      </ul>
      
    </div>
  </div>
</nav>
  )
}
export default Navbar