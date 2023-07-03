
import React, { useEffect, useState } from 'react'

import './form.css';
import { useNavigate } from 'react-router-dom';
import CourseServices from '../services/CourseServices';
import StudentService from '../services/StudentService';
import YearServices from '../services/YearServices';
import StudentcourseService from '../services/StudentcourseService';
// const styles = {
//   color: 'blue',
//   fontSize: '16px',
//   fontWeight: 'bold'
// };
function StudentForm() {
  const navigate = useNavigate();
  const [studentInput, setStudentInput] = useState('');
  const [addressInput, setAdressInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  const [yearInput, setYearInput] = useState('');
  const [yearData, setYearData] = useState([]);

  const [courseInput, setCourseInput] = useState('');
  const [courseData, setCourseData] = useState([]);

  
  useEffect(() => {
    fetchCourse();
    fetchYear();
    
  }, []);

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


  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create a new student object
    const studentData = {
      name: studentInput,
      address: addressInput,
      phoneNumber: phoneInput,
      email: emailInput,
      year: {
        id: yearInput,
      },
    };
  
    // Create the student first
    StudentService.create(studentData)
      .then((response) => {
        // Get the created student ID
        const studentId = response.data.id;
  
        // Create the student course object
        const studentCourseData = {
          student: {
            id: studentId,
          },
          course: {
            id: courseInput,
          },
          status: 'Enrolled',
        };
  
        // Create the student course
        StudentcourseService.create(studentCourseData)
          .then((res) => {
            alert('Data Added Successfully!');
            navigate('/');
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  

  const handleCancel = () => {
    // Handle cancel button click
    console.log('Cancel button clicked');
  };
   
    return (
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container-fluid py-5 h-50">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>

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
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}
export default StudentForm