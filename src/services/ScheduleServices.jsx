import axios from 'axios';
import React from 'react'


const API_URL = "http://localhost:8080/api/v1/classshedule"

class ScheduleServices  {

    getData(){
        return axios.get(API_URL);
    }

    create(data){
        return axios.post(API_URL,data);
    }

    getByID(id) {
        return axios.get(API_URL + '/' + id);
    }
    update(id, updatedData) {
        return axios.put(API_URL + '/' + id, updatedData);
    }
    delete(id){
        return axios.delete(API_URL + '/' + id);
    }
  }


export default new ScheduleServices();
