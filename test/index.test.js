
const assert = require("assert")
const { searchIndex, searchData } = require("../src/index")

// searchIndex
const result = searchIndex("lie")
assert.deepStrictEqual(result.verb.offsets,[
  2696550, 1549783,
  2659476, 2740213,
    835938, 2737265,
  1989043
])
assert.deepStrictEqual(result.noun.offsets, [ 6769542, 11151798, 8641771 ])