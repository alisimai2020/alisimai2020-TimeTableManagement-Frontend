import React, { useEffect, useState } from 'react';
import EmployeeServices from '../services/EmployeeServices';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../component/Navbar/Navbar';
import Navbar from '../component/Navbar/Navbar';

function Home() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await EmployeeServices.getEmployee();
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='p-3 '>
      <div className='container-fluid' mt-5 >

        <div className='row'>
          <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 '>
            <div className=' d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm'>
              <i className='bi bi-currency-dollar fs-1 text-success'></i>
              <div>
                <span>TOtal </span>
                <h2>2333</h2>
              </div>
            </div>
          </div>


          <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3  '>
            <div className=' d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm'>
              <i className='bi bi-currency-dollar fs-1 text-success'></i>
              <div>
                <span>TOtal </span>
                <h2>2333</h2>
              </div>
            </div>
          </div>




          <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3  '>
            <div className=' d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm'>
              <i className='bi bi-currency-dollar fs-1 text-success'></i>
              <div>
                <span>TOtal </span>
                <h2>2333</h2>
              </div>
            </div>
          </div>


          <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3  '>
            <div className=' d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm'>
              <i className='bi bi-currency-dollar fs-1 text-success'></i>
              <div>
                <span>TOtal </span>
                <h2>2333</h2>
              </div>
            </div>
          </div>




        </div>








 <div className='p-5 bg-light'>

    <div className='p-1'>

        <Link to="/create" className="btn btn-primary w-25">
          Add Employee
        </Link>
      

    <table className="table table-striped  caption-top  bg-white rounded p-4 table-bordered">
       
        <caption className='text-secondary fs-4'>List of Employee</caption>
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.emailId}</td>
                  <td>
                    <Link to={`/update/${employee.id}`} className='btn btn-sm btn-success'>Update</Link>
                    <button onClick={e => handleSubmit(employee.id)} className='btn btn-sm btn-danger ms-1 btn-succes'>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      
    </div>
 </div>


      </div>
    </div>
  );

  function handleSubmit(id) {
    const popMessage =window.confirm("Do you to delete");

    if(popMessage){
      EmployeeServices.deleteEmployee(id)
      .then(res => {
        alert("Data has been deleted successfully!");
        navigate('/');
      })
      .catch(err => console.log(err));
    }
  }
}

export default Home; 