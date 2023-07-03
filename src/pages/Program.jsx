
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgramServices from '../services/ProgramServices';

function Program() {
  const [programData, setProgramData] = useState([]);
  const navigate = useNavigate();
  const [programInput, setProgramInput] = useState('');
  const [editprogram, setEditProgramId] = useState(null);
  const [editprogramValue, setEditProgramValue] = useState('');
  

  useEffect(() => {
    fetchPragram();
  }, []);

  const fetchPragram = () => {
    ProgramServices.getData()
      .then((response) => {
        setProgramData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddProgram = () => {
    setEditProgramId(null);
    setEditProgramValue('');
    setProgramInput('');
    setDisplay(true);
  };

  const handleCloseYear = () => {
    setDisplay(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editprogram) {
      const requestData = {
        name: programInput,
      };

      ProgramServices.update(editprogram, requestData)
        .then((res) => {
          navigate('/program');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const requestData = {
        name: programInput,
      };

      ProgramServices.create(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/program');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateProgram = (id, program) => {
    setEditProgramId(id);
    setEditProgramValue(program);
    setProgramInput(program);
    setDisplay(true);
  };

  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      ProgramServices.delete(id)
        .then((res) => {
          navigate('/program');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const [display, setDisplay] = useState(false);

  return (
    <div className="p-5 bg-light">
      <div className="p-1">
        <button onClick={handleAddProgram} className="btn btn-primary w-25">
          Add Program
        </button>

        <table className="table table-striped  caption-top  bg-white rounded p-4 table-bordered  w-75">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Program</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {programData.length > 0 ? (
              programData.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateProgram(data.id, data.name)}
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
                            value={programInput}
                            onChange={(event) => setProgramInput(event.target.value)}
                          />
                          <label htmlFor="formId1">YearName</label>
                        </div>
                        <div className="row">
                          <div className="col-6 justify-content-start">
                            <button
                              type="submit"
                              className="btn w-25 btn-outline-primary float-start"
                            >
                              {editprogram ? 'Update' : 'Add'}
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

export default Program;
