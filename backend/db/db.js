const mongoose = require("mongoose");

function connectToDb() {
  const uri = process.env.MONGO_URI;
  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectToDb;
