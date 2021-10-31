const undefined = '';

function checkIsUndefined(req, res, next) {
  if (Object.keys(req.body).length === 0 || req.body === undefined) {
    return res.status(500).json({
      message: 'Error',
      error: 'please fill out form',
    });
  } else {
    next();
  }
}

module.exports = {
  checkIsUndefined,
};
