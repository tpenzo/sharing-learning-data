import mongoose from 'mongoose'
import * as dotenv from "dotenv";
dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g3hck2g.mongodb.net?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }


async function connectDB() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(uri, options)
        console.log('==> Connected to mongoDB')
    } catch (error) {
        console.log("==> Connection failed to database with error: " + error.message)
    }
}

export default connectDB