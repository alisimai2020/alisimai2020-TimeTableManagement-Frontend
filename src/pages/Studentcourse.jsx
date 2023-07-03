import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentcourseService from '../services/StudentcourseService';
import StudentService from '../services/StudentService';
import CourseServices from '../services/CourseServices';

function Studentcourse() {
  const navigate = useNavigate();
  const [studentcourseData, setStudentcourseData] = useState([]);
  const [editStudentcourse, setEditStudentcourseId] = useState(null);
  const [editStudentcourseValue, setEditStudentcourseValue] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [studentInput, setStudentInput] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [courseInput, setCourseInput] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    fetchStudent();
    fetchCourse();
    fetchStudentcourse();
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


  const fetchStudentcourse = () => {
    StudentcourseService.getData()
      .then((response) => {
        setStudentcourseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////////////////////Fetch Course Data ////////////////////////////////////////

  const fetchCourse = () => {
    CourseServices.getData()
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///////////////////CLOSE BUTTON /////////////////////////////////
  const handleClose = () => {
    setDisplay(false);
  };

  ///////////////////SET DATA AFTER SUBMIT EMPTY/////////////////////////////////

  const handleAddStudent = () => {
    setEditStudentcourseId(null);
    setEditStudentcourseValue('');
    setCourseInput('');
    setStudentInput('');
    setDisplay(true);
  };

  ///////////////////Update Data and Edit/////////////////////////////////
  // ...

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editStudentcourse) {
      const requestData = {
        status: statusInput,
        course: {
          id: courseInput,
          name: '',
        },
        student: {
          id: studentInput,
        },
      };

      StudentcourseService.update(editStudentcourse, requestData)
        .then((res) => {
          navigate('/studentcourse');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const requestData = {
        status: statusInput,
        student: {
          id: studentInput,
        },
        course: {
          id: courseInput,
        },
      };

      StudentcourseService.create(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/studentcourse');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  ///////////////////Handle Data /////////////////////////////////

  const handleUpdateStudent = (id, course, student, status) => {
    setEditStudentcourseId(id);
    setCourseInput(course.id);
    setStatusInput(status);
    setStudentInput(student.id);
    setDisplay(true);
  };

  ///////////////////Delete Data /////////////////////////////////
  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      StudentcourseService.delete(id)
        .then((res) => {
          navigate('/studentcourse');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="p-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 col-md-8 p-4 mb-3  rounded " style={{ backgroundColor: 'whitesmoke' }}>
            <button onClick={handleAddStudent} className="btn btn-primary w-25 mb-3">
              Add Student Course
            </button>

            <table className="table table-striped caption-top bg-white rounded p-4 table-bordered w-100">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentcourseData.length > 0 ? (
                  studentcourseData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.student.name}</td>
                      <td>{data.course.name}</td>
                      <td>{data.status}</td>

                      <td>
                        <button
                          onClick={() => handleUpdateStudent(data.id, data.course, data.student, data.status)}
                          className="btn btn-sm btn-info ms-1 btn-success"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          onClick={() => deletehandleSubmit(data.id)}
                          className="btn btn-sm btn-danger ms-1 btn-success"
                        >
                          <i className="bi bi-trash"></i>
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
                            name="formId1"
                            id="formId1"
                            placeholder="name"
                            value={statusInput}
                            onChange={(event) => setStatusInput(event.target.value)}
                          />
                          <label htmlFor="formId1">Status</label>
                        </div>
                        <div className="form-floating mb-3">
                          <select
                            id="studentId"
                            value={studentInput}
                            onChange={(event) => setStudentInput(event.target.value)}
                            className="form-select"
                          >
                            <option value="">Select Student</option>
                            {studentData.map((student) => (
                              <option key={student.id} value={student.id}>
                                {student.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-floating mb-3">
                          <select
                            id="courseId"
                            value={courseInput}
                            onChange={(event) => setCourseInput(event.target.value)}
                            className="form-select"
                          >
                            <option value="">Select Course</option>
                            {courseData.map((course) => (
                              <option key={course.id} value={course.id}>
                                {course.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="row">
                          <div className="col-6 justify-content-start">
                            <button type="submit" className="btn w-25 btn-outline-primary float-start">
                              {editStudentcourse ? 'Update' : 'Add'}
                            </button>
                          </div>
                          <div className="col-6 justify-content-start">
                            <button className="btn w-25 btn-outline-danger float-end" onClick={handleClose}>
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

export default Studentcourse;
