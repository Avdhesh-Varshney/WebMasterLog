// It is for importing libraries.
const express = require('express');
const fileupload  = require('express-fileupload');
const docxConverter =  require('docx-pdf');
const path=require('path');
const cors = require('cors')

const app = express();
const PORT = 5000;
// process.env.PORT should be used if you are going to host it 

// this is for middleware
app.use(fileupload());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));


// this is dir are going to be used
const uploadDir = path.join(__dirname,'uploads');
const convertDir = path.join(__dirname,'converted');

// Posting end for transformation
app.post("/convert",(req,res)=>{
    if(!req.files || Object.keys(req.files).length===0) return res.status(400).send('No files were uploaded');
    // this is basically for checking whether file came or not
    
    let docFile = req.files.file;
    let inputFilePath = path.join(uploadDir,docFile.name);
    // uploaded file name can be retrieved 
    let outputFilePath = path.join(convertDir,`${path.parse(docFile.name).name}.pdf`);
    // parsing the name ,giving pdf convertion
    
    docFile.mv(inputFilePath,(err)=>{
        if (err) return res.status(500).send(err);
        // some error handling code
        docxConverter(inputFilePath,outputFilePath,(err,result)=>{
            if (err) return res.status(500).send(err);
            res.sendFile(outputFilePath);
            // sending the file

        })

    })

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});