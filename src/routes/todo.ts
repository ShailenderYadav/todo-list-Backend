import express, { RequestHandler } from 'express';
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes are protected with authentication
router.use(authenticateToken);

router.post('/', createTodo as RequestHandler);
router.get('/', getTodos as RequestHandler);
router.get('/:id', getTodo as RequestHandler);
router.put('/:id', updateTodo as RequestHandler);
router.delete('/:id', deleteTodo as RequestHandler);

export default router; 