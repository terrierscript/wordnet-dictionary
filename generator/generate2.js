const fs = require("fs")
const util = require("util")
const parser = require('fast-xml-parser');

const md5 = require("md5")

const wordToDigest = (l) => {
  return md5(l).slice(0, 2)
}


const file = "./english-wordnet-2020.xml"
// const htmlparser2 = require("htmlparser2");

// const parser = new WritableStream({
//   ontext(text) {
//     console.log(text)
//   },
//   onopentag(name, attribute) {
//     console.log(name,attribute)
//   }
// })

// const fileStream = fs.createReadStream("./english-wordnet-2020.xml")

// fileStream.pipe(parser)

const debug = (obj) => console.log(util.inspect(obj, { depth: Infinity, colors: true }))


const parseLexicalEntries = (lexs) => {
  const digests = {}
  lexs.map(lex => {
    const key = lex.Lemma.writtenForm
    // console.log("l",lex,key)
    const lexId = lex.id
    const dig = wordToDigest(key)
    // digests[dig]
    // = digests[dig]
    const allMap = digests[dig] ? digests[dig] : {}

    // init
    const keyMap = allMap[key] ? allMap[key] : {}
    digests[dig] = { ...allMap, [key]: { ...keyMap, [lexId] : lex } }
  })
  const dir = "dic/lex"
  fs.mkdirSync(dir, { recursive: true })

  Object.entries(digests).map(([dig, obj]) => {
    fs.writeFileSync(`${dir}/${dig}.json`, JSON.stringify(obj,null,2))
  })

}
const parseSynset = (synset) => {
  debug(synset[0])
}


const start = () => {

  const data = fs.readFileSync(file).toString()
  const obj = parser.parse(data, {
    // attrNodeName: "attributes",
    ignoreAttributes: false,
    attributeNamePrefix : "",
  })
  parseLexicalEntries(obj.LexicalResource.Lexicon.LexicalEntry)
  // parseSynset(obj.LexicalResource.Lexicon.Synset)
}

start()