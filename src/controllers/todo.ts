import { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user: IUser;
}

export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const todo = new Todo({
      title,
      description,
      dueDate,
      owner: req.user._id,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    const query: any = { owner: req.user._id };

    if (status) {
      query.status = status;
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

export const getTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo' });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { title, description, status, dueDate },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
}; 