var express = require('express');
var router = express.Router();
const {
  getUsers,
  createUser,
  loginUser,
  //     profileUser,
  updateUser,
} = require('./controller/usersController');

const {
  checkIsEmpty,
  checkIsUndefined,
  validateCreateData,
  validateLoginData,
  jwtMiddleware,
} = require('./lib/index');

router.get('/', jwtMiddleware, getUsers);

router.post(
  '/create-user',
  checkIsUndefined,
  checkIsEmpty,
  validateCreateData,
  createUser
);

router.post(
  '/login-user',
  checkIsUndefined,
  checkIsEmpty,
  validateLoginData,
  loginUser
);

router.put(
  '/update-user',
  jwtMiddleware,
  checkIsUndefined,
  checkIsEmpty,
  updateUser
);

module.exports = router;
