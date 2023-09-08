import * as userService from '../services/userService.js';

export const authorized = async (req, res) => {
    return res.status(200).send('Authorized');
  };

export const login = async (req, res) => {
    const session = req.session;
    const {
      email, password,
    } = req.body;
    const response = await userService.login({
      email,
      password,
      session,
    });
    return res.json(response);
  };


  export const register = async (req, res) => {
      const session = req.session;
    const {
        email,
        password,
        password2,
        username,
        name,
    } = req.body;
    const response = await userService.register({
        email,
        password,
        password2,
        username,
        name,
        session,
    });
    return res.json(response);
  };
