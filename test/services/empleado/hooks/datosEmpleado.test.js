'use strict';

const assert = require('assert');
const datosEmpleado = require('../../../../src\services\empleado\hooks\datosEmpleado.js');

describe('empleado datosEmpleado hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    datosEmpleado()(mockHook);

    assert.ok(mockHook.datosEmpleado);
  });
});
