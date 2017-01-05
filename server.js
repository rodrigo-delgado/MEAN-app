var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var task = require('./routes/task')
var port = 3000
var app = express()

//View Engine

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

//Set Static Folder (Angular)

app.use(express.static(path.join(__dirname,'client')))

//Set body-parser MW

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/api', task)

app.listen(port, function(){
  console.log('Server running on port ' +port);
})
