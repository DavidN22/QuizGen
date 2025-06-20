import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";
import { connectDB } from "./db.mongoose.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
connectDB();

// Routes
app.use("/", quizRoutes);
app.get("/api", (req: Request, res: Response) => {
  res.json({ server: "Hello, this is your Express server!" });
});

//global error handler
interface CustomError extends Error {
  status?: number;
  error?: string;
}
app.use((err: CustomError, req: Request, res: Response, next: Function) => {
  const status = err.status || 500;
  const messages = err.message || err.error || "An unexpected error occurred.";

  res.status(status).json({ error: messages });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
