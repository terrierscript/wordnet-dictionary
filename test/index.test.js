const assert = require("assert")
const {
  getLexicalEntry,
  getSynset,
  getSynsetIndex,
  getRandomWord,
} = require("../dist/index")

const lex = getLexicalEntry("oewn-lie-v")
console.log(
  assert.deepStrictEqual(lex.sense, [
    "oewn-lie__2.42.00..",
    "oewn-lie__2.35.00..",
    "oewn-lie__2.42.01..",
    "oewn-lie__2.42.03..",
    "oewn-lie__2.32.00..",
    "oewn-lie__2.42.02..",
    "oewn-lie__2.38.00..",
  ]) ?? "✅ searchLexicalEntry sense"
)
const synset = getSynset("oewn-02696550-v")
console.log(
  assert.deepStrictEqual(synset.definition, [
    "be located or situated somewhere; occupy a certain position",
  ]) ?? "✅ synset Definition"
)
console.log(
  assert.deepStrictEqual(
    synset.synsetRelation.map((r) => r.target),
    [
      "oewn-02737265-v",
      "oewn-02661230-v",
      "oewn-02697196-v",
      "oewn-02697331-v",
      "oewn-02697564-v",
      "oewn-02697732-v",
      "oewn-02697931-v",
      "oewn-02698039-v",
      "oewn-02698177-v",
      "oewn-02698400-v",
      "oewn-02698528-v",
      "oewn-02698930-v",
      "oewn-02699010-v",
      "oewn-02699161-v",
      "oewn-02699807-v",
      "oewn-02699948-v",
      "oewn-02700129-v",
      "oewn-02701971-v",
      "oewn-02709399-v",
      "oewn-02719059-v",
      "oewn-02727841-v",
    ]
  ) ?? "✅ synset relation"
)

const synset2 = getSynsetIndex("oewn-02709399-v")
console.log(
  assert.deepStrictEqual(synset2.lexicalEntry, [
    "oewn-line-v",
    "oewn-run_along-v",
  ]) ?? "✅ synset members"
)

// searchSynset()
for (let i = 0; i < 100; i++) {
  const random = getRandomWord()
  assert.strictEqual(typeof random, "string")
}
