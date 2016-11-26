'use strict';

// adscripcion-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adscripcionSchema = new Schema({
  _id:String,
  raiz:Boolean,
  nombre:String,
  titular:[{ nombre:String, puesto:String, fecha_inicio:Date, fecha_fin:Date, activo:Boolean}],
  empleados:Number,
  super:{
    type:String,
    default:"130-00",
  },
  activo:{
    type:Boolean,
    default:true
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const adscripcionModel = mongoose.model('adscripciones', adscripcionSchema);

module.exports = adscripcionModel;
