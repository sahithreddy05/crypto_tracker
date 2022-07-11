const aws = require("aws-sdk");
const crypto = require("crypto");
var jwt = require('jsonwebtoken');
aws.config.loadFromPath("./skillreactor/config.json");
module.exports.handle = async (event, context) => {

  // console.log(event.body);
  const body = JSON.parse(event.body);
  // console.log(body.username);

  let pass = crypto.createHash("sha256").update(body.password).digest("hex");
  // console.log(pass);
  var params = {
    TableName: "CryptoPortfolioTracker-user-sahith05",
    Key: {
      username: body.username,
    }
  };

  let docClient = new aws.DynamoDB.DocumentClient();

  let data = await docClient.get(params).promise();
  console.log(data);

  if (data.Item.password == pass) {
    var token = jwt.sign({
      username: body.username,
    }, 'secret', {
      algorithm: 'HS256'
    })
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: token,
    };
  } else {
    return {
      statusCode: 401,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: "Invalid Credentials",
    };
  }
};
