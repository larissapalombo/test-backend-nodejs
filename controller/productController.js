const express = require('express');
const { shared, products } = require('../model/index');

const productController = express.Router();

productController.post('/', async (req, res) => {
  const { title, description, price, category } = req.body;
  const addProduct = await products.add('products', { title, description, price, category });

  res.status(201).json(addProduct);
});

productController.get('/', async (_, res) => {
  const findAllProducts = await shared.findAll('products');

  res.status(200).json({ products: findAllProducts });
});

productController.get('/:name', async (req, res) => {
  const { name } = req.params;
  const findProductByName = await shared.findById('products', name);

  res.status(200).json(findProductByName);
});

productController.get('/:category', async (req, res) => {
  const { category } = req.params;
  const findProductByCategory = await shared.findById('products', category);

  res.status(200).json(findProductByCategory);
});

productController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;
  const updatedProduct = await products.update('products', id, {
    title,
    description,
    price,
    category,
  });

  res.status(200).json(updatedProduct);
});

productController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const excludedProduct = await products.exclude('products', id);

  res.status(200).json(excludedProduct);
});

module.exports = productController;
