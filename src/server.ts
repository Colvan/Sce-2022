//express
import express  from 'express';
const app = express();
import dotenv  from "dotenv";
dotenv.config()
//mongoose
import mongoose  from "mongoose";
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error', error=>{
    console.log(error)
});
db.once('open', ()=>{
    console.log("Connected to mongo")
})

//parser
import bodyParser  from 'body-parser';
app.use(bodyParser.urlencoded({extended: true , limit: "10mb"}));
app.use(bodyParser.json());

//routes
import post_routes  from "./routes/post_routes"
app.use("/post",post_routes);

export = app
