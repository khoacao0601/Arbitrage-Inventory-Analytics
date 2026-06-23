import express, { Request, Response } from 'express';
import './config/database'; 
import userRouter from './routes/user.route';
import itemsRouter from './routes/items.route';
import cors from 'cors';
import dotenv from 'dotenv';

// Request system read file .env and get login information
dotenv.config();

// Init create Express
const app = express();
const PORT = 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true
})); 
// Help App can read JSON data from client
app.use(express.json());

// Users
app.use('/api/users', userRouter);

// Items
app.use('/api/items', itemsRouter)

// basic API for testing
app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'Server is running well!'
    });
});

// Request listen to port 3000
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});