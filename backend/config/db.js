import mongoose from "mongoose";

import 'dotenv/config'

const DATABASE_URL = process.env.DATABASE_URL
export const connectDB = async()=>{
    await mongoose.connect(DATABASE_URL)
    .then(()=>{
        console.log('Database connected');
    })
    .catch((error)=>{
        console.log(error)
    })
}