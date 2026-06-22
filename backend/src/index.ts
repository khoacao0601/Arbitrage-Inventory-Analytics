import express, { Request, Response } from 'express';
import './config/database'; 
import userRouter from './routes/user.route';

// Init create Express
const app = express();
const PORT = 3000;

// Help App can read JSON data from client
app.use(express.json());

app.use('/api/users', userRouter);

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