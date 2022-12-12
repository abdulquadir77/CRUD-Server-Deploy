const express = require("express");
const todoRouter = express.Router();

const TodoModel = require("../Models/todo.model");

todoRouter.get("/", async (req, res) => {
  try {
    const todo = await TodoModel.find();
    res.send(todo);
  } catch (error) {
    console.log("Somthing Error in /Todo");
    console.log(error);
  }
});

todoRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const todo = new TodoModel(payload);
    await todo.save();
    res.send("Created Successfully");
  } catch (error) {
    console.log("Somthing Error in Create");
    console.log(error);
  }
});

todoRouter.patch("/edit/:noteID", async (req, res) => {
  var userID = req.body.userID;
  var noteID = req.params.noteID;
  var payload = req.body;

  try {
    const notes = await TodoModel.findOne({ _id: noteID });
    if (userID !== notes.userID) {
      res.send("Not Authorized");
    } else {
      await TodoModel.findByIdAndUpdate({ _id: noteID }, payload);
      res.send("Notes Edited Successfully");
    }
  } catch (error) {
    console.log(error);
    console.log("Somthing error in Edit");
  }
});

todoRouter.delete("/delete/:noteID", async (req, res) => {
  const userID = req.body.userID;
  const noteID = req.params.noteID;
  try {
    const notes = await TodoModel.findOne({ _id: noteID });
    if (userID !== notes.userID) {
      res.send("Not Authorized");
    } else {
      await TodoModel.findByIdAndDelete({ _id: noteID });
      res.send("Notes Deleted Successfully");
    }
  } catch (error) {
    console.log(error);
    console.log("Somthing error in Delete");
  }
});

module.exports = todoRouter;
