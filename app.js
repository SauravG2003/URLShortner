import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv/config';
import urlRoute from './routes/urlShortnerRoute.js';
import path from 'path';
const app = express();

connectDB();

const rootDir = process.cwd();

app.use(express.static(path.join(rootDir, "public")));


app.get("/",(req,res)=>{
    res.sendFile(path.join(rootDir, "public", "index.html"));
})
app.use(express.json());
app.use('/url',urlRoute);


let PORT = process.env.PORT|| 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
});
