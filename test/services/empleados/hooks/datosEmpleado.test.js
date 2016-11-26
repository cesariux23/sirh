'use strict';

const assert = require('assert');
const datosEmpleado = require('../../../../src\services\empleados\hooks\datosEmpleado.js');

describe('empleados datosEmpleado hook', function() {
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
