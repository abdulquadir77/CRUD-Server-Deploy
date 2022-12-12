const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  taskname: String,
  tag: String,
  status: Boolean,
  userID: String,
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
