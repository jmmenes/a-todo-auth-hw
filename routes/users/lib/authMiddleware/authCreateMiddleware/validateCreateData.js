const {
  isEmpty,
  isAlpha,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
} = require('validator');

function validateCreateData(req, res, next) {
  const { firstName, lastName, username, email, password } = req.body;

  let errObj = {};

  if (!isAlpha(firstName)) {
    errObj.firstName = 'First name cannot have special characters or numbers';
  }

  if (!isAlpha(lastName)) {
    errObj.lastName = 'Last name cannot have special characters or numbers';
  }

  if (!isAlphanumeric(username)) {
    errObj.username = 'Username cannot have special characters';
  }

  if (!isEmail(email)) {
    errObj.email = 'Email must be a valid address';
  }

  if (!isStrongPassword(password)) {
    errObj.password =
      'Password must be 8 characters, contain 1 letter, 1 number, 1 special character, and one uppercase letter';
  }

  if (Object.keys(errObj).length > 0) {
    return res.json({
      message: 'error /validateCreateData',
      error: errObj,
    });
  } else {
    next();
  }
}

module.exports = {
  validateCreateData,
};
