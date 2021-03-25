const { Router } = require('express');
const { products } = require('../model/index');
const { validateProduct } = require('../middleware/validateProduct');

const productController = Router();

productController.post('/', validateProduct, async (req, res) => {
  const { title, description, price, category } = req.body;
  const addProduct = await products.add('products', { title, description, price, category });

  res.status(201).json(addProduct);
});

productController.get('/', async (_req, res) => {
  const findAllProducts = await products.findAll('products');

  res.status(200).json({ products: findAllProducts });
});

productController.get('/:title', validateProduct, async (req, res) => {
  const { title } = req.params;
  const findProductByName = await products.findByName('products', title);

  res.status(200).json(findProductByName);
});

productController.get('/:category', validateProduct, async (req, res) => {
  const { category } = req.params;
  const findProductByCategory = await products.findByCategory('products', category);

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

module.exports = { productController };
