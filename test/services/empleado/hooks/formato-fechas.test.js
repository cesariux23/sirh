'use strict';

const assert = require('assert');
const formatoFechas = require('../../../../src\services\empleado\hooks\formato-fechas.js');

describe('empleado formatoFechas hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    formatoFechas()(mockHook);

    assert.ok(mockHook.formatoFechas);
  });
});
