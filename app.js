var http = require('http');
var express = require('express');
var fs = require('fs');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var app = express();

var MongoClient = mongodb.MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

app.set('view engine','ejs');

var url = 'mongodb://localhost:27017/track';

app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));


app.get('/',function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  var myStream = fs.createReadStream(__dirname + '/index.html');
  myStream.pipe(res);
});

var table="";
var emptylist = {
  counter:"",
  name:"",
  desg:"",
  office:"",
  room:""
}
app.get('/track',function(req,resp){
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      var status = db.collection('status');
      status.find().toArray(function(err,res){
        if(err){
          console.log(err);
        }
        else if(res.length){
        //console.log(res[0]['name']);
        resp.render('test',{list:res});
        table="";
        //console.log("\n");
        resp.end();
        }
        else if(!res.length){
          console.log('No Records Found!');
          resp.render('test',{list:emptylist});
          resp.end();
        }
      });
    }
  });
});

app.listen('1000');
