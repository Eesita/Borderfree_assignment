import * as AWS from "aws-sdk";

// import dotenv from "dotenv";
// dotenv.config();

// AWS.config.update({
//   region: "ap-south-1",
//   endpoint: "https://dynamodb.ap-south-1.amazonaws.com",
//   secretAccessKey: "process.env.SECRET_ACCESS_KEY",
//   accessKeyId: "process.env.ACCESS_KEY_ID"
// });

AWS.config.update({
  region: "ap-south-1",
  endpoint: "https://dynamodb.ap-south-1.amazonaws.com",
  secretAccessKey: "1jS/vibbOT/zyysvgCCdniCEGwNPp8eiXwbnAKmG",
  accessKeyId: "AKIASQE3RQQGR7VW2XOB"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const fetchData = (tableName) => {
  var params = {
    TableName: tableName
  };

  return new Promise(function (resolve, reject) {
    docClient.scan(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        reject(err);
      } else {
        console.log("Successss - fetchData", data.Items);
        resolve(data.Items);
      }
    });
  });
};

export const putData = (tableName, data) => {
  var params = {
    TableName: tableName,
    Item: data
  };

  docClient.put(params, function (err, data) {
    if (err) {
      // console.log("Error - putData", err);
    } else {
      // console.log("Success - putData", data);
    }
  });
};

export const deleteData = (tableName, id) => {
  // console.log(tableName, "tableName - awsfunctions");
  // console.log(id, "id - awsfunctions");

  const params = {
    TableName: tableName,
    Key: {
      id: id
    }
  };

  return new Promise(function (resolve, reject) {
    docClient.delete(params, (error) => {
      if (error) {
        console.log(error);
        return reject("Could not delete user");
      }
      return resolve("ok");
    });
  });
};

export { fetchData };
