'use strict';

const service = require('feathers-mongoose');
const empleado = require('./empleado-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: empleado,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/empleados', service(options));

  // Get our initialize service to that we can bind hooks
  const empleadoService = app.service('/empleados');

  // Set up our before hooks
  empleadoService.before(hooks.before);

  // Set up our after hooks
  empleadoService.after(hooks.after);
};
