import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    description: String,
    code: String,
    stockQuantity: Number,
}, { timestamps: true, toJSON: { virtuals: true } });

export default mongoose.model('Product', productSchema);
