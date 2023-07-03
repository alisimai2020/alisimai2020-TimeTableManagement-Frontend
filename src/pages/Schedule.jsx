import React, { useEffect, useState } from 'react';
import ScheduleServices from '../services/ScheduleServices';
import CourseServices from '../services/CourseServices';
import { useNavigate } from 'react-router-dom';
import RoomServices from '../services/RoomServices';

function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const navigate = useNavigate();
  const [dayInput, setDayInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');
  const [editSchedule, setEditSchedule] = useState(null);
  const [editScheduleValue, setEditScheduleValue] = useState('');
  const [courseInput, setCourseInput] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [roomInput, setRoomInput] = useState('');
  const [roomData, setRoomData] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    fetchSchedule();
    fetchCourse();
    fetchRoom();
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

  const fetchRoom = () => {
    RoomServices.getData()
      .then((response) => {
        setRoomData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCourse = () => {
    CourseServices.getData()
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseYear = () => {
    setDisplay(false);
  };

  const handleAddSchedule = () => {
    setEditSchedule(null);
    setEditScheduleValue('');
    setRoomInput('');
    setDayInput('');
    setStartTimeInput('');
    setEndTimeInput('');
    setCourseInput('');
    setDisplay(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editSchedule) {
      const requestData = {
        course: {
          id: courseInput,
        },
        classroom: {
          id: roomInput,
        },
        day: dayInput,
        endTime: endTimeInput,
        startTime: startTimeInput,
      };

      ScheduleServices.update(editSchedule, requestData)
        .then((res) => {
          navigate('/schedule');
                  
        })
        .catch((err) => console.log(err));
    } else {
      const requestData = {
        course: {
          id: courseInput,
        },
        classroom: {
          id: roomInput,
        },
        day: dayInput,
        endTime: endTimeInput,
        startTime: startTimeInput,
      };

      ScheduleServices.create(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/schedule');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateStudent = (ids, day, course, room) => {
    setEditSchedule(ids);
    setEditScheduleValue(ids);
    setDayInput(day);
    setStartTimeInput(room.startTime);
    setEndTimeInput(room.endTime);
    setRoomInput(room.id);
    setCourseInput(course.id);
    setDisplay(true);
  };
  

  const deletehandleSubmit = (ids) => {
    ScheduleServices.delete(ids)
      .then((response) => {
        alert('Data Deleted Successfully!');
        navigate('/schedule');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filterDataByDay = (day) => {
    return scheduleData.filter((schedule) => schedule.day === day);
  };
  return (
    <div className="p-5">
     

    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-md-8 p-4 mb-3  rounded " style={{backgroundColor:"whitesmoke"}}>
    
          <button onClick={handleAddSchedule} className="btn btn-primary">
            Add Schedule
          </button>
        
      {display && (
        <div className="row mt-2">
          <div className="col-md-4 offset-md-4">
            <div className="card">
              <div className="card-header">
                {editSchedule ? 'Edit Schedule' : 'Add Schedule'}
                <span
                  onClick={handleCloseYear}
                  style={{ float: 'right', cursor: 'pointer' }}
                >
                  x
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Course</label>
                    <select
                      className="form-control"
                      value={courseInput}
                      onChange={(e) => setCourseInput(e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {courseData.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Classroom</label>
                    <select
                      className="form-control"
                      value={roomInput}
                      onChange={(e) => setRoomInput(e.target.value)}
                    >
                      <option value="">Select Classroom</option>
                      {roomData.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.number}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Day</label>
                    <select
                      className="form-control"
                      value={dayInput}
                      onChange={(e) => setDayInput(e.target.value)}
                    >
                      <option value="">Select Day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={startTimeInput}
                      onChange={(e) => setStartTimeInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={endTimeInput}
                      onChange={(e) => setEndTimeInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {editSchedule ? 'Update' : 'Add'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    
      <table className="table table-striped  bg-white rounded p-4 table-bordered w-100">
          <thead>
            <tr>
              <th>Course</th>
              <th>Classroom</th>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
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
                <td>{schedule.course.name}</td>
                <td>{schedule.classroom.number}</td>
                <td>{schedule.day}</td>
                <td>{schedule.startTime}</td>
                <td>{schedule.endTime}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateStudent(
                        schedule.id,
                        schedule.day,
                        schedule.course,
                        schedule.classroom
                      )
                    }
                    className="btn btn-primary btn-sm"
                  >
                     <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => deletehandleSubmit(schedule.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i class="bi bi-trash"></i>
                   </button>
                </td>
              </tr>
            ))}
            <tr>
            <td colSpan="6">
              <h5>Tuesday</h5> {/* Add the Monday heading */}
            </td>
          </tr>
            {filterDataByDay('Tuesday').map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.course.name}</td>
                <td>{schedule.classroom.number}</td>
                <td>{schedule.day}</td>
                <td>{schedule.startTime}</td>
                <td>{schedule.endTime}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateStudent(
                        schedule.id,
                        schedule.day,
                        schedule.course,
                        schedule.classroom
                      )
                    }
                    className="btn btn-primary btn-sm"
                  >
                     <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => deletehandleSubmit(schedule.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {filterDataByDay('Wednesday').map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.course.name}</td>
                <td>{schedule.classroom.number}</td>
                <td>{schedule.day}</td>
                <td>{schedule.startTime}</td>
                <td>{schedule.endTime}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateStudent(
                        schedule.id,
                        schedule.day,
                        schedule.course,
                        schedule.classroom
                      )
                    }
                    className="btn btn-primary btn-sm"
                  >
                     <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => deletehandleSubmit(schedule.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i class="bi bi-trash"></i>
                   </button>
                </td>
              </tr>
            ))}
            {filterDataByDay('Thursday').map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.course.name}</td>
                <td>{schedule.classroom.number}</td>
                <td>{schedule.day}</td>
                <td>{schedule.startTime}</td>
                <td>{schedule.endTime}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateStudent(
                        schedule.id,
                        schedule.day,
                        schedule.course,
                        schedule.classroom
                      )
                    }
                    className="btn btn-primary btn-sm"
                  >
                     <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => deletehandleSubmit(schedule.id)}
                    className="btn btn-danger btn-sm"
                  >
                      <i class="bi bi-trash"></i>
                   </button>
                </td>
              </tr>
            ))}
            {filterDataByDay('Friday').map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.course.name}</td>
                <td>{schedule.classroom.number}</td>
                <td>{schedule.day}</td>
                <td>{schedule.startTime}</td>
                <td>{schedule.endTime}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateStudent(
                        schedule.id,
                        schedule.day,
                        schedule.course,
                        schedule.classroom
                      )
                    }
                    className="btn btn-primary btn-sm"
                  >
                     <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => deletehandleSubmit(schedule.id)}
                    className="btn btn-danger btn-sm"
                  >
                  <i class="bi bi-trash"></i>
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
 
















    </div>
  );
}

export default Schedule;
