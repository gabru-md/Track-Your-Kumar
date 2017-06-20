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

//app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));


app.get('/',function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  var myStream = fs.createReadStream(__dirname + '/index.html');
  myStream.pipe(res);
});

var table="";
var emptylist = {
  notices:"",
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

app.get('/addKumar',function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  var myInput = fs.createReadStream(__dirname + '/addKumar.html');
  myInput.pipe(res);
});

app.post('/add',function(req,res){
  var emp_id = req.body.emp_id;
  var counter = req.body.counter;
  var name = req.body.name;
  var desg = req.body.desg;
  var notices = "";
  var office = "NAI";
  var room = "NAI";
  var obj = {
    'emp_id':emp_id,
    'counter':counter,
    'name':name,
    'desg':desg,
    'office':office,
    'room':room,
    'notices':notices
  }
  //console.log(counter,name,desg,office,room);
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      var status = db.collection('status');
      status.insert(obj,function(err,resp){
        if(err){
          console.log(err);
        }
        else{
          console.log(res.insertedCount);
          res.writeHead(200,{'Content-Type':'text/html'});
          var myInput = fs.createReadStream(__dirname + '/successRecord.html');
          myInput.pipe(res);
        }
      });
    }
  });
});

app.post('/remove',function(req,res){
  var emp_uid = req.body.emp_id;
  var name;
  var desg;
  var counter;
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      var status = db.collection('status');
      status.find({'emp_id':emp_uid}).toArray(function(err,resp){
        if(err){
          console.log(err);
        }
        else if(resp.length){
          var obj={
            display : 'inline-block',
            emp_id : resp[0]['emp_id'],
            counter : resp[0]['counter'],
            name : resp[0]['name'],
            desg : resp[0]['desg']
          }

          res.render('removeKumar',obj);
        }
      });
    }
  });
});

app.post('/removeFinal',function(req,res){
  var emp_id = req.body.emp_id;
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      var status = db.collection('status');
      status.deleteOne({'emp_id':emp_id},function(err,result){
        if(err){
          console.log(err);
        }
        else{
          res.writeHead(200,{'Content-Type':'text/html'});
          var myInput = fs.createReadStream(__dirname + '/successDelete.html');
          myInput.pipe(res);
        }
      });
    }
  });
});

app.get('/removeKumar',function(req,res){
  var empty = {
    display:'none',
    emp_id:"",
    counter:"",
    name:"",
    desg:""
  }
  res.render('removeKumar',empty);
});


app.get('/addNotice',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    var myInput = fs.createReadStream(__dirname + '/notice.html');
    myInput.pipe(res);
});

app.post('/addNotice',function(req,res){
  var emp_id = req.body.emp_id;
  var notice = req.body.notice;
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err)
    }
    else{
        var status = db.collection('status');
        var query = {
          'emp_id':emp_id
        }
        var update_obj = {
          $set:{
            'notices': notice
          }
        }
        status.update(query,update_obj,function(err,resp){
          if(err){
            var myInput = fs.createReadStream(__dirname + '/errorNotice.html')
            res.writeHead(200,{'Content-Type':'text/html'});
            myInput.pipe(res);
          }
          else{
            var myInput = fs.createReadStream(__dirname + '/successNotice.html')
            res.writeHead(200,{'Content-Type':'text/html'});
            myInput.pipe(res);
          }
        });
    }
  });
});

app.listen('1000');
