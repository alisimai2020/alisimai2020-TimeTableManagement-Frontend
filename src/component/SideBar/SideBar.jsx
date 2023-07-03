import React,{ useState }  from 'react'
import './sidebar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'

function SideBar() {
  
 
      return (

        <div className='Sidebar d-flex justify-content-between flex-column bg-dark py-3 text-white vh-100'>
            <div>

                <a href='' className='head text-white'>
                   
                    <span className='fs-4'> TIME TABLE MANAGEMENT</span>
                </a>
                <hr className='text-white mt-1' />

                <ul className='nav nav-pills  flex-column  mt-3'>
                    <li className="nav-item p-2">

                        <Link to={"/index"} className='p-2 text-white'>
                            <i className='bi bi-speedometer2 fs-4 me-4'></i>
                            <span className='fs-4'> Dashboard</span>
                        </Link>
                    </li> <hr className='text-white mt-1' />
                    <li cclassName="nav-item p-2">

                        <Link  to={"/user"} className='p-2 text-white'>
                           
                            <i class="bi bi-person-add fs-4 me-4"></i>
                            <span className='fs-4'> <strong>Users</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />

                    <li className="nav-item p-2">

                        <Link to={"/room"} className='p-2 text-white'>
                           
                            <i class="bi bi-house-fill fs-4 me-4"></i>
                            <span className='fs-4'> <strong>Class</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />
                    <li className="nav-item p-2">

                        <Link to={"/schedule"} className='p-2 text-white'>
                           
                            <i class="bi bi-calendar fs-4 me-4"></i>
                            <span className='fs-4'> <strong>Schedule</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />
                    <li className="nav-item p-2">

                        <Link to={"/index"} className='p-2 text-white'>
                           
                            <i class="bi bi-book fs-4 me-4"></i>
                            <span className='fs-4'> <strong>Course</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />

                    <li className="nav-item p-2">

                        <Link to={"/studentcourse"} className='p-2 text-white'>
                           
                            <i class="bi bi-book fs-4 me-4"></i>
                            <span className='fs-4'> <strong>Student Course</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />
                    <li className="nav-item p-2">

                        <Link to={"/teacher"} className='p-2 text-white'>
                            <i className='bi bi-file-person fs-4 me-4'></i>
                            
                            <span className='fs-4'> <strong>Teacher</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />
                    <li className="nav-item p-2">

                        <Link to={"/year"} className='p-2 text-white'>
                            <i className='bi bi-calendar-check-fill fs-4 me-4'></i>
                            <span className='fs-4'> <strong>Year</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />
                    <li className="nav-item p-2">

                        <Link to={"/role"} className='p-2 text-white'>
                            <i className='bi bi-person-workspace fs-4 me-4'></i>
                            <span className='fs-4'> <strong>Role</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />

                    <li className="nav-item p-2">

                        <Link to={"/program"} className='p-2 text-white'>
                            <i className='bi bi-people fs-4 me-4'></i>
                            <span className='fs-4'> <strong>Program</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />

                    <li className="nav-item p-2">

                        <Link  to={"/student"} className='p-2 text-white'>
                            <i className='bi bi-mortarboard-fill fs-4 me-4'></i>
                            <span className='fs-4'> <strong>Student</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />

                    <li className="nav-item p-2">

                        <Link to={"/department"} className='p-2 text-white'>
                            <i className='bi bi-house-door-fill fs-4 me-4'></i>
                            <span className='fs-4'> <strong>Department</strong></span>
                        </Link>
                    </li> <hr className='text-white mt-1' />


                     







                </ul>

            </div>
        </div>
    )
}


export default SideBar