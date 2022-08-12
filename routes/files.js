const router=require("express").Router();

const multer=require("multer");

const {v4:uuid4}=require("uuid");

const path=require("path");

const file = require("../models/file");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
  
const upload = multer({ storage: storage,limit:{fileSize:1E8} }).single('myFile');

router.post("/",(req,res)=>{
    upload(req,res,async (err)=>{
        if(!req.file){
            return res.json({error:"All feilds are required"});
        }
        if(err){
            console.log(err);
            return res.json({error:err.message});
        }
        const f=new file({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path,
            size:req.file.size
        })
        const response=await f.save();
        return res.json({file:`${process.env.APP_BASE_URL}/files/${f.uuid}`});
    })
});

module.exports=router;