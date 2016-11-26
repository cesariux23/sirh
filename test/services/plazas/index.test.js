'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('plazas service', function() {
  it('registered the plazas service', () => {
    assert.ok(app.service('plazas'));
  });
});
