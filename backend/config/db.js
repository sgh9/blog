import mongoose from 'mongoose';
const MONGO_URL = 'mongodb://localhost:27017/pro_blog';

const connectDB = async ()=> {
    try {
      const con = await mongoose.connect(process.env.MONGO_URL || MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected to mongodb: "+ con.connection.host);
        
    } catch (e) {
        console.error("Error connecting to mongodb "+ e.message);
        process.exit(1);
    }
}

export default connectDB;