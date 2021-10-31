const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    todoDate: {
      type: Date,
    },
    todoNote: {
      type: String,
    },
    todoDone: {
      type: Boolean,
      default: false,
    },
    todoUser: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('todo', todoSchema);
