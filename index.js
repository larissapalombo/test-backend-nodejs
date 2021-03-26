const express = require('express');
const bodyParser = require('body-parser');
const { productController } = require('./controller/productController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/products', productController);

app.listen(port, () => console.log(`port: ${port}`));
