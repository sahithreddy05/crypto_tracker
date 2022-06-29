const crypto = require('crypto');
const aws = require("aws-sdk");
const dynamoDb = new aws.DynamoDB.DocumentClient();

aws.config.loadFromPath("./skillreactor/config.json");

// console.log(data);

// console.log(val);

// console.log("hash:",hash);

module.exports.handle = async (event, context) => {
  // const data = JSON.parse(event.body);
  const data = JSON.stringify(event.body);
  let user = data.split(",")[0].split(":")[1].split("\"")[1].replace("\\", '');
  console.log(user);
  let mail = data.split(",")[1].split(":")[1].split("\"")[1].replace("\\", '');
  console.log(mail);
let pass = data.split(",")[2].split(":")[1].split("\"")[1].replace("\\", '');
console.log(pass);
let hash = crypto.createHash('sha256').update(pass).digest('hex');
  console.log(hash);
  const params = {
    TableName: 'CryptoPortfolioTracker-user-sahith05',
    Item: {
      username: user,
      email:mail,
      password: hash,
    }
  }

  try {
       await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: "sucess"
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
      body: err
    }
  }
}