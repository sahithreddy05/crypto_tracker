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

    handleGetApi()
    // eslint-disable-next-line
  }, [])


  const handleGetApi = () => {
    axios.get(`https://components.skillreactor.io/CryptoPortfolioTracker/sahith05/portfolio-service?username=${localStorage.getItem('username')}`)
      .then(function (response) {
        console.log(data);
        getData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

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

      await axios.post("https://components.skillreactor.io/CryptoPortfolioTracker/sahith05/assets-service",
        {
          "token": token,
          "quantity": Number(quantity),
          "username": localStorage.getItem("username")
        })
        .then(response => {

          console.log(response.data)
          // getData(response.data)
          handleGetApi()
          setQuantity('')
          setToken('')
        })
        .catch(error => {
          console.log(error.response.status);
        })
    }
  }

  const handleEdit = async (token, quantity) => {

    setToken(token)
    setQuantity(quantity)
  }

  const Deleteapi = async (e) => {
    console.log("token name:", e);

    getData(data.filter(item => item.token !== e))

    await axios.post("https://components.skillreactor.io/CryptoPortfolioTracker/sahith05/assets-service", {
      "username": localStorage.getItem("username"),
      "token": e,
      "action": "DELETE"
    }).then(response => {
      console.log(response.data)
      if (response.data) {
        handleGetApi()
      }
    })
      .catch(error => {
        console.log(error.response.status);
      }
      )
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <div>
      <h1 id="dashboard_heading">Dashboard</h1>
      <button id="logout_link" onClick={logout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th className="table_heading">Token</th>
            <th className="table_heading">Qty. Owned</th>
            <th className="table_heading">Price</th>
            <th className="table_heading">Total Value</th>
            <th className="table_heading">Allocation</th>
            <th className="table_heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            // <tr key={index}>
            <tr key={item.token}>
              <td className="table_data">{item.token}</td>
              <td className="table_data">{item.quantity}</td>
              <td className="table_data">${item.price}</td>
              <td className="table_data">${item.totalValue}</td>
              <td className="table_data">{item.allocation ? item.allocation : 0}%</td>
              <td className="table_data">
                <button className="delete_button" type="submit" onClick={() => Deleteapi(item.token)} >Delete</button>
                <button className="edit_button" type="submit" onClick={() => handleEdit(item.token, item.quantity)} >Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      Token < input type="text" value={token} onChange={handleToken} id="dashboard_token" />
      Qty.Owned < input type="number" value={quantity} onChange={handleQuantity} id="dashboard_quantity" />

      <button id="dashboard_save_button" onClick={handleAssetApi}  >Save Asset</button>
      <p id='add_asset_error'></p>

    </div >


  );

}
export default Dashboard;


