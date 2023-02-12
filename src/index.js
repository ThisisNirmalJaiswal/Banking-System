const express = require('express');
const mongoose = require('mongoose');
const app = express();
const route = require("./routes/route")
app.use(express.json());

mongoose.set("strictQuery", false);


const URL = "mongodb+srv://nirmaljasval:8o1g7W6bqoshvXoN@cluster0.cv9nolo.mongodb.net/Banking-API";

mongoose.connect(URL, {useNewUrlParser: true})
.then(()=>{
    console.log("huuu data base is connected")
})
.catch((err=>{console.log("mongo is disappointend " + err)}))

app.use("/", route);

app.listen(3000, ()=>{
    console.log("Your app is  running on PORT 3000")
})