'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('adscripcion service', function() {
  it('registered the adscripcions service', () => {
    assert.ok(app.service('adscripcions'));
  });
});
