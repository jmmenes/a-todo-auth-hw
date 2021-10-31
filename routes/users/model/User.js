const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },

    firstName: {
      type: String,
      validate: /^[a-zA-Z]*$/,
    },

    lastName: {
      type: String,
      validate: /^[a-zA-Z]*$/,
    },

    username: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },

    todos: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'todo',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
