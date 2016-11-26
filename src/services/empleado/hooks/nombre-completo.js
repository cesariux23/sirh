'use strict';

// src\services\empleado\hooks\nombre-completo.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    let apellidos="";
    if(hook.data.primer_apellido)
      apellidos=hook.data.primer_apellido;
      if(hook.data.segundo_apellido){
        if(apellidos.length>0)
          apellidos+=" ";
        apellidos+=hook.data.segundo_apellido;
      }
    hook.data.apellidos = apellidos;
  };
};
