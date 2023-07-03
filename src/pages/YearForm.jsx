import React, { useEffect, useState } from 'react'
import StudentService from '../services/StudentService';
import YearServices from '../services/YearServices';
import { useNavigate } from 'react-router-dom';

function YearForm() {
  
  const navigate = useNavigate();

  
  const [editYear, setEditYearId] = useState(null);
  const [editYearValue, setEditYearValue] = useState('');

  const [yearInput, setYearInput] = useState('');
  const [yearData, setYearData] = useState([]);

  
  useEffect(() => {
    
    fetchYear();
    
  }, []);

  ////////////////////Fetch Student Data ////////////////////////////////////////
  const fetchYear = () => {
    YearServices.getYear()
      .then((response) => {
        setYearData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  
  ///////////////////CLOSE BUTTON /////////////////////////////////
  const handleCloseYear = () => {
    setDisplay(false);
  };

///////////////////SET DATA AFTER SUBMIT EMPTY/////////////////////////////////

  const handleAddYear = () => {
    setEditYearId(null);
    setEditYearValue('');
    setYearInput('');
    setDisplay(true);
  };
///////////////////Update Data and Edit/////////////////////////////////
 

const handleSubmit = (event) => {
  event.preventDefault();

  if (editYear) {
    const requestData = {
    
        year_name: yearInput
  
    };

    YearServices.updateYear(editYear, requestData)
      .then((res) => {
        navigate('/year');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  } else {
    // ...
    const requestData = {
    
      year_name: yearInput

  };

  YearServices.createYear(requestData)
    .then((res) => {
      alert('Data Added Successfully!');
      navigate('/year');
      window.location.reload();
    })
    .catch((err) => console.log(err));
  }
};

///////////////////Handle Data /////////////////////////////////
 
const handleUpdateStudent = (id,  name, ) => {
  setEditYearId(id);
  setEditYearValue(name);
  setYearInput(name);
 
  setDisplay(true);
};


  ///////////////////Delete Data /////////////////////////////////
  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
      YearServices.deleteYear(id)
        .then((res) => {
          navigate('/year');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const [display, setDisplay] = useState(false);

  return (
    <div className="p-5">
     

    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-md-8 p-4 mb-3  rounded " style={{backgroundColor:"whitesmoke"}}>
    
      
        <button onClick={handleAddYear} className="btn btn-primary w-25 mb-3">
              Add Year
            </button>
    
            <table className="table table-striped caption-top bg-white rounded p-4 table-bordered w-100">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Year</th>
                 
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {yearData.length > 0 ? (
                  yearData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                     
                      <td>{data.year_name}</td>
    
                      <td>
                        <button
                          onClick={() => handleUpdateStudent(data.id,data.year_name)}
                          className="btn btn-sm btn-info ms-1 btn-success"
                        >
                         <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                          onClick={() => deletehandleSubmit(data.id)}
                          className="btn btn-sm btn-danger ms-1 btn-success"
                        >
                         <i class="bi bi-trash"></i>
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
                          <h3 className="mb-5">Year</h3>
                          <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                               
                                placeholder="name"
                                value={yearInput}
                                onChange={(event) => setYearInput(event.target.value)}
                              />
                              <label htmlFor="formId1">Year Name</label>
                            </div>
    
                            
    
                            <div className="row">
                              <div className="col-6 justify-content-start">
                                <button
                                  type="submit"
                                  className="btn w-25 btn-outline-primary float-start"
                                >
                                  {editYear ? 'Update' : 'Add'}
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

export default YearForm
