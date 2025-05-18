"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = require("../models/Todo");
const createTodo = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const todo = new Todo_1.Todo({
            title,
            description,
            dueDate,
            owner: req.user._id,
        });
        await todo.save();
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
};
exports.createTodo = createTodo;
const getTodos = async (req, res) => {
    try {
        const { status } = req.query;
        const query = { owner: req.user._id };
        if (status) {
            query.status = status;
        }
        const todos = await Todo_1.Todo.find(query).sort({ createdAt: -1 });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
};
exports.getTodos = getTodos;
const getTodo = async (req, res) => {
    try {
        const todo = await Todo_1.Todo.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todo' });
    }
};
exports.getTodo = getTodo;
const updateTodo = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const todo = await Todo_1.Todo.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, { title, description, status, dueDate }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo_1.Todo.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
};
exports.deleteTodo = deleteTodo;
