const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const morgan = require("morgan");

const Product = require('./models/product')
require("dotenv").config();

const api = process.env.API_URL;

const productRouter = require('./routers/product.js')

//Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Router
app.use(`${api}/products`,productRouter)

const port = 3000;
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || port, () => {
  console.log(`server listening on port  ${port}`);
});
