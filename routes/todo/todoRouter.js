var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var {
  jwtMiddleware,
} = require('../users/lib/authMiddleware/shared/jwtMiddleware');

const Todo = require('./model/Todo');
const User = require('../users/model/User');
const errorHandler = require('../utils/errorHandler/errorHandler');

const { isAlpha, isInt } = require('validator');

const { createToDo } = require('./controller/todoController');

router.get('/', function (req, res) {
  res.json({
    message: 'Todo completed',
  });
});

router.post('/create-todo', jwtMiddleware, createToDo);

router.put(
  '/update-todo-by-id/:id',
  jwtMiddleware,
  async function (req, res, next) {
    const { todoNote, todoDone } = req.body;

    let decodedData = res.locals.decodedData;

    try {
      let foundUser = await User.findOne({
        email: decodedData.email,
      });

      let foundTodo = await Todo.findById(req.params.id);

      res.json({
        message: 'Success',
        payload: updatedTodo,
      });
    } catch (err) {}
  }
);

module.exports = router;
