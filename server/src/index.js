import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Create instance
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

// Server setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
