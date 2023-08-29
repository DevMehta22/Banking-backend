const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require('./Routes/accRoutes')
const app = express();

app.use(express.json())
app.use('/api/user',routes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    const port = process.env.PORT || 5500;
    app.listen(port, (err) => {
      if (err) throw err;
      console.log(`server is running on port:${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
