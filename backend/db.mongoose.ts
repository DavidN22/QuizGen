import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const uri = MONGODB_URI|| "";

export async function connectToDatabase() {
  await mongoose.connect(uri);
}

export async function closeDatabaseConnection() {
  await mongoose.connection.close();
}
