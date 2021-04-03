
const assert = require("assert")
const { searchIndex, searchData, searchLexicalEntry, searchSynset, getRandomWord } = require("../index")

// // searchIndex
// const result = searchIndex("lie")
// console.log(
//   assert.deepStrictEqual(result.verb.offsets, [
//     2696550, 1549783,
//     2659476, 2740213,
//       835938, 2737265,
//     1989043,
//   ])
//   ?? "✅ searchIndex verb offset"
// )
// console.log(
//   assert.deepStrictEqual(result.noun.offsets, [6769542, 11151798, 8641771])
//   ?? "✅ searchIndex noun offset"
//   )
  
// const offset = searchData(2659476)
// console.log(
//   assert.deepStrictEqual(
//     offset.verb.words, ['dwell', 'consist', 'lie', 'lie_in']
//     )
//   ?? "✅ searchData words"
// )
    
// console.log(
//   assert.deepStrictEqual(offset.verb.glossary,[
//     'originate (in)',
//     '"The problems dwell in the social injustices in this country"'
//   ])
//   ?? "✅ searchData words"
// )

const lex = searchLexicalEntry("lie")
console.log(
  assert.deepStrictEqual(
    lex["ewn-lie-v"].Sense.map(s => s.id),
    [
      'ewn-lie-v-02696550-01',
      'ewn-lie-v-01549783-01',
      'ewn-lie-v-02659476-03',
      'ewn-lie-v-02740213-01',
      'ewn-lie-v-00835938-01',
      'ewn-lie-v-02737265-01',
      'ewn-lie-v-01989043-02'
    ])
  ?? "✅ searchLexicalEntry sense"
)
console.log(require("util").inspect(lex, {depth: Infinity, color:true}))

const synset = searchSynset('ewn-02696550-v')
console.log(
  assert.deepStrictEqual(
    synset.Definition, 'be located or situated somewhere; occupy a certain position',
  )
  ?? "✅ synset Definition"
)
console.log(
  assert.deepStrictEqual(
    synset.SynsetRelation.map(r => r.target),
    [ 'ewn-02737265-v', 'ewn-02661230-v',
    'ewn-02697196-v', 'ewn-02697331-v',
    'ewn-02697564-v', 'ewn-02697732-v',
    'ewn-02697931-v', 'ewn-02698039-v',
    'ewn-02698177-v', 'ewn-02698400-v',
    'ewn-02698528-v', 'ewn-02698930-v',
    'ewn-02699010-v', 'ewn-02699161-v',
    'ewn-02699807-v', 'ewn-02699948-v',
    'ewn-02700129-v', 'ewn-02701971-v',
    'ewn-02709399-v', 'ewn-02719059-v',
    'ewn-02727841-v']
  )
  ?? "✅ synset Definition"
)

// searchSynset()
for (let i = 0; i < 100; i++) {
  const random = getRandomWord()
  assert.strictEqual(typeof random ,"string")
}
