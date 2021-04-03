const parser = require('fast-xml-parser');
const fs = require("fs")
const path = require("path")

const file = "./generator/english-wordnet-2020.xml"

const generateSource = () => {
  const sourceDir ="source"
  fs.mkdirSync(sourceDir, { recursive: true })
  
  const data = fs.readFileSync(file).toString()
  const obj = parser.parse(data, {
    // attrNodeName: "attributes",
    // arrayMode: "strict",
    ignoreAttributes: false,
    attributeNamePrefix : "",
  })
  fs.writeFileSync(path.join(sourceDir, "lex.json"), JSON.stringify(obj.LexicalResource.Lexicon.LexicalEntry,null,2))
  fs.writeFileSync(path.join(sourceDir, "syn.json"), JSON.stringify(obj.LexicalResource.Lexicon.Synset,null,2))
  // generateLexicalEntriesSource(obj.LexicalResource.Lexicon.LexicalEntry)
  // generateSynsetSource(obj.LexicalResource.Lexicon.Synset)
}

generateSource()