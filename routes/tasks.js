var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')

//Get all tasks
router.get('/tasks', function(req, res, next){
  db.tasks.find(function(err, tasks){
    if(err){
      res.send(err)
    }
    res.json(tasks)
  })
})

//Get a single task
router.get('/task/:id', function(req, res, next){
  db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err)
    }
    res.json(task)
  })
})

//Save a Task

router.post('/task', function(req, res, next){
  var task = req.body
  if(!task.title || (task.isDone + '')){
    res.status(400)
    res.json({
      "error": "Bad Data"
    })
  } else {
    db.task.save(task, function(err, task){
      if(err){
        res.send(err)
      }
      res.json(task)
    })
  }
})

//Delete a task
router.delete('/task/:id', function(req, res, next){
  db.tasks.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err)
    }
    res.json(task)
  })
})

//Update task
router.put('/task/:id', function(req, res, next){
  var task = task.body
  var updateTask = {}

  if(task.isDone){
    updateTask.isDone = task.isDone
  }

  if(task.title){
    updateTask.title = task.title
  }

  if(!updateTask){
    res.status(400)
    res.json({
      "error": "Bad Data"
    })
  } else {
    db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updateTask,{}, function(err, task){
      if(err){
        res.send(err)
      }
      res.json(task)
    })
  }
})

module.exports = router
