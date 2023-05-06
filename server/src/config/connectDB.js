import mongoose from 'mongoose'
import * as dotenv from "dotenv";
dotenv.config();

// const uri = `mongodb+srv://anhvinh3010:V1AHm1JChP3BU6dF@v-notes.hcm2ciy.mongodb.net/?retryWrites=true&w=majority`
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g3hck2g.mongodb.net?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }


async function connectDB() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(uri, options)
        // await mongoose.connect('mongodb://127.0.0.1:27017/ctushare');
        console.log('==> Connected to mongoDB')
    } catch (error) {
        console.log("==> Connection failed to database with error: " + error.message)
    }
}



export default connectDB