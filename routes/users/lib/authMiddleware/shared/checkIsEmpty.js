const { isEmpty } = require('validator');

function checkIsEmpty(req, res, next) {
  let body = req.body;

  let errObj = {};

  for (let key in body) {
    if (isEmpty(body[key])) {
      errObj[`${key}`] = body[`${key}`];
    }
  }

  if (Object.keys(errObj).length > 0) {
    return res.status(500).json({
      message: 'Error',
      error: errObj,
    });
  } else {
    next();
  }
}

module.exports = {
  checkIsEmpty,
};
