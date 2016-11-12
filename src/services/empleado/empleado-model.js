'use strict';

// empleado-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
  	rfc: { type: String, required: true },
	curp: String,
	homoclave:String,
	numero_seguridad_social:String,
	nombre:String,
	primer_apellido:String,
	segundo_apellido:String,
	adscripcion:String,
	puesto:String,
	fecha_ingreso:Date,
	sexo:String,
	escolaridad:String,
	fotografia:String,
	actividades:String,
	activo:{
		type:Boolean,
		'default':true
	},
	tipo_contrato:{
		type:String,
		'default':'HONORARIOS'
	},
	titular:Boolean,		
	createdAt: { type: Date, 'default': Date.now },
	updatedAt: { type: Date, 'default': Date.now }
});

const empleadoModel = mongoose.model('empleados', empleadoSchema);

module.exports = empleadoModel;
