import ProductMovement from '../models/ProductMovement.js';


export const createProductMovement = (data) => ProductMovement.create(data);

export const getProductMovementsByProductId = (id) => ProductMovement.find({ product: id }).populate('product').lean();
