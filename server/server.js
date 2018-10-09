const express = require('express')
const app = express()
const request = require('request');
var bodyParser = require("body-parser");


// Body Parser for parsing JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// MLab Mongo DB Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected to db")
});


var taskSchema = mongoose.Schema({
  name: String,
  desc: String,
  startDate: Date,
  endDate: Date,
  type: String,
  checkList: Object
});

var Task = mongoose.model('Task', taskSchema);





var hostname = "localhost";

app.get('/task_list', function (req, res) {

  Task.find({},(err,tasks) => {
    let list = [];
    console.log(tasks);
    res.send(tasks);
  });


  
    //console.log(json);
});

app.post('/new_task', function(req,res){
  //var name=req.body.name;
  //var permalink=req.body.permalink;
  //console.log(name + " " + permalink);
  var task = new Task({
    name : req.body.name,
    desc: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    type: req.body.type,
    checkList: req.body.checklist2
  });

  task.save((err,product)=>{
    if (err){
      res.send(err);
    }
    else{
      res.send({
        "response" : "success",
        "saved_task": product
      });
    }
  });

});

app.put('')

app.delete('/deletepost', function(req,res){
  res.send("")
})

// app.post('/', function (req, res) {
//   res.send('Got a POST request')
// })
// var cb0 = function (req, res, next) {
//   console.log('CB0')
//   next()
// }

// var cb1 = function (req, res, next) {
//   console.log('CB1')
//   next()
// }

// app.get('/example/d', [cb0, cb1], function (req, res, next) {
//   console.log('the response will be sent by the next function ...')
//   next()
// }, function (req, res) {
//   res.send('Hello from D!')
// })
app.listen(3000, () => console.log('Example app listening on port 3000!'))