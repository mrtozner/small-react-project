import * as productMovementRepository from '../repositories/productMovementRepository.js';

export const createProductMovement = async (data) => {
    if (data.quantity === 0) return;
    const movementType = data.quantity > 0 ? 'INCOMING' : 'OUTGOING';
    await productMovementRepository.createProductMovement({ ...data, movementType });
};

export const getProductMovementsByProductId = (id) => productMovementRepository.getProductMovementsByProductId(id);
