import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RoomServices from '../services/RoomServices';

function Classroom() {
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();
  const [roomInput, setRoomInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [capacityInput, setCapacityInput] = useState('');
  
  const [editRoom, setEditRoomId] = useState(null);
  const [editRoomValue, setEditRoomValue] = useState('');
  

  
  useEffect(() => {
    fetchRoom();
   
  }, []);

  ////////////////////Fetch Student Data ////////////////////////////////////////
  const fetchRoom = () => {
    RoomServices.getData()
      .then((response) => {
        setRoomData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  
  ///////////////////CLOSE BUTTON /////////////////////////////////
  const handleClose = () => {
    setDisplay(false);
  };

///////////////////SET DATA AFTER SUBMIT EMPTY/////////////////////////////////

  const handleAddStudent = () => {
    setEditRoomId(null);
    setEditRoomValue('');
    setRoomInput('');
    setNumberInput('');
    setCapacityInput('');
    
    setDisplay(true);
  };
///////////////////Update Data and Edit/////////////////////////////////
 // ...

const handleSubmit = (event) => {
  event.preventDefault();

  if (editRoom) {
    const requestData = {
      capacity: capacityInput,
      number: numberInput,
      
      
    };

    RoomServices.update(editRoom, requestData)
      .then((res) => {
        navigate('/room');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  } else {
    const requestData = {
        capacity: capacityInput,
        number: numberInput,
        
      };

      RoomServices.create(requestData)
        .then((res) => {
          alert('Data Added Successfully!');
          navigate('/room');
          window.location.reload();
        })
        .catch((err) => console.log(err));
  }
};

// ...

///////////////////Handle Data /////////////////////////////////
 
const handleUpdateStudent = (id, capacity,number) => {
  setEditRoomId(id);
  setEditRoomValue(number);
  setNumberInput(number);
  setCapacityInput(capacity);
  setDisplay(true);
};


  ///////////////////Delete Data /////////////////////////////////
  const deletehandleSubmit = (id) => {
    const popMessage = window.confirm('Do you want to delete?');

    if (popMessage) {
        RoomServices.delete(id)
        .then((res) => {
          navigate('/room');
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
    
      
        <button onClick={handleAddStudent} className="btn btn-primary w-25 mb-3">
              Add Room
            </button>
    
            <table className="table table-striped caption-top bg-white rounded p-4 table-bordered w-100">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Room Name</th>
                  <th>Capacity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roomData.length > 0 ? (
                  roomData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.number}</td>
                      <td>{data.capacity}</td>
                  
    
                      <td>
                        <button
                          onClick={() => handleUpdateStudent(data.id,data.capacity,data.number)}
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
                          <h3 className="mb-5">Classroom</h3>
                          <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                               
                                placeholder="name"
                                value={capacityInput}
                                onChange={(event) => setCapacityInput(event.target.value)}
                              />
                              <label htmlFor="formId1">Capacity</label>
                            </div>
    
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                               
                                
                                placeholder="name"
                                value={numberInput}
                                onChange={(event) => setNumberInput(event.target.value)}
                              />
                              <label htmlFor="formId1">Number</label>
                            </div>
    
                            
    
                            
    
                            <div className="row">
                              <div className="col-6 justify-content-start">
                                <button
                                  type="submit"
                                  className="btn w-25 btn-outline-primary float-start"
                                >
                                  {editRoom ? 'Update' : 'Add'}
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
  )
}

export default Classroom
