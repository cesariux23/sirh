'use strict';

// empleado-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
  rfc: {
    type: String,
    uppercase:true,
    required: true
  },
	curp:{
    type:String,
    uppercase:true,
  },
	numero_seguridad_social:String,
  numero_personal:String,
  fecha_nacimiento:Date,
	nombre:{
    type:String,
    uppercase:true,
    required:true
  },
	primer_apellido:{
    type:String,
    uppercase:true,
  },
  segundo_apellido:{
    type:String,
    uppercase:true,
  },
  //concatena los apellidos para generar el nombre completo
  apellidos:String,
	//adscripcion:String,
  //objeto adscripcion
  // adscripcion:[{
  //   clave:String,
  //   nombre:String,
  // }],
  adscripcion:{
    type:Object,
    'default':{
      clave:'130-00',
    }
  },
	puesto:Schema.Types.Mixed,
  //objeto puesto
  historial_puesto:[{
    tipo_contrato:String,
    clave:String,
    Nivel:String,
    zona:Number,
    descripcion:String,
    inicio:Date,
    fin:Date,
    antiguedad_relativa:Number,
    activo:Boolean
  }],
	fecha_ingreso:Date,
	sexo:String,
	escolaridad:String,
	fotografia:String,
	actividades:String,
  pago:[{
    //default el pago es en cheque
    tipo:{
      type:String,
      'default':'CHEQUE'
    },
    clave:{
      type:String,
      default:'28'
    },
    banco:[
      {
        clave:String,
        nombre:String,
        numero_cuenta:Number,
        activo:{
          type:Boolean,
          'default':true
        }
      }
    ]
  }],
	activo:{
		type:Boolean,
		'default':true
	},
	tipo_contrato:{
		type:String,
		'default':'HONORARIOS'
	},
  contrato:[{
    tipo:{
      type:String,
  		'default':'HONORARIOS'
    },
    inicio:Date,
    fin:Date,
  }],
  //bandera que marca si es titular de un area
	titular:{
    type:Boolean,
    'default':false
  },
	createdAt: { type: Date, 'default': Date.now },
	updatedAt: { type: Date, 'default': Date.now }
});

const empleadoModel = mongoose.model('empleados', empleadoSchema);

module.exports = empleadoModel;
