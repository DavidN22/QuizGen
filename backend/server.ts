import express, { Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors'; 
import quizRoutes from './routes/quizRoutes.js';
import { connectToDatabase } from './db.mongoose.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', quizRoutes);
app.get('/api', (req: Request, res: Response) => {
    res.json({ server: 'Hello, this is your Express server!' });
});

//global error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
});