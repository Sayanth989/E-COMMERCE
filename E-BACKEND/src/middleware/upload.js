import multer from "multer";
import  path from 'path';

const storage = multer.diskStorage({
    destination:(req,File,cb) =>{
        cb(null ,'uploads/');
    },
  // rename the file to avoid the duplicate
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
});


//only allow image file
const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true);//accept it
    }else{
        cb(new Error('only images allowed'),false);//reject
    }
};

const uploads = multer({storage,fileFilter,limits :{fileSize: 5 * 1024 * 1024}})

export default uploads;