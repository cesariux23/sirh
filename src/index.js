'use strict';
//
//const app = require('./app');
//const port = app.get('port');
//const server = app.listen(port);
//
//server.on('listening', () =>
//  console.log(`Feathers application started on ${app.get('host')}:${port}`)
//);

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const api = require('./api');
const ModelEmpleado= require('./services/empleado/empleado-model');
const bodyParser = require('body-parser');
const moment = require('moment');

// Initialize the application
const app = feathers();

//get the configuration
app.configure(configuration(path.join(__dirname, '..')));

app
  // Initialize our API sub app
  .use('/api', api)
  // Register your view engine
  .set('view engine', 'pug')
  .set('views', './views')
  //use statics
  .use('/', serveStatic( app.get('public') ))
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  //body parser
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

//configuration pug
app.locals.basedir = path.join(__dirname, '../views');
//configuration fro moment
moment.locale('es');
app.locals.moment = moment;

//routes
app.get('/empleados', function(req, res, next){
  var limit=req.query.limit? req.query.limit: 14;
  var page=req.query.page ? req.query.page : 1;
  var skip=req.query.page>0 ? (req.query.page-1)*limit : 0;
  let activo=req.query.hasOwnProperty('activo') ? req.query.activo: true;
  api.service('empleados')
    .find({
      paginate: {
        default: limit,
        max: 25
      },

      query: {
        activo:activo,
        $sort: {adscripcion:1, titular:-1, tipo_contrato:1, primer_apellido:1, segundo_apellido:1 },
        $skip:skip
      }
    })
    .then(result => res.render('empleados/index', {data:result, page:page, limit:limit}))
    .catch(next);
});

//new empleado
app.get('/empleados/new', function(req, res, next){
  //se crea un objeto vacio
  let obj=new ModelEmpleado();
  res.render('empleados/new', {data:obj});
});

//post empleado
app.post('/empleados/new', function(req, res, next){
  var data=req.body;
  api.service('empleados')
    .create(data)
    .then(result => res.redirect('/empleados/'+result._id))

});
//view empleado details
app.get('/empleados/:id', function(req, res, next){
  api.service('empleados')
    .get(req.params.id)
    .then(result => res.render('empleados/view', {data:result}))
    .catch(next);
});

//edit empleado
app.get('/empleados/:id/edit', function(req, res, next){
  api.service('empleados')
    .get(req.params.id)
    .then(result => res.render('empleados/edit', {data:result}))
    .catch(next);
});

//edit empleado
app.post('/empleados/:id/edit', function(req, res, next){
  var data=req.body;
  api.service('empleados')
    .patch(req.params.id,data)
    .then(result => res.redirect('/empleados/'+req.params.id))
});

//edit empleado
app.get('/actualizar', function(req, res, next){
  var data=req.body;
  api.service('empleados').find({paginate: {
    default: 500,
    max: 500
  }})
  .then(
    result=>{
      result.data.forEach((e)=>{
          var apellidos='';
          if(e.primer_apellido)
            apellidos=e.primer_apellido;
          if(e.segundo_apellido != null){
            if(apellidos.length>0)
              apellidos+=" ";
            apellidos+=e.segundo_apellido;
          }
          e.apellidos = apellidos;
          ModelEmpleado.update({_id:e.id},{$set:{apellidos:apellidos}});
          // api.service('empleados').patch(
          //   e._id,
          //   {
          //   apellidos:apellidos
          // }).then(result =>{
          //   console.log(result.apellidos);
          // })
      });
      res.send('ok');
    }
  );
});



const server = app.listen(3030);

api.setup(server);

console.log('Feathers sub-app example started on 127.0.0.1:3030');
