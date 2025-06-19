import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '')
        console.log("Connect to MongoDB successfully")
    } catch (error) {
        console.log("Connect failed" + error)
    }
}