import express from 'express';
import * as productController from '../controllers/productController.js';
import * as productMovementController from '../controllers/productMovementController.js';
import catchError from '../helpers/catchError.js';
import authMiddleware from '../middlewares/authMiddleware.js'


const router = express.Router();

router.use(authMiddleware);

router.get('/', catchError(productController.getProducts));

router.post('/', catchError(productController.createProduct));

router.put('/:id', catchError(productController.updateProductById));

router.delete('/:id', catchError(productController.deleteProductById));

router.get('/movements/:id', catchError(productMovementController.getProductMovementsByProductId));

export default router;
