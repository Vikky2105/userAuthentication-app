const express=require("express")
const app=express();
const bodyParser = require('body-parser')
const cors=require('cors')
const AuthRouter = require("./Routes/AuthRouter")
require("dotenv").config();
require("./Models/dbConnection")
app.use(express.json())
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors())




app.get("/ping",(req,res)=>{
    res.send("PONG");
})


app.use("/auth",AuthRouter)

app.listen(PORT ,()=>{
    console.log("Server is Running");
})