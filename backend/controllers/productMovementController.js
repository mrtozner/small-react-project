import * as productMovementService from '../services/productMovementService.js';

export const getProductMovementsByProductId = async (req, res) => {
    const id = req.params.id;
    const response = await productMovementService.getProductMovementsByProductId(id);
    res.json(response);
};
