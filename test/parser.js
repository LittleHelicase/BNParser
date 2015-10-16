/* global describe, it */

var expect = require('chai').expect

var parse = require('../src/parser.js')

describe('Basic Network parser', function () {
  it('Returns a list of nodes', function () {
    var graph = parse('A ++ B ° C')
    expect(graph.nodes).to.be.an('array')
    expect(graph.nodes).to.deep.equal(['A', 'B', 'C'])
  })

  it('Creates a sequential composition via °', function () {
    var graph = parse('A ° B')
    expect(graph.edges).to.have.length(1)
    expect(graph.edges[0]).to.deep.equal({from: 'A', to: 'B'})
  })
})
