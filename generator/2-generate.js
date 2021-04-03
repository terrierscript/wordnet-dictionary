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

const debug = (obj) => console.log(util.inspect(obj, { depth: Infinity, colors: true }))

// const arr = (item) => [item].flat().filter(x => x !== null && x !== undefined)
// const emp = (obj) => {
//   return Object.fromEntries(
//     Object.entries(obj)
//       .map(([k, v]) => [k, v])
//       .filter(([_, v]) => !(Array.isArray(v) && v.length === 0))
//       .filter(([_, v]) => !(v === null))
//   )
// }
// const convertLex = (lex) => {
//   const { Sense, Form,SyntacticBehaviour, ...rest } = lex
//   const newSense = arr(Sense).map(sense => {
//     const { SenseRelation, ...senseRest } = sense
//     return emp({
//       ...senseRest,
//       SenseRelation: arr(SenseRelation)
//     })
//   })
//   return emp({
//     ...rest,
//     form: arr(Form),
//     sense: newSense,
//     syntacticBehaviour: arr(SyntacticBehaviour)
//   })
// }

const splitDigest = (items,dir) => {
  const entries = items.map(item => {
    return [item.id, item]
  })
  const digs = itemsToDigests(Object.fromEntries(entries))
  saveDigests(dir, digs)
}

// const generateLexicalEntries = (lexs) => {
//   const entries = lexs.map(lex => {
//     const lexId = lex.id
//     return [lexId, lex]
//   })
//   const dir = "dic/lex"
//   const digs = itemsToDigests(Object.fromEntries(entries))
//   saveDigests(dir, digs)
// }

// const convertSynset = (syn) => {
//   const { SynsetRelation, Definition, Example, ILIDefinition, ...rest } = syn
//   return emp({
//     ...rest,
//     iliDefinition: ILIDefinition,
//     synsetRelation: arr(SynsetRelation),
//     definition: arr(Definition),
//     example: arr(Example)
//   })
// }

// const generateSynset = (synsets) => {
//   const entries = synsets.map(syn => {
//     const id = syn.id
//     return [id, convertSynset(syn)]
//   })
//   const dir = "dic/syn"
//   const digs = itemsToDigests(Object.fromEntries(entries))
//   saveDigests(dir, digs)
// }



// const generateSenseMembers = () => {
//   const dir = "dic/lex"
//   const files = fs.readdirSync(dir)
//   const digests = {}
  
//   files.splice(0, 1).map(f => {
//     const j = require(`../${dir}/${f}`)
//     Object.entries(j).map(([_, v]) => {
//       Object.entries(v).map(([_, vv]) => {
//         const synset = [vv.Sense.synset].flat(2)
//         console.log(vv)
//         const dig = wordToDigest(synset)
//         const map = digests[dig] ? digests[dig] : {}

//         // vv.Sense
//         const m = map[synset] ? map[synset] : []
//         map[synset] = [...m, vv]
//       })
//     })
//   })
//   console.log(digests)

//   // console.log(l)
//   // const file = 
//   // lex.slice(0,10).map(l => {
//   //   console.log(l)
//   // })
// }

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

const generateLexIndex = () => {
  const lex = require("../source/lex")
  const lemmaIdx = {}
  const synsetIdx = {}
  lex.slice(0, 10).map(l => {
    console.log(JSON.stringify(l, null, 2))
    
    // lemma
    const lemma = l.lemma.writtenForm 
    const newL = lemmaIdx[lemma] ?? []
    lemmaIdx[lemma] = [...newL, l.id]

    // synset
    const synsets = l.sense.map(s => s.synset)
    
  })
  // const 
}

const generateDataFiles = () => {
  console.log("start")

  console.log("lex")
  const lex = require("../source/lex")
  splitDigest(lex, "dic/lex")
  // generateLexicalEntries(lex)
  
  console.log("syn")
  const syn = require("../source/syn")
  splitDigest(syn, "dic/syn")
  // generateSynset(syn)

  console.log("3")
}
const start = () => {
  // generateDataFiles()
  generateLexIndex()
}

start()