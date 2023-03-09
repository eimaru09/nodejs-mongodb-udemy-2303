const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
// main().catch(err => console.log(err));
// async function main() {


const connectDB = (url) => {
    return mongoose
        .connect(url)
        .then(() => console.log("DB接続中"))
        .catch((err) => console.log(err));
};

module.exports = connectDB;