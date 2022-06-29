const aws = require("aws-sdk");
const dynamoDb = new aws.DynamoDB.DocumentClient();

aws.config.loadFromPath("./skillreactor/config.json");



module.exports.handle = async (event, context) => {
  let data = JSON.stringify(event.body);

  const params = {
    TableName: 'CryptoPortfolioTracker-user-sahith05',
    Item: {
      username: data.username,
      email: data.email,
      password: data.password,
    }
  }

  try {
     dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.parse(data)
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: "Hello 2"
    }
  }
}