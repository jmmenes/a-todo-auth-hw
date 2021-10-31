5;
const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
  try {
    if (req.headers && req.headers.authorization) {
      let notDecodedToken = req.headers.authorization;

      let slicedToken = notDecodedToken.slice(7);

      let decodedToken = jwt.verify(slicedToken, process.env.SECRET_KEY);

      res.locals.decodedData = decodedToken;

      next();
    } else {
      throw {
        message: 'Authorization Fail',
      };
    }
  } catch (e) {
    res.status(500).json({
      message: 'error',
      error: e.message,
    });
  }
}
module.exports = {
  jwtMiddleware,
};
