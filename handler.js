const aws = require("aws-sdk");

aws.config.loadFromPath("./skillreactor/config.json");
let client = new aws.DynamoDB.DocumentClient();


module.exports.handle = async (event, context) => {

  let data = JSON.parse(event.body);
  let token = data.token;
  if (data.username && data.token && data.quantity) {
    var params = {
      TableName: "CryptoPortfolioTracker-user-sahith05",
      Key: { username: data.username },
      UpdateExpression: "set assets = :t ",
      ExpressionAttributeValues: {
        ":t": {
          [token]: {
            "quantity": 2
          },
          // "ethereum": {
          //   "quantity": 5
          // }
        }
      },
      ReturnValues: "UPDATED_NEW"
    }

    await client.update(params, (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(data);
      }
    }).promise();

    // data => {
    //   // console.log(data);
    //    client.update(params1, (err, data) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     else {
    //       console.log(data);
    //     }
    //   });
    // }
    // var params1 = {
    //   TableName: "CryptoPortfolioTracker-user-sahith05",
    //   Key: { username: data.username },
    //   UpdateExpression: `set assets = :t `,
    //   ExpressionAttributeValues: {
    //     ":t": { 'quantity': data.quantity }
    //   },
    //   ReturnValues: "UPDATED_NEW"
    // }

    // ['quantity'] = data.quantity

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
};
