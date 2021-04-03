const parser = require('fast-xml-parser');
const fs = require("fs")
const path = require("path")

const file = "./generator/english-wordnet-2020.xml"

const arr = (item) => [item].flat().filter(x => x !== null && x !== undefined)
const emp = (obj) => {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => [k, v])
      .filter(([_, v]) => !(Array.isArray(v) && v.length === 0))
      .filter(([_, v]) => !(v === null))
  )
}

const convertLex = (lex) => {
  const { Lemma, Sense, Form,SyntacticBehaviour, ...rest } = lex
  const newSense = arr(Sense).map(sense => {
    const { SenseRelation, ...senseRest } = sense
    return emp({
      ...senseRest,
      senseRelation: arr(SenseRelation)
    })
  })
  return emp({
    ...rest,
    lemma: Lemma,
    form: arr(Form),
    sense: newSense,
    syntacticBehaviour: arr(SyntacticBehaviour)
  })
}

const generateLexicalEntries = (lexs) => {
  return lexs.map(lex => {
    return  convertLex(lex)
  })
}

const convertSynset = (syn) => {
  const { SynsetRelation, Definition, Example, ILIDefinition, ...rest } = syn
  return emp({
    ...rest,
    iliDefinition: ILIDefinition,
    synsetRelation: arr(SynsetRelation),
    definition: arr(Definition),
    example: arr(Example)
  })
}

const generateSynset = (synsets) => {
  return synsets.map(syn => {
    return convertSynset(syn)
  })
}

const generateSource = () => {
  const sourceDir ="source"
  fs.mkdirSync(sourceDir, { recursive: true })
  
  const data = fs.readFileSync(file).toString()
  console.log("parse")
  const obj = parser.parse(data, {
    // attrNodeName: "attributes",
    // arrayMode: "strict",
    ignoreAttributes: false,
    attributeNamePrefix : "",
  })
  const lex = generateLexicalEntries(obj.LexicalResource.Lexicon.LexicalEntry)
  const syn = generateSynset(obj.LexicalResource.Lexicon.Synset)
  console.log("end")
  return {lex, syn}
  //   generateLexicalEntries(obj.LexicalResource.Lexicon.LexicalEntry)
  // console.log("lex")
  // fs.writeFileSync(path.join(sourceDir, "lex.json"), JSON.stringify(
  // , null, 2))
  // console.log("syn")
  // fs.writeFileSync(path.join(sourceDir, "syn.json"), JSON.stringify(
  // , null, 2))
  // generateLexicalEntriesSource(obj.LexicalResource.Lexicon.LexicalEntry)
  // generateSynsetSource(obj.LexicalResource.Lexicon.Synset)
}

module.exports = generateSource