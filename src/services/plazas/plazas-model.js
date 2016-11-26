'use strict';

// plazas-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plazasSchema = new Schema({
  clave:{
    type:String,
    required:true
  },
  codigo:String,
  descripcion:String,
  nivel:String,
  tipo:String,
  zona:Number,
  activo:{
    type:Boolean,
    'default':true
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const plazasModel = mongoose.model('plazas', plazasSchema);

module.exports = plazasModel;
