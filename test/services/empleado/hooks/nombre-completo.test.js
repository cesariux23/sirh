'use strict';

const assert = require('assert');
const nombreCompleto = require('../../../../src\services\empleado\hooks\nombre-completo.js');

describe('empleado nombreCompleto hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    nombreCompleto()(mockHook);

    assert.ok(mockHook.nombreCompleto);
  });
});
