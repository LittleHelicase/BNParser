
import Parsimmon from 'parsimmon'
var optWhitespace = Parsimmon.optWhitespace

export default function (term) {
  var lexeme = p => p.skip(optWhitespace)

  var name = lexeme(Parsimmon.letters)
//  var concat = lexeme(Parsimmon.string('++'))
  var assign = lexeme(Parsimmon.string('='))
  var number = lexeme(Parsimmon.digits.map(parseInt))
  var arityArrow = lexeme(Parsimmon.string('->').or('→'))

  var expr = Parsimmon.lazy('a term', function () {
    return definition.many()
  })

  var arity = Parsimmon.seq(number.skip(arityArrow), number)
  var definition = Parsimmon.seq(name.skip(assign), arity)
    .map(v => { return { type: 'definition', name: v[0], arity: v[1] } })

  return expr.parse(term)
}
