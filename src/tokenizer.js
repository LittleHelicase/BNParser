
import Parsimmon from 'parsimmon'
var optWhitespace = Parsimmon.optWhitespace

var string = Parsimmon.string

export default function (termString) {
  var lexeme = p => p.skip(optWhitespace)

  var word = lexeme(Parsimmon.regex(/[a-z]+/i))
  var concat = lexeme(string('++'))
  var operator = concat
  var assign = lexeme(string('='))
  var number = lexeme(Parsimmon.digits.map(parseInt))
  var arityArrow = lexeme(string('->').or('→'))

  var expr = Parsimmon.lazy('a term', function () {
    return line
  })
  var operation = Parsimmon.lazy(function () {
    return string('(').then(term).skip(string(')'))
      .or(Parsimmon.seq(term, operator, term))
  })
  var term = operation.or(word)

  var arity = Parsimmon.seq(number.skip(arityArrow), number)
  var definition = Parsimmon.seq(word.skip(assign), arity)
    .map(v => { return { type: 'definition', name: v[0], arity: v[1] } })

  var line = definition.or(term)

  return expr.parse(termString)
}
