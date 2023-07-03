import React, { useEffect, useState } from 'react'
import StudentService from '../services/StudentService';
import YearServices from '../services/YearServices';
import { useNavigate } from 'react-router-dom';

function Student() {
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();
  const [studentInput, setStudentInput] = useState('');
  const [addressInput, setAdressInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  
  const [editStudent, setEditStudentId] = useState(null);
  const [editStudentValue, setEditStudentValue] = useState('');

  const [yearInput, setYearInput] = useState('');
  const [yearData, setYearData] = useState([]);

  
  useEffect(() => {
    fetchStudent();
    fetchYear();
    
  }, []);

  ////////////////////Fetch Student Data ////////////////////////////////////////
  const fetchStudent = () => {
    StudentService.getData()
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 ////////////////////Fetch Year Data ////////////////////////////////////////

  const fetchYear = () => {
    YearServices.getYear()
      .then((response) => {
        setYearData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  ///////////////////CLOSE BUTTON /////////////////////////////////
  const handleCloseYear = () => {
    setDisplay(false);
  };

///////////////////SET DATA AFTER SUBMIT EMPTY/////////////////////////////////

  const handleAddStudent = () => {
    setEditStudentId(null);
    setEditStudentValue('');
    setAdressInput('');
    setEmailInput('');
    setPhoneInput('');
    setYearInput('');
    setDisplay(true);
  };
///////////////////Update Data and Edit/////////////////////////////////
 // ...

const handleSubmit = (event) => {
  event.preventDefault();

  if (editStudent) {
    const requestData = {
      name: studentInput,
      address: addressInput,
      phoneNumber: phoneInput,
      email: emailInput,
      year: {
        id: yearInput,
        year_name: '', // This field is not used in the update request
      },
    };

    StudentService.update(editStudent, requestData)
      .then((res) => {
        navigate('/student');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  } else {
   
    const requestData = {
      name: studentInput,
      address: addressInput,
      phoneNumber: phoneInput,
      email: emailInput,
      year:yearInput

     
    }
    ; StudentService.create(requestData)
    .then((res) => {
      alert('Data Added Successfully!');
      navigate('/student');
      window.location.reload();
    })
    .catch((err) => console.log(err));

  };

 
  
  
  

    
};


///////////////////Handle Data /////////////////////////////////
 
const handleUpdateStudent = (id, year, name, phoneNumber, address, email) => {
  setEditStudentId(id);
  setEditStudentValue(name);
  setStudentInput(name);
  setAdressInput(address);
  setEmailInput(email);
  setPhoneInput(phoneNumber);
  setYearInput(year.id); // Set the year id instead of the entire year object
  setDisplay(true);
};


  ///////////////////Delete Data /////////////////////////////////
  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      StudentService.delete(id)
        .then((res) => {
          navigate('/student');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const [display, setDisplay] = useState(false);

  return (
    <div className="p-5">
     

    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-md-8 p-4 mb-3  rounded " style={{backgroundColor:"whitesmoke"}}>
    
      
        <button onClick={handleAddStudent} className="btn btn-primary w-25 mb-3">
              Add Teacher
            </button>
    
            <table className="table table-striped caption-top bg-white rounded p-4 table-bordered w-100">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Student</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentData.length > 0 ? (
                  studentData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td>{data.phoneNumber}</td>
                      <td>{data.email}</td>
                      <td>{data.year.year_name}</td>
    
                      <td>
                        <button
                          onClick={() => handleUpdateStudent(data.id,data.year,data.name,data.address,data.phoneNumber,data.email)}
                          className="btn btn-sm btn-info ms-1 btn-success"
                        >
                         <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                          onClick={() => deletehandleSubmit(data.id)}
                          className="btn btn-sm btn-danger ms-1 btn-success"
                        >
                         <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
                  
            
        </div>
    </div>
    </div>
    
          {display && (
            <div className="mt-5">
              <div>
                <div className="container-fluid py-5 h-50">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8">
                      <div className="card" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center">
                          <h3 className="mb-5">STUDENT</h3>
                          <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                               
                                placeholder="name"
                                value={studentInput}
                                onChange={(event) => setStudentInput(event.target.value)}
                              />
                              <label htmlFor="formId1">Student Name</label>
                            </div>
    
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                               
                                
                                placeholder="name"
                                value={addressInput}
                                onChange={(event) => setAdressInput(event.target.value)}
                              />
                              <label htmlFor="formId1">Adresss</label>
                            </div>
    
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                               
                                
                                placeholder="name"
                                value={phoneInput}
                                onChange={(event) => setPhoneInput(event.target.value)}
                              />
                              <label htmlFor="formId1">Phone NUmber</label>
                            </div>
    
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                
                                
                                placeholder="email"
                                value={emailInput}
                                onChange={(event) => setEmailInput(event.target.value)}
                              />
                              <label htmlFor="formId1">Email</label>
                            </div>
    
    
    
                            <div className="form-floating mb-3">
                             
                              <select
                                id="programId"
                                value={yearInput}
                                onChange={(event) => setYearInput(event.target.value)}
                               className='form-select'
                              >
                                <option value="{ yearInput ? yearInput.id : ''}">{ yearInput ? yearInput.year_name : 'Select Year'}</option>
                                {yearData.map((yearData) => (
                                  <option key={yearData.id} value={yearData.id}>
                                    {yearData.year_name}
                                  </option>
                                ))}
                              </select>
                            </div>
    
                            <div className="row">
                              <div className="col-6 justify-content-start">
                                <button
                                  type="submit"
                                  className="btn w-25 btn-outline-primary float-start"
                                >
                                  {editStudent ? 'Update' : 'Add'}
                                </button>
                              </div>
                              <div className="col-6 justify-content-start">
                                <button
                                  className="btn w-25 btn-outline-danger float-end"
                                  onClick={handleCloseYear}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  
}

export default Student
