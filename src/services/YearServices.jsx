import axios from 'axios'

const YEAR_API_URL = "http://localhost:8080/api/v1/year"
class YearServices{
    getYear(){
        return axios.get(YEAR_API_URL);
    }

    createYear(year){
        return axios.post(YEAR_API_URL,year);
    }

    getYearById(yearId) {
        return axios.get(YEAR_API_URL + '/' + yearId);
    }
    updateYear(yearId, updatedData) {
        return axios.put(YEAR_API_URL + '/' + yearId, updatedData);
    }
    deleteYear(yearId){
        return axios.delete(YEAR_API_URL + '/' + yearId);
    }
}

export default new YearServices();