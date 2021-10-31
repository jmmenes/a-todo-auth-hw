const User = require('../model/User');

const bcrypt = require('bcryptjs');

const {
  isEmpty,
  isAlpha,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
} = require('validator');

const jwt = require('jsonwebtoken');

const errorHandler = require('../../utils/errorHandler/errorHandler');

async function getUsers(req, res) {
  try {
    let payload = await User.find(req.body);

    res.json({
      message: 'Success',
      payload: payload,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error',
      error: err.message,
    });
  }
}

async function createUser(req, res) {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    let savedUser = await createdUser.save();

    res.json({
      message: 'Success',
      payload: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error',
      error: errorHandler(err),
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    let foundUser = await User.findOne({
      email: email,
    });

    if (!foundUser) {
      return res.status(500).json({
        message: 'error',
        error: 'Sign up',
      });
    } else {
      let comparedPassword = await bcrypt.compare(password, foundUser.password);
      if (!comparedPassword) {
        return res.status(500).json({
          message: 'error',
          error: 'check your email and password',
        });
      } else {
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '24h',
          }
        );

        return res.json({
          message: 'Success',
          payload: jwtToken,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: 'error',
      error: err.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { password } = req.body;

    let decodedData = jwt.decode(
      req.headers.authorization.slice(7),
      process.env.SECRET_KEY
    );

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;

    let updatedUser = await User.findOneAndUpdate(
      {
        email: decodedData.email,
      },
      req.body,
      {
        new: true,
      }
    );

    res.json({
      message: 'Success',
      payload: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: 'error',
      error: err.message,
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  loginUser,
  updateUser,
};
