const obj = require("./source/english-wordnet-2021.json")

const lexSrc = obj.LexicalResource.Lexicon.LexicalEntry
const set = new Set()
lexSrc.map((l) => {
  const s = [l.Sense].flat()
  s.map((ll) => {
    return [ll.SenseRelation].flat().map((sr) => {
      sr?.relType && set.add(sr.relType)
      // console.log(sr)
    })
  })
})
console.log(set)
// obj.LexicalResource.Lexicon.Synset
