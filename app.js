//require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const secretsRouter = require("./routes/secretsRoutes");

const app = express();

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/", secretsRouter);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/secretsDB');
}


app.listen(3000, () => {
    console.log("Server running on port 3000");
})