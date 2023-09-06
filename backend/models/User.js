import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
});

export default mongoose.model('User', userSchema);
