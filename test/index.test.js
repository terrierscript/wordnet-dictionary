
const assert = require("assert")
const { searchIndex, searchData, getRandomWord } = require("../index")

// searchIndex
const result = searchIndex("lie")
console.log(
  assert.deepStrictEqual(result.verb.offsets, [
    2696550, 1549783,
    2659476, 2740213,
      835938, 2737265,
    1989043,
  ])
  ?? "✅ searchIndex verb offset"
)
console.log(
  assert.deepStrictEqual(result.noun.offsets, [6769542, 11151798, 8641771])
  ?? "✅ searchIndex noun offset"
  )
  
const offset = searchData(2659476)
console.log(
  assert.deepStrictEqual(
    offset.verb.words, ['dwell', 'consist', 'lie', 'lie_in']
    )
  ?? "✅ searchData words"
)
    
console.log(
  assert.deepStrictEqual(offset.verb.glossary,[
    'originate (in)',
    '"The problems dwell in the social injustices in this country"'
  ])
  ?? "✅ searchData words"
)

const random = getRandomWord()
console.log(random)
