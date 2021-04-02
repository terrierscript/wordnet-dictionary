
const assert = require("assert")
const { searchIndex, searchData } = require("../index")

// searchIndex
const result = searchIndex("lie")
assert.deepStrictEqual(result.verb.offsets,[
  2696550, 1549783,
  2659476, 2740213,
    835938, 2737265,
  1989043
])
assert.deepStrictEqual(result.noun.offsets, [6769542, 11151798, 8641771])


const offset = searchData(2659476)

assert.deepStrictEqual(
  offset.words, ['dwell', 'consist', 'lie', 'lie_in']
)
assert.deepStrictEqual(
  offset.glossary,[
    'originate (in)',
    '"The problems dwell in the social injustices in this country"'
  ]
)