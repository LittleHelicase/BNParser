/* global describe, it */

var expect = require('chai').expect

var parse = require('../src/parser.js')

describe('Basic Network parser', function () {
  it('Returns a list of nodes', function () {
    var graph = parse('A=1->1\nB=1->1\nC=2->1\nA ++ B ° C')
    expect(graph.nodes).to.be.an('array')
    expect(graph.nodes).to.deep.equal(['A', 'B', 'C'])
    // The connections contain a port which is currently identified
    // by the port number
    // ['outgoing node name', outgoing port, 'ingoing node name', ingoing port]
    expect(graph.edges).to.include.members(
      [['A', 0, 'C', 0], ['B', 0, 'C', 1]])
  })
})
