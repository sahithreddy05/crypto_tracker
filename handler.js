const aws = require("aws-sdk");

aws.config.loadFromPath("./skillreactor/config.json");
// let client = new aws.DynamoDB.DocumentClient();
var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath("./skillreactor/config.json");

var table =
  dynamo.define('Table', {
    hashKey: 'username',
    tableName: 'CryptoPortfolioTracker-user-sahith05',
  })
// tableName:"CryptoPortfolioTracker-user-sahith05";
module.exports.handle = async (event, context) => {
  let data = (event.body) ? JSON.parse(event.body) : {};
  console.log(data);
  let token = data.token;
  console.log(token);
  let quantity = data.quantity;
  console.log(quantity);
  let action = data.action;
  console.log(action);
  if (data.username && data.token && quantity) {

    let user = await table.get(data.username);
    console.log(user.attrs);
    let ans = { ...user.attrs.assets, [X = token]: { quantity: quantity } };
    let res = await table.update({
      username: data.username,
      assets: ans,
    });
    console.log(res);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: "Hello!",
    };
  }
  else if (data.username && data.token && action == 'DELETE') {
    let user = await table.get(data.username);
    let req = delete user.attrs.assets[token];

    let res = await table.update({ username: data.username, assets: user.attrs.assets });
    console.log(user.attrs.assets);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: "Hello!",
    }
  }
  else {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: "Hello!",
    };
  }
}