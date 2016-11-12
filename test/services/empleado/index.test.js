'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('empleado service', function() {
  it('registered the empleados service', () => {
    assert.ok(app.service('empleados'));
  });
});
