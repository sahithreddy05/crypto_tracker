const aws = require("aws-sdk");

aws.config.loadFromPath("./skillreactor/config.json");
var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath("./skillreactor/config.json");

var tableName = dynamo.define('CryptoPortfolioTracker-user-sahith05', {
  hashKey: 'username',
  tableName: "CryptoPortfolioTracker-user-sahith05"
});

module.exports.handle = async (event, context) => {

  // console.log(event.queryStringParameters);
  try {
    var username = event.queryStringParameters.username;
    console.log(username);
    var res = await tableName.get(username);
    // console.log(res.attrs.assets);
    var i = Object.keys(res.attrs.assets);
    var ans = [];
    for (var j = 0; j < i.length; j++) {
      ans.push({ token: i[j], quantity: res.attrs.assets[i[j]].quantity });
      // console.log(Object.values(res.attrs.assets)[j]);
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
