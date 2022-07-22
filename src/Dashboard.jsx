import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from 'axios';

function Dashboard() {

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])

  const [token, setToken] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleToken = (e) => {
    setToken(e.target.value)
  }
  const handleQuantity = (e) => {
    setQuantity(e.target.value)
  }

  const handleAssetApi = () => {


    if (token === '' && quantity === '') {
      document.getElementById('add_asset_error').innerHTML = "Error: Please fill all the details";

    }
    else {

      axios.post("https://components.skillreactor.io/CryptoPortfolioTracker/sahith05/assets-service", {

        "token": token,
        "quantity": Number(quantity),
        "username": localStorage.getItem("Username")

      })
        .then(response => {
          let statusCode = response.data;

          console.log(statusCode);


        })
        .catch(error => {
          console.log(error.response.status);

        })
    }
  }

  return (


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
      Token  <input type="text" value={token} onChange={handleToken} id="dashboard_token" />
      Qty. Owned  <input type="number" value={quantity} onChange={handleQuantity} id="dashboard_quantity" />
      <button id="dashboard_add_button" onClick={handleAssetApi}  >Add Asset</button>
      <p id="add_asset_error"></p>
    </div>


  );

}
export default Dashboard;
