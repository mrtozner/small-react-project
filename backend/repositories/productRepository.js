import Product from '../models/Product.js';

export const getProducts = async (page, limit, filter) => Product.find(filter)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean();

export const productsCount = async (filter) => Product.countDocuments(filter);

export const createProduct = async (data) => Product.create(data);

export const getProductById = async (id) => Product.findOne({ _id: id }).lean();

export const getProductByCode = async (code) => Product.findOne({ code }).lean();

export const updateProductById = async (id, data) => Product.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }).lean();

export const deleteProductById = (id) => Product.findOneAndRemove({
      _id: id,
    }).lean();
