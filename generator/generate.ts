// lemma -> LexicalEntityId
// LexicalEntity
// LexicalEntity -> [SenseId]
// LexicalEntity -> [SyntacticBehId]
// SenseId
// Sense -> LexicalEntityId

// Sense -> SynsetId
// sense -> syset
// Sense -> [senseRelationId]
// = sense -> sense
// SynsetId
// Synset -> [synsetRelationId]
// = synset -> synset
// Synset -> LexicalEntity
// synset -> member

import * as builders from "./builder"
import { saveDigestObj } from "./save"

const execute = (name, dir, executor) => {
  console.log(`start: ${name}`)
  const result = executor()
  console.log(`write: ${name}`)
  saveDigestObj(result, dir)
  console.log(`end ${name}`)
}

const generateDataFiles = (lexSrc, synSrc) => {
  console.log("start")

  execute("lexical-entries", "dic/lex", () =>
    builders.buildLexicalEntries(lexSrc)
  )
  execute("synset", "dic/syn", () => builders.buildSynset(synSrc))
  execute("sense", "dic/sense", () => builders.buildSense(lexSrc))
  execute("lemma-index", "dic/lemma", () => builders.buildLemmaIndex(lexSrc))
  execute("synset-index", "dic/synidx", () => builders.buildSynsetIndex(lexSrc))
  execute("syntactic-behaviour", "dic/behavior", () =>
    builders.buildSyntacticBehaviour(lexSrc)
  )
  execute("senseidx", "dic/senseidx", () => builders.buildSenseIndex(lexSrc))

  console.log("end")
}

export const generate = (obj) => {
  // const obj = require("./source/english-wordnet-2021.json")
  generateDataFiles(
    obj.LexicalResource.Lexicon.LexicalEntry,
    obj.LexicalResource.Lexicon.Synset
  )
  // generateLexIndex()
}
