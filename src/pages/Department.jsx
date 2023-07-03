import DepartmentServices from '../services/DepartmentServices';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Department() {
  const [departmentData, setDepartmentData] = useState([]);
  const navigate = useNavigate();
  const [departmentInput, setDepartmentInput] = useState('');
  const [editDepartment, setEditDepartmentId] = useState(null);
  const [editDepartmentValue, setEditDepartmentValue] = useState('');

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = () => {
    DepartmentServices.getData()
      .then((response) => {
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddDepartment = () => {
    setEditDepartmentId(null);
    setEditDepartmentValue('');
    setDepartmentInput('');
    setDisplay(true);
  };

  const handleCloseYear = () => {
    setDisplay(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editDepartment) {
      const requestData = {
        name: departmentInput,
      };

      DepartmentServices.update(editDepartment, requestData)
        .then((res) => {
          navigate('/department');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const requestData = {
        name: departmentInput,
      };

      DepartmentServices.create(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/department');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateDepartment = (id, department) => {
    setEditDepartmentId(id);
    setEditDepartmentValue(department);
    setDepartmentInput(department);
    setDisplay(true);
  };

  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      DepartmentServices.delete(id)
        .then((res) => {
          navigate('/department');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const [display, setDisplay] = useState(false);

  return (
    <div className="p-5 bg-light">
      <div className="p-1">
        <button onClick={handleAddDepartment} className="btn btn-primary w-25">
          Add Department
        </button>

        <table className="table table-striped  caption-top  bg-white rounded p-4 table-bordered  w-75">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departmentData.length > 0 ? (
              departmentData.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateDepartment(data.id, data.name)}
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

      {display && (
        <div className="mt-5">
          <div>
            <div className="container-fluid py-5 h-50">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8">
                  <div className="card" style={{ borderRadius: '1rem' }}>
                    <div className="card-body p-5 text-center">
                      <h3 className="mb-5">DEPARTMENT FORM</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="formId1"
                            id="formId1"
                            placeholder="name"
                            value={departmentInput}
                            onChange={(event) => setDepartmentInput(event.target.value)}
                          />
                          <label htmlFor="formId1">YearName</label>
                        </div>
                        <div className="row">
                          <div className="col-6 justify-content-start">
                            <button
                              type="submit"
                              className="btn w-25 btn-outline-primary float-start"
                            >
                              {editDepartment ? 'Update' : 'Add'}
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
  );
}

export default Department;
