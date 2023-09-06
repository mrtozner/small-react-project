import * as productService from '../services/productService.js';

export const getProducts = async (req, res) => {
  const { page, limit } = req.query;
  const filter = JSON.parse(req.query.filter || '{}');
  const response = await productService.getProducts(page, limit, filter);
  return res.json(response);
};

export const createProduct = async (req, res) => {
  const data = req.body;
  const response = await productService.createProduct(data);
  return res.json(response);
};

export const updateProductById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const response = await productService.updateProductById(id, data);
  return res.json(response);
};

export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  const response = await productService.deleteProductById(id);
  return res.json(response);
};
