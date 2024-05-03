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