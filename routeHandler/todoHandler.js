const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../todoSchemas/todoSchema");
const checkLogin = require("../middlewares/checkLogin");
const todoModel = new mongoose.model("Todo", todoSchema);

//all todos get request
router.get("/", checkLogin, async (req, res) => {
    console.log(req.name);
    console.log(req.number);
    console.log(req._id);
    await todoModel.find({}).exec((err, todos) => {
        if (err) {
            res.status(500).send({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).send(todos);
        }
    });
});
// get a todos by id
router.get("/:id", async (req, res) => {
    await todoModel.findOne({ _id: req.params.id }).exec((err, todo) => {
        if (err) {
            res.status(500).send({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).send(todo);
        }
    });
});
// create a todo
router.post("/", async (req, res) => {
    const newTodo = new todoModel(req.body);
    await newTodo.save((err, todo) => {
        if (err) {
            res.status(500).send({
                error: err,
            });
        } else {
            res.status(200).send({
                todo,
                message: "Todo created successfully!",
            });
        }
    });
});
//create multiple todos
router.post("/all", async (req, res) => {
    const newTodo = new todoModel(req.body);
    await newTodo.insertMany((err, todo) => {
        if (err) {
            res.status(500).send({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).send({
                todo,
                message: "Todo created successfully!",
            });
        }
    });
});
//update a todo
router.put("/:id", async (req, res) => {
    await todoModel
        .findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                },
            },
            { new: true, useFindAndModify: false }
        )
        .exec((err, todo) => {
            if (err) {
                res.status(500).send({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).send({
                    todo,
                    message: "Todo Update successfully!",
                });
            }
        });
});
//delete a todo
router.delete("/:id", async (req, res) => {
    await todoModel.findOneAndDelete({ _id: req.params.id }).exec((err) => {
        if (err) {
            res.status(500).send({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).send({
                message: "Todo deleted successfully!",
            });
        }
    });
});

module.exports = router;
