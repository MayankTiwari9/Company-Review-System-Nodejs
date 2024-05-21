const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const sequelize = require("./utils/database");

const companyRoutes = require('./routes/company');

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(companyRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => console.log(err));
