import express from 'express';
import { createServer } from 'http'
import cors from 'cors';
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import morgan from 'morgan'
import route from './route/index.js';
import socketServer from './socketServer.js';

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

// Socket
const http = createServer(app)
const io = new Server(http, {
   cors: {
      origin: '*',   
      methods: ['GET', 'POST']
  }
})

io.on("connection", (socket) => {
   socketServer(socket)
});

// Running
http.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
