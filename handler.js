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

  let lo = dynamoDb.put(params, (err) => {
    if (err) {
      console.log(err);
    }
    const response = {
      statusCode: 200,
    };
  })

  console.log(lo);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "*/*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: "Hello!",
  };




};
