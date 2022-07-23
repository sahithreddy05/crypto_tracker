const aws = require("aws-sdk");

aws.config.loadFromPath("./skillreactor/config.json");
var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath("./skillreactor/config.json");

var tableName = dynamo.define('tableName', {
  hashKey: 'username',
  tableName: "CryptoPortfolioTracker-user-sahith05"
});

module.exports.handle = async (event, context) => {

  // console.log(event.queryStringParameters);
  try {
    var username = event.queryStringParameters.username;
    console.log(username);
    // if (username) {
    var res = await tableName.get(username);
    console.log(res);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify(res.attrs.assets)
    };
  } catch (err) {
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
