import { comparePasswords, hashPassword, encode } from '../helpers/utils.js';
import * as userRepository from '../repositories/userRepository.js';

export const register = async ({
    email,
    password,
    password2,
    username,
    name,
    session,
  }) => {
    if (password !== password2) {
      throw new Error('PASSWORDS ARE NOT EQUAL');
    }

    const checkUserEmail = await userRepository.getUserByEmail({ email });
    const checkUserUsername = await userRepository.getUserByUsername({ username });

    if (checkUserEmail) {
        throw new Error('EMAIL ALREADY IN USE');
    }

    if (checkUserUsername) {
        throw new Error('USERNAME ALREADY IN USE');
    }

    const user = await userRepository.createUser({
        name,
        username,
        email,
        password: await hashPassword(password),
    });

    const accessToken = encode({
        userId: user._id,
        sessionId: session._id,
    }, '1y');
    return {
        user,
        session,
        accessToken,
    };
  };

export const login = async ({ email, password, session }) => {

    const user = await userRepository.getUserByEmail({ email });

    if (user == null) {
      throw new Error('USER NOT FOUND');
    }

    if (!await comparePasswords({
        newPassword: password,
        existingPassword: user.password,
    })) {
        throw new Error('CREDENTIALS NOT TRUE');
    }

    const accessToken = encode({
        userId: user._id,
        sessionId: session._id,
    }, '1h');

    return {
        user,
        accessToken,
    };
};
