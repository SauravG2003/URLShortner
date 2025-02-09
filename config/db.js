import mongoose from "mongoose";
const connectDB=()=>{
    console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected Successfully... ");
    }).catch((err)=>{
        console.log("Error:" ,err);
    })
    
}

export default connectDB;