//REQUIRES
require('./config/config')
const express = require ("express")
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//PATHS
const dirPublic = path.join(__dirname, '../public')

//STATIC
app.use(express.static(dirPublic))

//BodyParser 
app.use(bodyParser.urlencoded({extended: false}))

//Routes
app.use(require('./routes/index'))

mongoose.connect('mongodb://localhost:27017/asignaturas', {useNewUrlParser: true}, (err,resultado) => {
  if(err){
    return console.log(error)
  }
  console.log("conectado")
});

// SETINGS 
const port=process.env.PORT||3000

//SERVIDOR
app.listen(port,() => {
    console.log(`server on port  ${port}`)
});
