import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './routes/users';
import { healthRouter } from './routes/health';
import { customerRouter } from './routes/customers';
import { webAgentRouter } from './routes/webagent';

const envFileName = `.env.${process.env.NODE_ENV || "development"}`
console.log(envFileName)
dotenv.config({ path: envFileName });
const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);
app.use('/api/webagent', webAgentRouter);
app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Visys Cloud API' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`⚡️[server]: Server is running at http://0.0.0.0:${port}`);
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
}); 
