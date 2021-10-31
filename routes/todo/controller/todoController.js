async function createToDo(req, res) {
  try {
    const { todoDate, todoNote, todoDone, todoUser } = req.body;

    let errObj = {};

    if (!isAlpha(todoNote)) {
      errObj.todoNote = 'Alphabet Chars Only';
    }

    if (Object.keys(errObj).length > 0) {
      return res.status(500).json({
        message: 'error /create-todo',
        error: errObj,
      });
    }

    let decodedData = jwt.decode(
      req.headers.authorization.slice(7),
      process.env.SECRET_KEY
    );

    let foundUser = await User.findOne({
      email: decodedData.email,
    });

    const createdTodo = new Todo({
      todoNote,
      todoUser: foundUser._id,
    });

    let savedTodo = await createdTodo.save();

    foundUser.todos.push(savedTodo._id);

    await foundUser.save();

    res.json({
      message: 'Success',
      createdTodo,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error',
      error: err.message,
    });
  }
}

module.exports = {
  createToDo,
};
