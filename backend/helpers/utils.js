import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => bcrypt.hash(password, 10);

export const comparePasswords = async ({ newPassword, existingPassword }) => bcrypt.compare(newPassword, existingPassword);

export const encode = (payload, expiresIn) => jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn });

export const decode = async (token) => jwt.verify(token, process.env.JWT_SECRET);

