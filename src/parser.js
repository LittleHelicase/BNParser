
var R = require("ramda");

const operators = ["++","°","◦","^","↑"];

export default function(text) {


  return {
    nodes: R.reject(R.contains(R.__, operators), text.split(" ")),
    edges: []
  }
}
