import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';

import mongoose from 'mongoose';
import { connectDB } from './config/db';

const port = process.env.PORT || 8800;

connectDB();

mongoose.connection.on('error', (error: Error) => {
  console.log(
    `1. 🔥 Common Error caused issue → : check your config.env file first and add your mongodb url`
  );
  console.error(`2. 🚫 Error → : ${error.message}`);
});

import app from './app';
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any, promise: Promise<any>) => {
  console.log(`Error: ${err.message}`);

  // close server and exit
  server.close(() => process.exit(1));
});
