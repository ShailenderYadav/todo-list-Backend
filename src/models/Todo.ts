import mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: Date;
  owner: mongoose.Types.ObjectId;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const Todo = mongoose.model<ITodo>('Todo', todoSchema); 