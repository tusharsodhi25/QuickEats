import mongoose from "mongoose";


export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://Tushar_sodhi:0zbEYPORFvIVgcJI@cluster0.6tdg9.mongodb.net/QuickEats')
    .then(()=>{
        console.log('Database connected');
    })
}