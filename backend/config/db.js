<<<<<<< HEAD
const mongoose=require("mongoose")
require("dotenv").config();
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
            // useFindAndModify:true,
        })
        console.log("MongoDb connected Successfully")
    } catch (error) {
        console.log('Error:',error.message);
        process.exit();
    }
}

module.exports=connectDB;
=======
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Stop app if DB connection fails
  }
};

module.exports = connectDB;
>>>>>>> 8ab4822 (bugs fixing)
