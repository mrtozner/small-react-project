import mongoose from 'mongoose';

const { Schema } = mongoose;

const productMovementSchema = Schema({
    movementType: { type: String, enum: ['INCOMING', 'OUTGOING'] },
    quantity: Number,
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true, toJSON: { virtuals: true } });

export default mongoose.model('ProductMovement', productMovementSchema);
