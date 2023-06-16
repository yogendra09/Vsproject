const { log } = require('console');
var express = require('express');
var router = express.Router();
var  fs = require('fs'); 
/* GET home page. */
router.get('/', function(req, res, next) {
    var filesarr=[];
    fs.readdir("./uploads",{withFileTypes:true},function(err,files){
    
      files.forEach(function(file){
         filesarr.push({filename:file.name,isFolder:file.isDirectory()})
      })
      console.log(filesarr);
      res.render("index",{files:filesarr})
    })
});

router.get('/createfile', function(req, res, next) {
     fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
      if(err){
        console.log(err);
      }
      else{
        res.redirect("/");
      }
     })
});

router.get('/write/:filename', function(req, res, next) {
  var filesarr=[];
    fs.readdir("./uploads",{withFileTypes:true},function(err,files){
      
      files.forEach(function(file){
         filesarr.push({filename:file.name,isFolder:file.isDirectory()})
      })

       fs.readFile(`./uploads/${req.params.filename}`,'utf-8',function(err,data){
        console.log(filesarr);
         res.render("write",{files:filesarr,data,filename:req.params.filename})
       })

     
    })

});
router.post('/write/:filename', function(req, res, next) {
   
  fs.writeFile(`./uploads/${req.params.filename}`,`${req.body.data}`,function(err){
               res.redirect("/");
  })

});

router.get('/rename/:filename',function(req,res,next){
    res.render("rename",{filename:req.params.filename});
})

router.post('/rename/:filename', function(req, res, next) {
   
  fs.rename(`./uploads/${req.params.filename}`,`./uploads/${req.body.newname}`,function(err){
               res.redirect("/");
  })

});







router.get('/createfolder', function(req, res, next) {
  fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
   if(err){
     console.log(err);
   }
   else{
     res.redirect("/");
   }
  })
});

router.get('/deletefile/:filename', function(req, res, next) {
  fs.unlink(`./uploads/${req.params.filename}`,function(err){
   if(err){
     console.log(err);
   }
   else{
     res.redirect("/");
   }
  })
});

router.get('/deletefolder/:foldername', function(req, res, next) {
  fs.rmdir(`./uploads/${req.params.foldername}`,function(err){
   if(err){
     console.log(err);
   }
   else{
     res.redirect("/");
   }
  })
});



module.exports = router;
