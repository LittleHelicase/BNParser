/* global describe, it */

var expect = require('chai').expect
var tok = require('../src/tokenizer.js')

describe('Basic Network parser', function () {
  it('Returns a list of tokens', function () {
    var tokens = tok('a = 1 -> 2')
    expect(tokens.value).to.have.length(1)
  })
  it('Creates tokens for a definition', function () {
    var def = tok('a = 10 -> 1')
    expect(def.value[0].type).to.equal('definition')
  })
})
