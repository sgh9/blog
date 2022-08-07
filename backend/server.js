import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js';
import articlesRouter from './routes/articlesRoutes.js';
import defaultConfig from './middlewares/defaultConfig.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB();
const app = express();
app.use(express.json());

app.use(defaultConfig);

app.use('/users', userRouter);
app.use('/articles', articlesRouter);

app.get("/", (req, res)=>{
    res.send("Hello from Express");
});

app.listen(8080, ()=>{
    console.log("listening on ", 8080);
});