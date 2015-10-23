/* global describe, it */

var expect = require('chai').expect
var tok = require('../lib/tokenizer.js')

describe('Basic Network parser', function () {
  it('Creates tokens for a definition', function () {
    var defs = tok('a = 10 -> 1')
    expect(defs).to.deep.equal(['def', 'a', [10, 1]])
  })
  it('Creates tokens for terms', function () {
    var terms = tok('a ++ b')
    expect(terms).to.deep.equal(['parallel', 'a', 'b'])
  })
  it('Cannot parse an uncomplete operation', function () {
    expect(function () { tok('a ++ ') }).to.throw(Error)
  })

  it('Parses terms with parenthesis', function () {
    var pterms = tok('(a ++ b)')
    expect(pterms).to.deep.equal(['parallel', 'a', 'b'])
  })

  it('Parses terms with multiple parenthesis', function () {
    var pterms = tok('((a ++ (b ° d)) ++ c)')
    expect(pterms).to.deep.equal(['parallel',
        ['parallel', 'a', ['sequential', 'b', 'd']], 'c'])
  })

  it('Supports loops as postifixes', function () {
    var lterm = tok('a^')
    expect(lterm).to.deep.equal(['loop', 'a'])
  })
  it('Handles parenthesis correctly with loops', function () {
    var lterm = tok('(a ++ b)^')
    expect(lterm).to.deep.equal(['loop', ['parallel', 'a', 'b']])
  })
  it('Parses ramifications correctly', function () {
    var rterm = tok('a°<°b')
    expect(rterm).to.deep.equal(['sequential', 'a', ['sequential', '<', 'b']])
  })
  it('Parses identifications correctly', function () {
    var rterm = tok('a°>')
    expect(rterm).to.deep.equal(['sequential', 'a', '>'])
  })
})
