import './App.css';
import { useState } from "react";

function App() {
  let keyCounter = 0;
  let [employees, setEmployees] = useState([]);

  let getEmployees = async () => {

    let reqOptions = {
      method: "GET",
    };
    
    let JSONData = await fetch("/getEmployees", reqOptions);

    let JSOData = await JSONData.json();

    setEmployees(JSOData);
    console.log(JSOData);
  };
  return (
    <div className="App">
      <button
        onClick={() => {
          getEmployees();
        }}>Get Employees</button>
      <br></br>
      <br></br>
      <br></br>
      <table>
        <thead>
          <th>name</th>
          <th>gender</th>
          <th>mobileNo</th>
          <th>email</th>
          <th>age</th>
          <th>department</th>
          <th>location</th>
        </thead>
        <tbody>
          {employees.map((emp) => {
        keyCounter++;
        return <tr key={keyCounter}>
          <td key={keyCounter}>{emp.name}</td>
          <td key={keyCounter}>{emp.gender}</td>
          <td key={keyCounter}>{emp.mobileNo}</td>
          <td key={keyCounter}>{emp.email}</td>
          <td key={keyCounter}>{emp.age}</td>
          <td key={keyCounter}>{emp.department}</td>
          <td key={keyCounter}>{emp.location}</td>
        </tr>
      })}
        </tbody>
        <tfoot></tfoot>
      </table>
      
    </div>
  );
}

export default App;
