import React from "react";
import {useNavigate} from "react-router-dom"
import {useEffect} from "react";


function Dashboard() {

    const navigate = useNavigate()
    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate('/')
      }
    }, [])
    
    return(
        
        
        <div>
        <h1 id="dashboard_heading">Dashboard</h1>
        <table>
  <tr>
     <th class="table_heading">Token</th>
    <th class="table_heading">Qty. Owned</th>
    <th class="table_heading">Price</th>
    <th class="table_heading">Total Value</th>
    <th class="table_heading">Allocation</th>
  </tr>
  <tr>
    <td class="table_data">bitcoin</td>
    <td class="table_data">0.5</td>
    <td class="table_data">10000</td>
    <td class="table_data">5000</td>
    <td class="table_data">50%</td>
    
  </tr>
  <tr>
    <td class="table_data">ethereum</td>
    <td class="table_data">25</td>
    <td class="table_data">200</td>
    <td class="table_data">5000</td>
    <td class="table_data">50%</td>
  </tr>
</table>
      Token  <input id="dashboard_token"/>
      Qty. Owned  <input id="dashboard_quantity"/>
      <button id="dashboard_add_button" >Add Asset</button>

        </div>          
       
       
    );
    
}
export default Dashboard;
