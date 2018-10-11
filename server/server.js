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
  description: String,
  startDate: Date,
  endDate: Date,
  type: String,
  checkList: Object,
  doneCount: Number
});

var Task = mongoose.model('Task', taskSchema);

var hostname = "localhost";

app.get('/task_list', function (req, res) {

  Task.find({}).sort([['_id', 1]]).exec((err,tasks) => {
    let list = [];
    console.log(tasks);
    res.send(tasks);
  });
});

app.post('/new_task', function(req,res){
  console.log(req.body);
  var task = new Task({
    name : req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    type: req.body.type,
    checkList: req.body.checklist2,
    doneCount: req.body.doneCount
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

app.put('/update_task', (req,res) => {
  if (req.body.checklist2 !== undefined){
    Task.findByIdAndUpdate(req.body.id,{checkList: req.body.checklist2},(err,res2) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(res2);
        res.send(res2);
      }
    });
  }
})

app.delete('/delete_task/:task_id', function(req,res){
  Task.findByIdAndRemove(req.params.task_id, (err, res2) => {
    if (err){
      console.log(err);
      res.send(err);
    } else {
      res.send(res2);
    }
  });

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))