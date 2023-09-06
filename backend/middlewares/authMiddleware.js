import { decode } from '../helpers/utils.js';

const getAuthorize = async (req, res, next) => {
  const headerAuthorize = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers['x-token'];
  if (!headerAuthorize) {
    return next(new Error('TOKEN_INVALID'));
  }
  const token = headerAuthorize.replace(process.env.JWT_TOKEN_TYPE, '').trim();
  try {
    const decoded = await decode(token);
    const { userId, sessionId } = decoded.payload;
    if (!userId) {
      return next(new Error('TOKEN_INVALID'));
    }
    req.headers.userid = userId;
    req.headers.sessionId = sessionId;
    return next();
  }
  catch (err) {
    return next(new Error(err));
  }
};

export default getAuthorize;
