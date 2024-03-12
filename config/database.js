const mongoose = require("mongoose");

const connectDB = mongoose
  .connect(
    "mongodb+srv://handev:RTdBXTGuQiu4rdcP@travel-db.xvcjuel.mongodb.net/Travel-db?retryWrites=true&w=majority&appName=Travel-db"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connectDB;
