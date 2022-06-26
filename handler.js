const aws = require("aws-sdk");

aws.config.loadFromPath("./skillreactor/config.json");

module.exports.handle = async (event, context) => {
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
