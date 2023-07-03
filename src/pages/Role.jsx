import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import YearServRoleServicesices from '../services/RoleServices';
import RoleServices from '../services/RoleServices';

function Role() {
  const [roleData, setRoleData] = useState([]);
  const navigate = useNavigate();
  const [roleInput, setRoleInput] = useState('');
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleValue, setEditRoleValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    RoleServices.getData()
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddRole = () => {
    setEditRoleId(null);
    setEditRoleValue('');
    setRoleInput('');
    setDisplay({ display: 'block' });
  };

  const handleCloseRole = () => {
    setDisplay({ display: 'none' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editRoleId) {
      const requestData = {
        roleName: roleInput,
      };

      RoleServices.update(editRoleId, requestData)
        .then((res) => {
         
          navigate('/role');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const requestData = {
        roleName: roleInput,
      };

      RoleServices.create(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/role');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateRole = (id, role) => {
    setEditRoleId(id);
    setEditRoleValue(role);
    setRoleInput(role);
    setDisplay({ display: 'block' });
  };

  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      RoleServices.delete(id)
        .then((res) => {
          navigate('/role');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const [display, setDisplay] = useState({
    display: 'none',
  });

  return (
    <div className="p-5 bg-light">
    <div className="p-1">
      <button onClick={handleAddRole} className="btn btn-primary w-25">
        Add Role
      </button>

      <table className="table table-striped  caption-top  bg-white rounded p-4 table-bordered  w-75">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roleData.length > 0 ? (
            roleData.map((data, index) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.roleName}</td>
                <td>
                  <button
                    onClick={() => handleUpdateRole(data.id, data.year)}
                    className="btn btn-sm btn-info ms-1 btn-success"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletehandleSubmit(data.id)}
                    className="btn btn-sm btn-danger ms-1 btn-success"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div style={display} className="mt-5">
      <div>
        <div className="container-fluid py-5 h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">ROLE FORM</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="formId1"
                        id="formId1"
                        placeholder="name"
                        value={roleInput}
                        onChange={(event) => setRoleInput(event.target.value)}
                      />
                      <label htmlFor="formId1">Role </label>
                    </div>
                    <div className="row">
                      <div className="col-6 justify-content-start">
                        <button
                          type="submit"
                          className="btn w-25 btn-outline-primary float-start"
                        >
                          {editRoleId ? 'Update' : 'Add'}
                        </button>
                      </div>
                      <div className="col-6 justify-content-start">
                        <button
                          className="btn w-25 btn-outline-danger float-end"
                          onClick={handleCloseRole}
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
  </div>
);
  
}
export default Role