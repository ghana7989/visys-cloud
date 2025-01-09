import express, { Request, Response } from 'express';

const router = express.Router();

// Dummy data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

// Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Create new user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

export { router as userRouter }; 
