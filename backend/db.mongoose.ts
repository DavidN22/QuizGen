import mongoose from 'mongoose';

const DB_STRING = process.env.DB_STRING;
const uri = DB_STRING|| "";

export async function connectToDatabase() {
  await mongoose.connect(uri);
}

export async function closeDatabaseConnection() {
  await mongoose.connection.close();
}
