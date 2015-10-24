/* global describe, it */

var expect = require('chai').expect
var tok = require('../lib/tokenizer.js')

describe('Basic Network parser', function () {
  it('Creates a definition element for a line', function () {
    var defs = tok('t = a')
    expect(defs[0][0]).to.equal('def')
    expect(defs[0][1]).to.equal('t')
    expect(defs[0][2]).to.equal('a')
  })
  it('Creates tokens for terms', function () {
    var terms = tok('t = a ++ b')[0][2]
    expect(terms).to.deep.equal(['parallel', 'a', 'b'])
  })
  it('Cannot parse an uncomplete operation', function () {
    expect(function () { tok('a ++ ') }).to.throw(Error)
  })

  it('Can parse sequential operations', function () {
    var sterm = tok('t = a ° b')[0][2]
    expect(sterm).to.deep.equal(['sequential', 'a', 'b'])
  })

  it('Can parse sequential operations with UTF-8 character ◦', function () {
    var sterm = tok('t = a ◦ b')[0][2]
    expect(sterm).to.deep.equal(['sequential', 'a', 'b'])
  })

  it('Parses terms with parenthesis', function () {
    var pterms = tok('t = (a ++ b)')[0][2]
    expect(pterms).to.deep.equal(['parallel', 'a', 'b'])
  })

  it('Parses terms with multiple parenthesis', function () {
    var pterms = tok('t = ((a ++ (b ° d)) ++ c)')[0][2]
    expect(pterms).to.deep.equal(['parallel',
        ['parallel', 'a', ['sequential', 'b', 'd']], 'c'])
  })

  it('Supports loops as postifixes', function () {
    var lterm = tok('t = a^')[0][2]
    expect(lterm).to.deep.equal(['loop', 'a'])
  })

  it('Supports loops with UTF-8 character ↑ as postifixes', function () {
    var lterm = tok('t = a↑')[0][2]
    expect(lterm).to.deep.equal(['loop', 'a'])
  })
  it('Handles parenthesis correctly with loops', function () {
    var lterm = tok('t = (a ++ b)↑')[0][2]
    expect(lterm).to.deep.equal(['loop', ['parallel', 'a', 'b']])
  })
  it('Parses ramifications correctly', function () {
    var rterm = tok('t = a°<◦b')[0][2]
    expect(rterm).to.deep.equal(['sequential', 'a', ['sequential', '<', 'b']])
  })
  it('Parses identifications correctly', function () {
    var rterm = tok('t = a°>')[0][2]
    expect(rterm).to.deep.equal(['sequential', 'a', '>'])
  })
  it('Handles multiple expressions', function () {
    var mterm = tok('a=b++b\nc=d°d')
    expect(mterm).to.have.length(2)
  })
})
