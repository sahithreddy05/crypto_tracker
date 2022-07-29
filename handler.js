const aws = require("aws-sdk");
const axios = require("axios");

aws.config.loadFromPath("./skillreactor/config.json");
var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath("./skillreactor/config.json");

var tableName = dynamo.define('CryptoPortfolioTracker-user-sahith05', {
  hashKey: 'username',
  tableName: "CryptoPortfolioTracker-user-sahith05"
});


module.exports.handle = async (event, context, callback) => {

  try {
    var username = event.queryStringParameters.username;
    console.log(username);
    var res = await tableName.get(username);
    var key = Object.keys(res.attrs.assets);
    var ans = [];
    var sum = 0;

    for (let j = 0; j < key.length; j++) {
      let log = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${key[j]}&vs_currencies=usd`).then(res => {
        return res.data;
      });
      // console.log(log.data[key[j]].inr);
      // let price = log.data[key[j]].usd;
      let price = log[key[j]].usd;
      // console.log(price);
      let totalValue = Math.round(res.attrs.assets[key[j]].quantity * price);
      sum = sum + totalValue;
    }

    for (let j = 0; j < key.length; j++) {
      let log = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${key[j]}&vs_currencies=usd`).then(function (response) {
        // return response.data[key[j]].usd;
        return response.data
      });

      // console.log(log.data[key[j]].inr);
      console.log(log);

      let price = log[key[j]].usd;
      let totalValue = Math.round(res.attrs.assets[key[j]].quantity * price);

      let allocation = Math.round((totalValue / sum) * 100);
      ans.push({ token: key[j], quantity: res.attrs.assets[key[j]].quantity, price: price, totalValue: totalValue, allocation: allocation });
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify(ans)
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify("Username not provided")
    };
  }
};
