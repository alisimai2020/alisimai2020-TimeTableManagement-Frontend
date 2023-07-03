import React, { useEffect, useState } from 'react';
import EmployeeServices from '../services/EmployeeServices';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeServices.getEmployeeById(id);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    EmployeeServices.updateEmployee(id, data)
      .then(res => {
        alert("Data updated successfully!");
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-light p-5'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='id'>ID:</label>
            <input
              type='text'
              name='id'
              className='form-control'
              value={data.id}
              disabled
            />
          </div>

          <div>
            <label htmlFor='firstName'>First Name:</label>
            <input
              type='text'
              value={data.firstName}
              name='firstName'
              className='form-control'
              onChange={e => setData({ ...data, firstName: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor='lastName'>Last Name:</label>
            <input
              type='text'
              name='lastName'
              className='form-control'
              value={data.lastName}
              onChange={e => setData({ ...data, lastName: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
              className='form-control'
              value={data.emailId}
              onChange={e => setData({ ...data, emailId: e.target.value })}
            />
          </div>
          <br />
          <button className='btn btn-info'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
