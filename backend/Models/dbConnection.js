const mongoose = require("mongoose");

mongoose.connect(process.env.URL).then(()=>{
    console.log("Connected to DataBase...")
}).catch((err)=>{
    console.log("MongoDb Connection Error",err);
})
