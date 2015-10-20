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
    expect(defs[0]).to.deep.equal(['def', 'a', ['10', '1']])
  })
  it('Creates tokens for terms', function () {
    var terms = tok('a ++ b')
    expect(terms[0]).to.deep.equal(['parallel', 'a', 'b'])
  })
  it('Cannot parse an uncomplete operation', function () {
    var uncomp = tok('a ++ ')
    expect(uncomp.message).to.be.a('string')
  })

  it('Parses terms with parenthesis', function () {
    var pterms = tok('(a ++ b)')
    expect(pterms[0]).to.deep.equal(['parallel', 'a', 'b'])
  })

  it('Parses terms with multiple parenthesis', function () {
    var pterms = tok('((a ++ (b ° d)) ++ c)')
    expect(pterms[0]).to.deel.equal(['parallel', ['parallel', 'a', ['sequential', 'b', 'd']], 'c'])
  })

  it('Supports loops as postifixes', function () {
    var lterm = tok('a^')
    expect(lterm[0]).to.deep.equal(['loop', 'a'])
  })
  it('Handles parenthesis correctly with loops', function () {
    var lterm = tok('(a ++ b)^')
    expect(lterm[0]).to.deep.equal(['loop', ['parallel', 'a', 'b']])
  })
  it('Parses ramifications correctly', function () {
    var rterm = tok('a°<°b')
    expect(rterm[0]).to.deep.equal(['sequential', 'a', '<', 'b'])
  })
  it('Parses identifications correctly', function () {
    var rterm = tok('a°>')
    expect(rterm[0]).to.deep.equal(['sequential', 'a', '>'])
  })
})
