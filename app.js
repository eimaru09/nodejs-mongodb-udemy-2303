const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require('dotenv').config();
//34
app.use(express.json());
//40
app.use(express.static("./public"));


const PORT = 5000;

//route
app.use("/api/v1/tasks", taskRoute);

//db
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, console.log("サーバーが起動しました"));
    } catch (err){
        console.log(err);
    }
};

start();
