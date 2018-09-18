const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

//set storage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req,file,cb){
    arch = 'new'+ path.extname(file.originalname);
    cb(null,'new' + path.extname(file.originalname));
    console.log(arch);
  }
});
//int uploads
const upload = multer({
  storage: storage,
  fileFilter: function(req,file,cb){
    checkFileType(file, cb);
  }
}).single('myImage');
//Check file truetype
function checkFileType(file, cb){
  //allowed text_caps
  const filetypes = /jpeg|jpg/;
  //check est
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check myImage
  const mimetype = filetypes.test (file.mimetype);

  if(mimetype && extname){
    return cb (null, true);
  } else {
    cb('Error: Solo imagenes con terminacion .jpg');
  }
}

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

const app = express();

//VARIABLES GLOBALES
var Nuestaciones;
var estaciones;
var succ;
var arch;
var user;
var passw;
var pasaaa;

//Funciones GLOBALES
//delete function
function deletem (est){
  fs.unlink('public/uploads/'+ 'new' +'.jpg', function (err) {
      if (err) {console.log('no existe el archivo');};
      // if no error, file has been deleted successfully
      console.log('File deleted!');
  });
  fs.unlink('public/uploads/'+ 'new' +'.jpg', function (err) {
      if (err) {console.log('no existe el archivo');};
      // if no error, file has been deleted successfully
      console.log('File deleted!');
  });
  fs.unlink('public/uploads/'+ 'new' +'.jpeg', function (err) {
      if (err) {console.log('no existe el archivo');};
      // if no error, file has been deleted successfully
      console.log('File deleted!');
  });
  fs.unlink('public/uploads/'+ 'new' +'.png', function (err) {
      if (err) {console.log('no existe el archivo');};
      // if no error, file has been deleted successfully
      console.log('File deleted!');
  });
  fs.unlink('public/uploads/'+ est +'.gif', function (err) {
      if (err) {console.log('no existe el archivo');};
      // if no error, file has been deleted successfully
      console.log('File deleted!');
  });
}
//create function
function createm(succ) {
  if (succ == 1) {
    estaciones.forEach(function (elemento, indice, array) {
      console.log(elemento, indice);
      fs.createReadStream('public/uploads/new.jpg').pipe(fs.createWriteStream('public/uploads/'+ elemento + '.jpg'));
    });
  }if (succ == 2) {
    estaciones.forEach(function (elemento, indice, array) {
      console.log(elemento, indice);
      fs.createReadStream('public/uploads/new.jpeg').pipe(fs.createWriteStream('public/uploads/'+ elemento + '.jpeg'));
    });
  }if (succ == 3) {
    estaciones.forEach(function (elemento, indice, array) {
      console.log(elemento, indice);
      fs.createReadStream('public/uploads/new.png').pipe(fs.createWriteStream('public/uploads/'+ elemento + '.png'));
    });
  }if (succ == 4) {
    estaciones.forEach(function (elemento, indice, array) {
      console.log(elemento, indice);
      fs.createReadStream('public/uploads/new.gif').pipe(fs.createWriteStream('public/uploads/'+ elemento + '.gif'));
    });
  }
}
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.get('/',(req, res) => {
  pasaaa = 0;
  res.render('gale1.ejs');
  console.log(pasaaa);

});

app.get('/admin',(req, res) => {
  pasaaa = 0;
  res.render('login.ejs');
  console.log(pasaaa);

});

app.get('/index2e',(req, res) => {
  if (pasaaa == 1) {
    res.render('index2e');
  }else {
    res.render('login.ejs');
  }
});

app.get('/analytics',(req, res) => {

  if (pasaaa == 1) {
    res.render('icons.ejs');
  }else {
    res.render('login.ejs');
  }
});

app.post('/upload', jsonParser, (req,res)=> {
  upload(req,res,(err) =>{
    if(err){
      res.render('index',{
        msg: err
      });

    } else {
      if(req.file == undefined){
        res.render('index',{
          msg: 'Error: No se ha seleccionado un archivo'
        });
      }else {
        if (arch == 'new.jpg') {
          succ = 1;
          createm(succ);
        }
        if (arch == 'new.jpeg') {
          succ = 2;
          createm(succ);
        }
        if (arch == 'new.png') {
          succ = 3;
          createm(succ);
        }
        if (arch == 'new.gif') {
          succ = 4;
          createm(succ);
        }
        res.render('index',{
          msg: 'Archivo cargado'
        });
      }
    }
  });

});

app.post('/select', urlencodedParser, (req,res)=> {
  //console.log(req.body);
  Nuestaciones = Object.keys(req.body).length;
  estaciones = Object.keys(req.body);
  //console.log(estaciones);

  estaciones.forEach(function (elemento, indice, array) {
    console.log(elemento, indice);
    deletem (elemento);
  });
  res.render('index');
});

app.post('/login', urlencodedParser, (req,res)=> {
  //console.log(req.body);
  user = req.body.username;
  pasw = req.body.pass;

  if (user == 'admin') {
    if (pasw == 'Saigsa11') {
      res.render('index2e');
      pasaaa = 1;
    }else {
      res.render('login.ejs');
    }
  }else {
    res.render('login.ejs');
  }

});

const port = 80;

app.listen(port, () => console.log('serverstart'));
