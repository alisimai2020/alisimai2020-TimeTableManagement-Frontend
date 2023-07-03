import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', {
        username,
        password,
      });

      const roleName = response.data;

      // Store the role name and username in local storage
      localStorage.setItem('role', roleName);
      localStorage.setItem('username', username);

      // Redirect to the desired page after successful login
      navigate('/index');
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login error:', error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
      <div className="container-fluid py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <form onSubmit={handleLogin}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                 

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="username">Username</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="row">
                    <div className="col">
                      <button
                        type="submit"
                        className="btn form-control btn-outline-primary mb-5"
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="d-grid gap-2">
                        <Link
                          to={'/teacher-create'}
                          className="btn btn-primary mb-3"
                          style={{
                            color: 'white',
                            textDecoration: 'none',
                          }}
                        >
                          Register Teacher
                        </Link>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="d-grid gap-2">
                        <Link
                          to={'/student-create'}
                          className="btn btn-primary mb-3"
                          style={{
                            color: 'white',
                            textDecoration: 'none',
                          }}
                        >
                          Register Student
                        </Link>
                      </div>
                    </div>
                  </div>

             

                  {error && <p className='text-danger fs-5'>{error}</p>}
                </div>
              </form>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
