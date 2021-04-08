const express = require ("express");
const app = express();
const path = require('path');
const hbs = require('hbs');

const dirPartials = path.join(__dirname, '../../template/partials');
const dirViews = path.join(__dirname, '../../template/views'); 

require ('./../helpers/helpers')

//HBS
app.set ('view engine', 'hbs')
app.set ('views', dirViews)
hbs.registerPartials(dirPartials)

//PAGINAS
app.get('/',(req,res)=>{
    res.render('index',{
        sesion:"Interesado"
    });
});
app.get('/inicio',(req,res)=>{
    res.render('index',{
        sesion:"Interesado"
    });
});

app.post('/inscripcion',(req,res)=>{
    res.render('index', {
        sesion:"Interesado",
        ced:req.body.cedula,
        nom:req.body.nombre,
        correo:req.body.correo,
        telefono:req.body.telefono,
        idcurso:req.body.idCurso
    });
});

//pagina de ERROR 404
app.get('*', function (req,res){
    res.render('error');
})

module.exports = app
