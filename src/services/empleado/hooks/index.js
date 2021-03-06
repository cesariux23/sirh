'use strict';

const formatoFechas = require('./formato-fechas');

const nombreCompleto = require('./nombre-completo');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [nombreCompleto()],
  update: [nombreCompleto()],
  patch: [nombreCompleto()],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
