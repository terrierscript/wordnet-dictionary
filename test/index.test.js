
const assert = require("assert")
const {  getLexicalEntry, getSynset, getSynsetIndex,getRandomWord } = require("../index")

const lex = getLexicalEntry("ewn-lie-v")
console.log(
  assert.deepStrictEqual(
    lex.sense,
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
const synset = getSynset('ewn-02696550-v')
console.log(
  assert.deepStrictEqual(
    synset.definition, ['be located or situated somewhere; occupy a certain position'],
  )
  ?? "✅ synset Definition"
)
console.log(
  assert.deepStrictEqual(
    synset.synsetRelation.map(r => r.target),
    [ 'ewn-02737265-v', 'ewn-02661230-v','ewn-02697196-v', 'ewn-02697331-v','ewn-02697564-v', 'ewn-02697732-v','ewn-02697931-v', 'ewn-02698039-v','ewn-02698177-v', 'ewn-02698400-v','ewn-02698528-v', 'ewn-02698930-v','ewn-02699010-v', 'ewn-02699161-v','ewn-02699807-v', 'ewn-02699948-v','ewn-02700129-v', 'ewn-02701971-v','ewn-02709399-v', 'ewn-02719059-v','ewn-02727841-v']
  )
  ?? "✅ synset relation"
)

const synset2 = getSynsetIndex('ewn-02709399-v')
console.log(
  assert.deepStrictEqual(
    synset2.lexicalEntry, [
      'ewn-run_along-v',
      'ewn-line-v'
    ]
  )
  ?? "✅ synset members"
)

// searchSynset()
for (let i = 0; i < 100; i++) {
  const random = getRandomWord()
  assert.strictEqual(typeof random ,"string")
}