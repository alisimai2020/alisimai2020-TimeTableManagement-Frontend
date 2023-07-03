import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';
import RoleServices from '../services/RoleServices';
import UserServices from '../services/UserServices';

function User() {
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchRole();
  }, []);

  const fetchUser = () => {
    UserServices.getData()
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchRole = () => {
    RoleServices.getData()
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddUser = () => {
    setEditUser(null);
    setUsernameInput('');
    setPasswordInput('');
    setStatusInput('');
    setRoleInput('');
    setDisplay(true);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editUser) {
      const requestData = {
        password: passwordInput,
        status: statusInput,
        username: usernameInput,
        role: {
          id: roleInput,
          roleName: '', // This field is not used in the update request
        },
      };

      UserServices.update(editUser, requestData)
        .then((res) => {
          navigate('/user');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const requestData = {
        password: passwordInput,
        status: statusInput,
        username: usernameInput,
        
        role: {
          id:  roleInput,
        },
      };

      UserServices.create(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/user');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateUser = (id, username, password, role, status) => {
    setEditUser(id);
    setUsernameInput(username);
    setPasswordInput(password);
    setStatusInput(status);
    setRoleInput(role.id);
    setDisplay(true);
  };

  const handleDeleteUser = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      UserServices.delete(id)
        .then((res) => {
          navigate('/user');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="p-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-8 p-4 mb-3 rounded" style={{ backgroundColor: 'whitesmoke' }}>
            <button onClick={handleAddUser} className="btn btn-primary w-25 mb-3">
              Add User
            </button>

            <table className="table table-striped caption-top bg-white rounded p-4 table-bordered w-100">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.username}</td>
                      <td>{data.password}</td>
                      <td>{data.status}</td>
                      <td>{data.role.roleName}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleUpdateUser(data.id, data.username, data.password, data.role, data.status)
                          }
                          className="btn btn-sm btn-info ms-1 btn-success"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(data.id)}
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
                      <h3 className="mb-5">User</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name"
                            value={usernameInput}
                            onChange={(event) => setUsernameInput(event.target.value)}
                          />
                          <label htmlFor="formId1">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            value={passwordInput}
                            onChange={(event) => setPasswordInput(event.target.value)}
                          />
                          <label htmlFor="formId1">Password</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="status"
                            value={statusInput}
                            onChange={(event) => setStatusInput(event.target.value)}
                          />
                          <label htmlFor="formId1">Status</label>
                        </div>

                        <div className="form-floating mb-3">
                          <select
                            id="roleId"
                            value={roleInput}
                            onChange={(event) => setRoleInput(event.target.value)}
                            className="form-select"
                          >
                            <option value="">Select Role</option>
                            {roleData.map((roleData) => (
                              <option key={roleData.id} value={roleData.id}>
                                {roleData.roleName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="row">
                          <div className="col-6 justify-content-start">
                            <button type="submit" className="btn w-25 btn-outline-primary float-start">
                              {editUser ? 'Update' : 'Add'}
                            </button>
                          </div>
                          <div className="col-6 justify-content-start">
                            <button
                              className="btn w-25 btn-outline-danger float-end"
                              onClick={handleClose}
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

export default User;
