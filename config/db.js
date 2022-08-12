const mongoose=require("mongoose");

require("dotenv").config();

function connect(){
    mongoose.connect(process.env.url,{useNewUrlParser: true,useUnifiedTopology: true});
    const connection=mongoose.connection;

    connection.once('open',()=>{
        console.log("database connected");
    });
}

module.exports=connect;