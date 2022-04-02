//express
const express = require('express');
const app = express();
const dotenv = require("dotenv").config();

//mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error=>{
    console.log(error)
});
db.once('open', ()=>{
    console.log("Connected to mongo")
})

//parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true , limit: "10mb"}));
app.use(bodyParser.json());

//routes
const post_routes = require("./routes/post_routes")
app.use("/post",post_routes);

module.exports = app
