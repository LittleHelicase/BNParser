/* global describe, it */

var expect = require('chai').expect
var tok = require('../src/tokenizer.js')

describe('Basic Network parser', function () {
  it('Returns a list of tokens', function () {
    var tokens = tok('a = 1 -> 2')
    expect(tokens.value).to.have.length(1)
  })
  it('Creates tokens for a definition', function () {
    var defs = tok('a = 10 -> 1')
    expect(defs.status).to.be.true
    var def = defs.value[0]
    expect(def.type).to.equal('definition')
    expect(def.name).to.equal('a')
    expect(def.arity).to.deep.equal([10,1])
  })
  it('Creates tokens for terms', function(){
    var terms = tok('a ++ b')
    console.log(terms)
    expect(terms.status).to.be.true
    var term = terms.value[0]
  })
})
