'use strict';

const service = require('feathers-mongoose');
const adscripcion = require('./adscripcion-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: adscripcion,
    paginate: {
      default: 100,
      max: 100
    }
  };

  // Initialize our service with any options it requires
  app.use('/adscripciones', service(options));

  // Get our initialize service to that we can bind hooks
  const adscripcionService = app.service('/adscripciones');

  // Set up our before hooks
  adscripcionService.before(hooks.before);

  // Set up our after hooks
  adscripcionService.after(hooks.after);
};
