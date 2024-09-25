const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDb connection successfull");
});

connection.on("error", () => {
  console.log("MongoDb connection failed");
});

module.exports = connection;
