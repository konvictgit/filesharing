const router = require('express').Router();
const multer = require('multer');
const File = require('../models/file');
const{v4: uuid4} = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file,callbck) => callbck(null,'uploads/'),
    filename: (req,file,callbck) => {
        let uniqueName=file.originalname.split('.')[0];
        callbck(null,uniqueName);
    }
})

let upload = multer({
    storage : storage,
    limits:{fileSize: 1000000*100},
}).single('myfile');

router.post('/', (req, res)=>{

    

    

    upload(req,res,async (err) =>{

        //Validate request
        if(!req.file){
            return res.json({error: 'All fields are required'});
    }

    //store files
        if(err){
            return res.status(500).send({Error:"Image could not be uploaded"});
        }
         //store in db
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });


        const response = await file.save();
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});

        //http://localhost:3000/files/uuid  - downloadlink


    });
   
} );


module.exports = router;