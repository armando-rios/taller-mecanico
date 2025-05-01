import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import partsRoutes from './routes/parts.routes';
import categoryRoutes from './routes/category.routes';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', partsRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
