const express = require('express');
const app = express();

const authJwt = require('./helper/jwt.js');
const errorHandler = require('./helper/error-Handler.js');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const morgan = require('morgan');

const Product = require('./models/product');

require('dotenv').config();

const api = process.env.API_URL;

const productRouter = require('./routers/product.js');

const catgeoryRouter = require('./routers/categories.js');

const orderRouter = require('./routers/orders');

const userRouter = require('./routers/users.js');

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Router
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, catgeoryRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);

const port = 3000;
mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'eshop-database',
    })
    .then(() => {
        console.log('Database connection established');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT || port, () => {
    console.log(`server listening on port  ${port}`);
});
