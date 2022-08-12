const show=require("./routes/show");

const express=require("express");

const path=require('path');

const app=express();

app.use(express.json());

const db=require("./config/db.js");

let PORT=3000;

const router=require("./routes/files");

db();

app.use(express.static('public'));

app.use("/api/test",router);

app.use("/files",show);

app.use('/files/download',require('./routes/download'));

app.set('views',path.join(__dirname,'/views'));

app.set('view engine','ejs');

app.listen(PORT,()=>{
    console.log(`${PORT}`);
})