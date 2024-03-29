
import axios from 'axios'


const EMPLOYEE_API_URL ="http://localhost:8080/api/v1/employees";

class EmployeeService{
    getEmployee(){
        return axios.get(EMPLOYEE_API_URL);
    }
    createEmployee(employee){
        return axios.post(EMPLOYEE_API_URL,employee);
    }
    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_URL + '/' + employeeId);
    }
    updateEmployee(employeeId, updatedData) {
        return axios.put(EMPLOYEE_API_URL + '/' + employeeId, updatedData);
    }
    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_URL + '/' + employeeId);
    }
}
export default new EmployeeService();

