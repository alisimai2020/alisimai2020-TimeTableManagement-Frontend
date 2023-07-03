import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import YearServices from '../services/YearServices';

function YearView() {
  const [yearData, setYearData] = useState([]);
  const navigate = useNavigate();
  const [yearInput, setYearInput] = useState('');
  const [editYearId, setEditYearId] = useState(null);
  const [editYearValue, setEditYearValue] = useState('');

  useEffect(() => {
    fetchYear();
  }, []);

  const fetchYear = () => {
    YearServices.getYear()
      .then((response) => {
        setYearData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddYear = () => {
    setEditYearId(null);
    setEditYearValue('');
    setYearInput('');
    setDisplay({ display: 'block' });
  };

  const handleCloseYear = () => {
    setDisplay({ display: 'none' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editYearId) {
      const requestData = {
        year: yearInput,
      };

      YearServices.updateYear(editYearId, requestData)
        .then((res) => {
         
          navigate('/yearView');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const requestData = {
        year: yearInput,
      };

      YearServices.createYear(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/yearView');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateYear = (id, year) => {
    setEditYearId(id);
    setEditYearValue(year);
    setYearInput(year);
    setDisplay({ display: 'block' });
  };

  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      YearServices.deleteYear(id)
        .then((res) => {
          navigate('/yearView');
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
        <button onClick={handleAddYear} className="btn btn-primary w-25">
          Add Year
        </button>

        <table className="table table-striped  caption-top  bg-white rounded p-4 table-bordered  w-75">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Year Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {yearData.length > 0 ? (
              yearData.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.year}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateYear(data.id, data.year)}
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
                    <h3 className="mb-5">YEAR FORM</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="formId1"
                          id="formId1"
                          placeholder="name"
                          value={yearInput}
                          onChange={(event) => setYearInput(event.target.value)}
                        />
                        <label htmlFor="formId1">YearName</label>
                      </div>
                      <div className="row">
                        <div className="col-6 justify-content-start">
                          <button
                            type="submit"
                            className="btn w-25 btn-outline-primary float-start"
                          >
                            {editYearId ? 'Update' : 'Add'}
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
    </div>
  );
}

export default YearView;
