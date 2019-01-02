const express = require('express')
const app = express()
const request = require('request');
var bodyParser = require("body-parser");
const cors = require('cors');


// Body Parser for parsing JSON
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 80;

// MLab Mongo DB Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://testuser1:testuser1@ds113942.mlab.com:13942/node_test_1');
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
  checklist: Object,
  daysPerWeek: [Number],
  doneCount: Number,
  count: Number,
  notes: String
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
    daysPerWeek: req.body.daysPerWeek,
    doneCount: 0,
    count: req.body.count,
    checklist: {},
    notes: req.body.notes
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
  Task.findByIdAndUpdate(req.body._id,{
    name: req.body.name,
    description: req.body.description,
    checklist: req.body.checklist,
    notes: req.body.notes
  },(err,res2) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(res2);
      res.send(res2);
    }
  });
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

app.listen(port, () => console.log('Calendar running on ' + port));