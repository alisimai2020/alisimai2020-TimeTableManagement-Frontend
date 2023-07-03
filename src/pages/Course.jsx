import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProgramServices from '../services/ProgramServices';
import CourseServices from '../services/CourseServices';

function Course() {
    const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();
  const [courseInput, setCourseInput] = useState('');
  
  const [editCourse, setEditCourseId] = useState(null);
  const [editCourseValue, setEditCourseValue] = useState('');

  const [programInput, setProgramInput] = useState('');
  const [programData, setProgramData] = useState([]);


  useEffect(() => {
    fetchCourse();
    fetchProgram();
    
  }, []);

  const fetchCourse = () => {
    CourseServices.getData()
      .then((response) => {
        setCourseData(response.data);
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

  

  const handleAddCourse = () => {
    setEditCourseId(null);
    setEditCourseValue('');
    setCourseInput('');
    setProgramInput('');
    setDisplay(true);
  };

  const handleCloseYear = () => {
    setDisplay(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editCourse) {
      const requestData = {
        name: courseInput,
        program:programInput
      };

      CourseServices.update(editCourse, requestData)
        .then((res) => {
          navigate('/course');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const requestData = {
        name: courseInput,
        program: {
          id: programInput,
          name:'',
        },
      };

      CourseServices.create(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/course');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateCourse = (id,name,program) => {
    setEditCourseId(id);
    setEditCourseValue(name);
    setCourseInput(name);

    setProgramInput(program.id);
    setDisplay(true);
  };

  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
        CourseServices.delete(id)
        .then((res) => {
          navigate('/course');
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
    
      
        <button onClick={handleAddCourse} className="btn btn-primary w-25 mb-3">
              Add Course
            </button>
    
            <table className="table table-striped caption-top bg-white rounded p-4 table-bordered w-100">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Course</th>
                  <th>Program</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courseData.length > 0 ? (
                  courseData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.program.name}</td>
    
                      <td>
                        <button
                          onClick={() => handleUpdateCourse(data.id, data.name,data.program)}
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
                                value={courseInput}
                                onChange={(event) => setCourseInput(event.target.value)}
                              />
                              <label htmlFor="formId1">Course Name</label>
                            </div>
    
                           
    
    
    
                            <div className="form-floating mb-3">
                              
                              <select
                                id="programId"
                                value={programInput}
                                onChange={(event) => setProgramInput(event.target.value)}
                               className='form-select'
                              >
                                <option value="{ programInput ? programInput.id : ''}">{ programInput ? programInput.name : 'Select Program'}</option>
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
                                  {editCourse ? 'Update' : 'Add'}
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
  )
}

export default Course
