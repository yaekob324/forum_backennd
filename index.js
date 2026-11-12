import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import db from './db/db.config.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req,res) => {
  res.status(200).json({ message: 'API is running' });
});

const startServer = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Database connected successfully');

    connection.release();

    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error('Database connection failed:', error);
    process.exitCode = 1;
  }
};

startServer();