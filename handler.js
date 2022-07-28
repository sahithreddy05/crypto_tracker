const aws = require("aws-sdk");
const axios = require("axios");

aws.config.loadFromPath("./skillreactor/config.json");
var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath("./skillreactor/config.json");

var tableName = dynamo.define('CryptoPortfolioTracker-user-sahith05', {
  hashKey: 'username',
  tableName: "CryptoPortfolioTracker-user-sahith05"
});


module.exports.handle = async (event, context,callback) => {

  try {
    var username = event.queryStringParameters.username;
    console.log(username);
    var res = await tableName.get(username);
    var key = Object.keys(res.attrs.assets);
    var ans = [];
    var price;
    for (var j = 0; j < key.length; j++) {
      let log = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${key[j]}&vs_currencies=inr`)
      console.log(log.data[key[j]].inr);
      price = log.data[key[j]].inr;
      totalValue = res.attrs.assets[key[j]].quantity * price;
      ans.push({ token: key[j], quantity: res.attrs.assets[key[j]].quantity, price: price, allocation: 33, totalValue: totalValue });
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
