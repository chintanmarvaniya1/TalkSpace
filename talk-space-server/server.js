const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require('./DB/connection');
const app = require('./app');

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`🔥 Express running → On PORT : ${process.env.PORT}`);
});
