import React, { useEffect, useState } from 'react';
import EmployeeServices from '../services/EmployeeServices';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeForm() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({ id: '', firstName: '', lastName: '', emailId: '' });

    function handleSubmit(event) {
        event.preventDefault();
        EmployeeServices.createEmployee(inputData).then(res => {
            alert("Data Added Successfully!  ");
            navigate('/');
        }).catch(err => console.log(err));
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
                            onChange={e => setInputData({ ...inputData, id: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            name='firstName'
                            className='form-control'
                            onChange={e => setInputData({ ...inputData, firstName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            name='lastName'
                            className='form-control'
                            onChange={e => setInputData({ ...inputData, lastName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='text'
                            name='email'
                            className='form-control'
                            onChange={e => setInputData({ ...inputData, emailId: e.target.value })}
                        />
                    </div>
                    <br />
                    <button className='btn btn-info'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;
