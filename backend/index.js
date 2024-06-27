const mongoose = require("mongoose");
const express = require("express");
const app = express();
//Cors
const cors = require("cors");
//Router
const Signupdesign = require("./view/router");

//.env
require("dotenv").config();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use("/JWT_Authentication", Signupdesign);

const port = process.env.PORT;

mongoose.connect("mongodb://127.0.0.1:27017/JWT")
.then(() => {
  app.listen(port, () => {
    console.log("DB CONNECTED & SERVER IS RUNNING on " + port);
  });
});
