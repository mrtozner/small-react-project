import User from '../models/User.js';


export const createUser = async (data) => User.create(data);

export const getUserById = async (id) => User.findOne({ _id: id }).lean();

export const getUserByEmail = async ({ email }) => User.findOne({ email }).lean();

export const getUserByUsername = async ({ username }) => User.findOne({ username }).lean();
