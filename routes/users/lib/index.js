const { checkIsEmpty } = require('./authMiddleware/shared/checkIsEmpty');

const {
  checkIsUndefined,
} = require('./authMiddleware/shared/checkIsUndefined');

const {
  validateLoginData,
} = require('./authMiddleware/authLoginMiddleware/validateLoginData');

const {
  validateCreateData,
} = require('./authMiddleware/authCreateMiddleware/validateCreateData');

const { jwtMiddleware } = require('./authMiddleware/shared/jwtMiddleware');

module.exports = {
  checkIsEmpty,
  checkIsUndefined,
  validateCreateData,
  validateLoginData,
  jwtMiddleware,
};
