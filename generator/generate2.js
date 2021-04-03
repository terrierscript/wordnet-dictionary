const fs = require("fs")
const path = require("path")
const util = require("util")

const md5 = require("md5")

const wordToDigest = (l) => {
  return md5(l).slice(0, 2)
}

const itemsToDigests = (obj) => {
  const digests = {}
  Object.entries(obj).map( ([key, value]) => {
    const dig = wordToDigest(key)
    const map = digests[dig] ?? {}
    digests[dig] = {
       ...map,
       [key]: value
    }
  })
  return digests
}

const saveDigests = (dir, digests) => {
  fs.mkdirSync(dir, {recursive:true})
  Object.entries(digests).map(([dig, obj]) => {
    fs.writeFileSync(`${dir}/${dig}.json`, JSON.stringify(obj,null,2))
  })
}

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


const generateLexicalEntries = (lexs) => {

  const entries = lexs.map(lex => {
    const lexId = lex.id
    return [lex.id, lex]
  })
  const dir = "dic/lex"
  const digs = itemsToDigests(Object.fromEntries(entries))
  saveDigests(dir, digs)
}

const generateSynset = (synsets) => {
  const digests = {}
  const entries = synsets.map(syn => {
    const id = s.id
    return [id, syn]
  })

  const digs = itemsToDigests(Object.fromEntries(entries))
  saveDigests(dir, digs)

}



const generateSenseMembers = () => {
  const dir = "dic/lex"
  const files = fs.readdirSync(dir)
  const digests = {}
  
  files.splice(0, 1).map(f => {
    const j = require(`../${dir}/${f}`)
    Object.entries(j).map(([_, v]) => {
      Object.entries(v).map(([_, vv]) => {
        const synset = [vv.Sense.synset].flat(2)
        console.log(vv)
        const dig = wordToDigest(synset)
        const map = digests[dig] ? digests[dig] : {}

        // vv.Sense
        const m = map[synset] ? map[synset] : []
        map[synset] = [...m, vv]
      })
    })
  })
  console.log(digests)

  // console.log(l)
  // const file = 
  // lex.slice(0,10).map(l => {
  //   console.log(l)
  // })
}

// const generateSource = () => {
//   const sourceDir ="source"
//   fs.mkdirSync(sourceDir, { recursive: true })
  
//   const data = fs.readFileSync(file).toString()
//   const obj = parser.parse(data, {
//     // attrNodeName: "attributes",
//     // arrayMode: "strict",
//     ignoreAttributes: false,
//     attributeNamePrefix : "",
//   })
//   fs.writeFileSync(path.join(sourceDir, "lex.json"), JSON.stringify(obj.LexicalResource.Lexicon.LexicalEntry))
//   fs.writeFileSync(path.join(sourceDir, "syn.json"), JSON.stringify(obj.LexicalResource.Lexicon.Synset))
//   // generateLexicalEntriesSource(obj.LexicalResource.Lexicon.LexicalEntry)
//   // generateSynsetSource(obj.LexicalResource.Lexicon.Synset)
// }

const generateDataFiles = () => {
  console.log("start")
  const lex = require("../source/lex")
  console.log("1")
  // generateLexicalEntries(lex)
  console.log("2")
  generateSynset(lex)
  console.log("3")
}
const start = () => {
  generateDataFiles()
  // generateSource()
  // generateSenseMembers()
}

start()