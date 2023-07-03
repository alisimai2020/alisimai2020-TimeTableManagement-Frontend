import DepartmentServices from '../services/DepartmentServices';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgramServices from '../services/ProgramServices';
import TeacherServices from '../services/TeacherServices';

function TeacherForm() {

  const navigate = useNavigate();
  const [teacherInput, setTeacherInput] = useState('');
  const [addressInput, setAdressInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');



  const [programInput, setProgramInput] = useState('');
  const [programData, setProgramData] = useState([]);

  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);


  useEffect(() => {
   
    fetchProgram();
    fetchDepartment();
  }, []);



  const fetchProgram = () => {
    ProgramServices.getData()
      .then((response) => {
        setProgramData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDepartment = () => {
    DepartmentServices.getData()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      teachername: teacherInput,
      address:addressInput,
      email:emailInput,
      phoneNo:phoneInput,
      department: {
        id: departmentId,
      },

      program: {
        id: programInput,
      },

  };

  TeacherServices.create(requestData)
        .then((res) => {
          alert('Data Added Successfully! Use Your Name as username and Email as Password');
          navigate('/');
          window.location.reload();
        })
        .catch((err) => console.log(err));
}

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
    <div className="container-fluid py-5 h-50">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8">
          <div className="card" style={{ borderRadius: "1rem" }}>
          <form onSubmit={handleSubmit}>
          <div className="card-body p-5 text-center">
            

            <h3 className="mb-5">Sign in</h3>

            <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="formId1"
                            id="formId1"
                            placeholder="name"
                            value={teacherInput}
                            onChange={(event) => setTeacherInput(event.target.value)}
                          />
                          <label htmlFor="formId1">Teacher Name</label>
                        </div>
            <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="formId1"
                          id="formId1"
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
                          name="formId1"
                          id="formId1"
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
                          name="formId1"
                          id="formId1"
                          placeholder="name"
                          value={emailInput}
                          onChange={(event) => setEmailInput(event.target.value)}
                        />
                        <label htmlFor="formId1">Email</label>
                      </div>

                      <div className="form-floating mb-3">
                        
                        <select
                          id="departmentId"
                          value={departmentId}
                          onChange={(event) => setDepartmentId(event.target.value)}
                         className='form-select'
                        >
                          <option >Select Department</option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.name}
                            </option>
                          ))}
                        </select>
                        
                      </div>



                      <div className="form-floating mb-3">
                       
                        <select
                          id="programId"
                          value={programInput}
                          onChange={(event) => setProgramInput(event.target.value)}
                         className='form-select'
                        >
                          <option >'Select Department'</option>
                          {programData.map((programData) => (
                            <option key={programData.id} value={programData.id}>
                              {programData.name}
                            </option>
                          ))}
                        </select>
                      </div>

            <div className="row">
              <div className="col">
                <input
                  type="submit"
                  value="Submit"
                  className="btn form-control btn-outline-primary"
                />
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn form-control btn-outline-secondary"
                 
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          </form>
            
          </div>
        </div>
      </div>
    </div>
  </section>
  

)}
export default TeacherForm