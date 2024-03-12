const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const database = require("./config/database");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const notifRoute = require("./routes/notifRoute");
const verifyToken = require("./middlewares/verifyToken");

const allowedOrigin = [process.env.DEV_ORIGIN, process.env.PROD_ORIGIN];

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigin.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
const PORT = process.env.PORT || 3000;

// app.use('/auth', authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/activity", notifRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
