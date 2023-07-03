import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import EmployeeForm from './pages/employeeForm';
import UpdateEmployee from './pages/updateEmployee';
import SideBar from './component/SideBar/SideBar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Navbar from './component/Navbar/Navbar';
import Login from './pages/Login';
import StudentForm from './pages/StudentForm';
import TeacherForm from './pages/TeacherForm';
import YearForm from './pages/YearForm';
import Role from './pages/Role';
import Department from './pages/Department';
import Program from './pages/Program';
import Teacher from './pages/Teacher';
import Index from './pages/Index';
import Student from './pages/Student';
import Course from './pages/Course';
import Schedule from './pages/Schedule';
import Studentcourse from './pages/Studentcourse';
import Classroom from './pages/Classroom';
import User from './pages/User';
import UserContext from './pages/UserContext';
import { useEffect, useState } from 'react';

function App() {
  const [toggle, setToggle] = useState(false);

  function Toggle() {
    setToggle(!toggle);
  }

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 768) {
        setToggle(false);
      }
    };

    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return (
    <Router>
      <div className="d-flex">
        {!window.location.pathname.includes('/student-create') && !window.location.pathname.includes('/teacher-create') && (
          <div className={window.location.pathname === '/' ? 'd-none' : toggle ? 'd-none' : 'w-auto position-fixed'}>
            <SideBar />
          </div>
        )}

        {!window.location.pathname.includes('/student-create') && !window.location.pathname.includes('/teacher-create') && (
          <div className={window.location.pathname === '/' ? 'd-none' : toggle ? 'd-none' : 'invisible'}>
            <SideBar />
          </div>
        )}

        <div className="col  overflow-auto">
          {window.location.pathname !== '/' && window.location.pathname !== '/student-create' && window.location.pathname !== '/teacher-create' && <Navbar Toggle={Toggle} />}

          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/employee" element={<Home />} />
            <Route path="/student-create" element={<StudentForm />} />
            <Route path="/teacher-create" element={<TeacherForm />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/role" element={<Role />} />
            <Route path="/index" element={<Index />} />
            <Route path="/program" element={<Program />} />
            <Route path="/student" element={<Student />} />
            <Route path="/user" element={<User />} />
            <Route path="/studentcourse" element={<Studentcourse />} />
            <Route path="/department" element={<Department />} />
            <Route path="/year" element={<YearForm />} />
            <Route path="/create" element={<EmployeeForm />} />
            <Route path="/course" element={<Course />} />
            <Route path="/room" element={<Classroom />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/update/:id" element={<UpdateEmployee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
