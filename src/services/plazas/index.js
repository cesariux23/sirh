'use strict';

const service = require('feathers-mongoose');
const plazas = require('./plazas-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: plazas,
    paginate: {
      default: 40,
      max: 40
    }
  };

  // Initialize our service with any options it requires
  app.use('/plazas', service(options));

  // Get our initialize service to that we can bind hooks
  const plazasService = app.service('/plazas');

  // Set up our before hooks
  plazasService.before(hooks.before);

  // Set up our after hooks
  plazasService.after(hooks.after);
};
