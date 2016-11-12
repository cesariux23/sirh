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
const bodyParser = require('body-parser');

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

//routes
app.get('/empleados', function(req, res, next){
  var limit=20;
  var page=req.query.page ? req.query.page : 1;
  var skip=req.query.page>0 ? (req.query.page-1)*limit : 0;

  api.service('empleados')
    .find({
      paginate: {
        default: limit,
        max: 25
      },
      query: {
        $sort: {adscripcion:1, titular:-1 },
        $skip:skip
      }
    })
    .then(result => res.render('empleados/index', {data:result, page:page, limit:limit}))
    .catch(next);
});

//new empleado
app.get('/empleados/new', function(req, res, next){
  res.render('empleados/new');
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



const server = app.listen(3030);

api.setup(server);

console.log('Feathers sub-app example started on 127.0.0.1:3030');