import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ScheduleServices from '../services/ScheduleServices';

function Index() {
    const [userData, seData] = useState([]);
    const [studentData, setstudentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        fetchData();
        fetchStudent();
        fetchTeacher();
        fetchCourse();
        fetchSchedule();
      }, []);

      const fetchSchedule = () => {
        ScheduleServices.getData()
          .then((response) => {
            setScheduleData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    const fetchStudent = () => {
        axios.get("http://localhost:8080/api/v1/studentcount")
          .then((response) => {
            setstudentData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const fetchCourse = () => {
        axios.get("http://localhost:8080/api/v1/coursecount")
          .then((response) => {
            setCourseData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };


      const fetchTeacher = () => {
        axios.get("http://localhost:8080/api/v1/teachercount")
          .then((response) => {
            setTeacherData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };


      const fetchData = () => {
        axios.get("http://localhost:8080/api/v1/user/count")
          .then((response) => {
            seData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const filterDataByDay = (day) => {
        return scheduleData.filter((schedule) => schedule.day === day);
      };
  return (
    <div class="container-fluid px-4">
    <div class="row g-3 my-2">
        <div class="col-md-3">
            <div class="p-3 bg-success shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                <h1 class=" text-dark">Users</h1>
                  <strong> <center><h2 class=" text-dark">{userData}</h2></center></strong> 
                   
                    
                </div>
                <i
                    class="bi bi-person-add border-none text-dark fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
        </div>

        <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                <h1 class=" text-dark">Student</h1>
                  <strong> <center><h2 class=" text-dark">{studentData}</h2></center></strong> 
                </div>
                <i
                    class="bi bi-mortarboard-fill  text-dark fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
        </div>

        <div class="col-md-3">
            <div class="p-3 bg-info shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                <h1 class=" text-dark">Course</h1>
                  <strong> <center><h2 class=" text-dark">{courseData}</h2></center></strong> 
                </div>
                <i class="bi bi-book fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
        </div>

        <div class="col-md-3">
            <div class="p-3 bg-primary shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                <h1 class=" text-dark">Teacher</h1>
                  <strong> <center><h2 class=" text-dark">{teacherData}</h2></center></strong> 
                </div>
                <i class="bi bi-file-person fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
        </div>
    </div>
    <div className="p-5">
     

     <div className="container-fluid">
        <div className="row">
                <div className="col-lg-12 col-md-8 p-4 mb-3  rounded " style={{backgroundColor:"whitesmoke"}}>

                <table className="table table-striped  bg-white rounded p-4 table-bordered w-100">
          <thead>
            <tr>
              <th className='text-center'>Course</th>
              <th className='text-center'>Classroom</th>
              <th className='text-center'>Day</th>
              <th className='text-center'>Start Time</th>
              <th className='text-center'>End Time</th>
            
            </tr>
          </thead>
          <tbody>
          <tr>
            <td colSpan="6">
              <h5>Monday</h5> {/* Add the Monday heading */}
            </td>
          </tr>
            {filterDataByDay('Monday').map((schedule) => (
              <tr key={schedule.id}>
                <td className='text-center'>{schedule.course.name}</td>
                <td className='text-center'>{schedule.classroom.number}</td>
                <td className='text-center'>{schedule.day}</td>
                <td className='text-center'>{schedule.startTime}</td>
                <td className='text-center'>{schedule.endTime}</td>
                
              </tr>
            ))}
            <tr>
            <td colSpan="6">
              <h5>Tuesday</h5> {/* Add the Monday heading */}
            </td>
          </tr>
            {filterDataByDay('Tuesday').map((schedule) => (
              <tr key={schedule.id}>
                <td className='text-center'>{schedule.course.name}</td>
                <td className='text-center'>{schedule.classroom.number}</td>
                <td className='text-center'>{schedule.day}</td>
                <td className='text-center'>{schedule.startTime}</td>
                <td className='text-center'>{schedule.endTime}</td>
                
              </tr>
            ))}
            {filterDataByDay('Wednesday').map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.course.name}</td>
                <td>{schedule.classroom.number}</td>
                <td>{schedule.day}</td>
                <td className='text-center'>{schedule.startTime}</td>
                <td className='text-center'>{schedule.endTime}</td>
             
              </tr>
            ))}
            {filterDataByDay('Thursday').map((schedule) => (
              <tr key={schedule.id}>
                <td className='text-center'>{schedule.course.name}</td>
                <td className='text-center'>{schedule.classroom.number}</td>
                <td className='text-center'>{schedule.day}</td>
                <td className='text-center'>{schedule.startTime}</td>
                <td className='text-center'>{schedule.endTime}</td>
                
              </tr>
            ))}
            {filterDataByDay('Friday').map((schedule) => (
              <tr key={schedule.id}>
                <td className='text-center'>{schedule.course.name}</td>
                <td className='text-center'>{schedule.classroom.number}</td>
                <td className='text-center'>{schedule.day}</td>
                <td className='text-center'>{schedule.startTime}</td>
                <td className='text-center'>{schedule.endTime}</td>
              
              </tr>
            ))}
          </tbody>
        </table>


                </div>
            </div>
    </div>
</div>


</div>






  )
}

export default Index
