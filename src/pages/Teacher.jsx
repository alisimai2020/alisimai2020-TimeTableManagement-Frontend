import DepartmentServices from '../services/DepartmentServices';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgramServices from '../services/ProgramServices';
import TeacherServices from '../services/TeacherServices';

function Teacher() {
  const [teacherData, setTeacherData] = useState([]);
  const navigate = useNavigate();
  const [teacherInput, setTeacherInput] = useState('');
  const [addressInput, setAdressInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [editTeacher, setEditTeacherId] = useState(null);
  const [editTeacherValue, setEditTeacherValue] = useState('');

  const [programInput, setProgramInput] = useState('');
  const [programData, setProgramData] = useState([]);

  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchTeacher();
    fetchProgram();
    fetchDepartment();
  }, []);

  const fetchTeacher = () => {
    TeacherServices.getData()
      .then((response) => {
        setTeacherData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleAddTeacher = () => {
    setEditTeacherId(null);
    setEditTeacherValue('');
    setTeacherInput('');
    setDepartmentId('');
    setAdressInput('');
    setEmailInput('');
    setPhoneInput('');
    setProgramInput('');
    setDisplay(true);
  };

  const handleCloseYear = () => {
    setDisplay(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editTeacher) {
      const requestData = {
        teachername: teacherInput,
        address:addressInput,
        email:emailInput,
        phoneNo:phoneInput,
        department: departmentId,
        program:programInput
      };

      TeacherServices.update(editTeacher, requestData)
        .then((res) => {
          navigate('/teacher');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
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
          alert('Data Added Successfully!');
          navigate('/teacher');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateTeacher = (id, teacher,department,program) => {
    setEditTeacherId(id);
    setEditTeacherValue(teacher);
    setTeacherInput(teacher);
    setDepartmentId(department);
    setProgramInput(program);
    setDisplay(true);
  };

  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      TeacherServices.delete(id)
        .then((res) => {
          navigate('/teacher');
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

  
    <button onClick={handleAddTeacher} className="btn btn-primary w-25 mb-3">
          Add Teacher
        </button>

        <table className="table table-striped caption-top bg-white rounded p-4 table-bordered w-100">
          <thead>
            <tr>
              <th>Sno</th>
              <th>teacher</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teacherData.length > 0 ? (
              teacherData.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.teachername}</td>
                  <td>{data.department.name}</td>

                  <td>
                    <button
                      onClick={() => handleUpdateTeacher(data.id, data.teachername,data.department,data.program)}
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
                      <h3 className="mb-5">PROGRAM FORM</h3>
                      <form onSubmit={handleSubmit}>
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
                            <option value="{ departmentId ? departmentId.name : ''}">{ departmentId ? departmentId.name : 'Select Department'}</option>
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
                            <option value="{ programInput ? programInput.name : ''}">{ programInput ? programInput.name : 'Select Program'}</option>
                            {programData.map((programData) => (
                              <option key={programData.id} value={programData.id}>
                                {programData.name}
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
                              {editTeacher ? 'Update' : 'Add'}
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

export default Teacher;
