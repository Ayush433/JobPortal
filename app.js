const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const checkAuth = require("./Middleware/check_auth");
const userRoutes = require("./Routes/userRoutes");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// app.use(checkAuth);

// Connection to the database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal API Ho ni haina rw !");
});
app.use(userRoutes);

//Ports
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server Started at Port number ${port}`);
});
