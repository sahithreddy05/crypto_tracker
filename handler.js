const aws = require("aws-sdk");
const dynamoDb = new aws.DynamoDB.DocumentClient();

aws.config.loadFromPath("./skillreactor/config.json");



module.exports.handle = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'CryptoPortfolioTracker-user-sahith05',
    Item: {
      username: data.username,
      email: data.email,
      password: data.password,
    }
  }

  if (data.username && data.email && data.password) {

    dynamoDb.put(params, (err) => {
      if (err) {
        console.log(err);
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
          body: "Hello 3"
        }
      } else {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
          body: "Hello 2"
        }
      }
    })
  } else {

    return {
      statusCode: 400,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: "Hello 1",
    }
  };





};
