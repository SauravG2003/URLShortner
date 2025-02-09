import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type:String,
        required: true,
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    clickCount:{
        type:Number,
        default:0
    },
    visitedAtShortUrl:[{
        timestamp: {type: Date, default: Date.now},
        clicks: {type:Number,default: 1}
       

    }],
})

const URL = mongoose.model("URL",urlSchema);

export default URL;