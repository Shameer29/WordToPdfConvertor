const express = require('express');
var app = express();
var upload = require('express-fileupload');
var docxConverter = require('docx-pdf');
var path = require('path');
var fs = require('fs');
app.use(express.static('public'));



app.use(upload());

 
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})
app.post('/upload',function(req,res){
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    //File where .docx will be downloaded  
    var uploadpath = __dirname + '/uploads/' + name;
    //Name of the file --ex test,example
    const First_name = name.split('.')[0];
    //Name to download the file
    down_name = First_name;
    file.mv(uploadpath,function(err){
      if(err){
        console.log(err);
      }
  }else{
    res.send("No File selected !");
    res.end();
  }
});

app.get('/download', (req,res) =>{
  //This will be used to download the converted file
  res.download(__dirname +`/uploads/${down_name}${extend_pdf}`,`${down_name}${extend_pdf}`,(err) =>{
    if(err){
      res.send(err);
    }else{
      //Delete the files from directory after the use
      console.log('Files deleted');
      const delete_path_doc = process.cwd() + `/uploads/${down_name}${extend_docx}`;
      const delete_path_pdf = process.cwd() + `/uploads/${down_name}${extend_pdf}`;
      try {
        fs.unlinkSync(delete_path_doc)
        fs.unlinkSync(delete_path_pdf)
        //file removed
      } catch(err) {
      console.error(err)
      }
    }
  })
})

app.get('/thankyou',(req,res) => {
    res.sendFile(__dirname+'/thankyou.html')
})

  
app.listen(3000,() => {
    console.log("Server Started at port 3000...");
})
