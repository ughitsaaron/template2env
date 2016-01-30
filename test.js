/* jshint mocha: true */

'use strict';

const temp2env = require('./index'),
  assert = require('assert'),

  FIX_TEST_UNDEF = 'abcdef${THROW}hijklmno',

  FIX_TEST_NOVAR = 'abcdefghijklmnop',

  FIX_TEST1 = 'abcdef${FIRST}hijklmno',
  EXPECTED1 = 'abcdef123hijklmno',

  FIX_TEST2 = 'abcdef${FIRST}hijklmno${SECOND}pqrst',
  EXPECTED2 = 'abcdef123hijklmno456pqrst',

  FIX_TEST3 = 'abcdef${FIRST}hijklmno${SECOND}pqrst${THIRD}uvwxyz',
  EXPECTED3 = 'abcdef123hijklmno456pqrst789uvwxyz',

  opts = {
    start: '{{',
    end: '}}'
  },

  FIX_TEST_OPTS = 'abcdef{{FIRST}}hijklmno{{SECOND}}pqrst',
  EXPECTED_OPTS = EXPECTED2;

process.env.FIRST = '123';
process.env.SECOND = '456';
process.env.THIRD = '789';

it('should throw', function () {
  assert.throws(temp2env.bind(null, FIX_TEST_UNDEF), Error);
});

it('should return same', function () {
  assert.equal(temp2env(FIX_TEST_NOVAR), FIX_TEST_NOVAR);
});

it('returns empty string', function () {
  assert.equal(temp2env(), '');
});

it('should replace one var', function () {
  assert.equal(temp2env(FIX_TEST1), EXPECTED1);
});

it('should replace both vars', function () {
  assert.equal(temp2env(FIX_TEST2), EXPECTED2);
});

it('should replace all three vars', function () {
  assert.equal(temp2env(FIX_TEST3), EXPECTED3);
});

it('should recognize new interpolation tokens', function () {
  assert.equal(temp2env(FIX_TEST_OPTS, opts), EXPECTED_OPTS);
});
