
import Parsimmon from 'parsimmon'
var optWhitespace = Parsimmon.optWhitespace

export default function (termString) {
  var lexeme = p => p.skip(optWhitespace)

  var word = lexeme(Parsimmon.regex(/[a-z]+/i))
  var concat = lexeme(Parsimmon.string('++'))
  var operator = concat
  // var assign = lexeme(Parsimmon.string('='))
  // var number = lexeme(Parsimmon.digits.map(parseInt))
  // var arityArrow = lexeme(Parsimmon.string('->').or('→'))

  var expr = Parsimmon.lazy('a term', function () {
    return term
  })
  var operation = Parsimmon.lazy(function () {
    return Parsimmon.seq(term, operator, term)
  })
  var term = word.or(operation)

  // var arity = Parsimmon.seq(number.skip(arityArrow), number)
  /* var definition = Parsimmon.seq(word.skip(assign), arity)
    .map(v => { return { type: 'definition', name: v[0], arity: v[1] } }) */

  return expr.parse(termString)
}
