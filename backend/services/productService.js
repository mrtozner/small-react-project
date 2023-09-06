import * as productRepository from '../repositories/productRepository.js';
import * as productMovementService from '../services/productMovementService.js';
import {getProductById} from "../repositories/productRepository.js";

export const getProducts = async (page, limit, filter) => {

  const products = await productRepository.getProducts(page, limit, filter);
  const totalCount = await productRepository.productsCount(filter);

  return {
      products,
      totalCount,
  };
}

export const createProduct = async (data) => {
    const product = await productRepository.getProductByCode(data.code);
    if (product) throw new Error('PRODUCT ALREADY EXIST');
    if ((data.name && data.code && data.stockQuantity) == null) throw new Error("PRODUCT CANNNOT BE EMPTY")
    const response = await productRepository.createProduct(data);
    await productMovementService.createProductMovement({ quantity: data.stockQuantity, product: String(response._id) })
    return response
};

export const updateProductById = async (id, data) => {
    const product = await productRepository.getProductById(id);
    if (product.stockQuantity !== data.stockQuantity) {
        await productMovementService.createProductMovement({ quantity: data.stockQuantity - product.stockQuantity, product: id })
    }
    const response = await productRepository.updateProductById(id, data)
    return response
};

export const deleteProductById = async (id) => productRepository.deleteProductById(id);
