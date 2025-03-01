import mongoose from 'mongoose';
import mysql from 'mysql2/promise';
import { config } from './env';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.mongoDB.url);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export let pool: mysql.Pool;

const connectMySQL = async () => {
  try {
    pool = mysql.createPool({
      host: config.mysql.host,
      user: config.mysql.username,
      password: config.mysql.password,
      database: config.mysql.dbName,
      port: parseInt(config.mysql.port as string),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('MySQL connected successfully');
  } catch (error) {
    console.error('MySQL connection error:', error);
    process.exit(1);
  }
};

const connectDB = async () => {
  await connectMongoDB();
  await connectMySQL();
};

export default connectDB;
