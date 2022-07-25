import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from 'axios';

function Dashboard() {
  const [token, setToken] = useState('')
  const [quantity, setQuantity] = useState('')
  const [data, getData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }

    
  }, [navigate])

  useEffect(() => {
  handleGetAssetApi();
  },)

  const handleToken = (e) => {
    setToken(e.target.value)
  }


  const handleQuantity = (e) => {
    setQuantity(e.target.value)
  }

  const handleAssetApi = async () => {


    if (token === '' && quantity === '') {
      document.getElementById('add_asset_error').innerHTML = "Error: Please fill all the details";

    }
    else {

      axios.post("https://components.skillreactor.io/CryptoPortfolioTracker/sahith05/assets-service",
        {
          "token": token,
          "quantity": Number(quantity),
          "username": localStorage.getItem("username")
        })
        .then(response => {
          getData(response.data)
          setQuantity('')
          setToken('')
        })
        .catch(error => {
          console.log(error.response.status);
        })
    }
  }

  const handleGetAssetApi = async () => {

    await axios.get(`https://components.skillreactor.io/CryptoPortfolioTracker/sahith05/portfolio-service?username=${localStorage.getItem('username')}`)
      .then(function (response) {
        getData(response.data)
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <h1 id="dashboard_heading">Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th className="table_heading">Token</th>
            <th className="table_heading">Qty. Owned</th>
            <th className="table_heading">Price</th>
            <th className="table_heading">Total Value</th>
            <th className="table_heading">Allocation</th>
          </tr>
        </thead>
        <tbody>

          {data.map((item, index) => (
            <tr key={index}>
              <td className="table_data">{item.token}</td>
              <td className="table_data">{item.quantity}</td>
              <td className="table_data">{item.price}</td>
              <td className="table_data">{item.totalValue}</td>
              <td className="table_data">{item.allocation ? item.allocation : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      Token  <input type="text" value={token} onChange={handleToken} id="dashboard_token" />
      Qty. Owned  <input type="number" value={quantity} onChange={handleQuantity} id="dashboard_quantity" />

      <button id="dashboard_add_button" onClick={handleAssetApi}  >Add Asset</button>

      <p id='add_asset_error'></p>

    </div>


  );

}
export default Dashboard;
