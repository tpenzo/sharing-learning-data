import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import morgan from 'morgan'
import route from './route/index.js';

// Create instance
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

// Server setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
app.use(cookieParser());
connectDB()
app.use('/api', route);

// Running
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
