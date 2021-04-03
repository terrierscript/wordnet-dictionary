const fs = require("fs")
const path = require("path")
const util = require("util")

const md5 = require("md5")

const wordToDigest = (l) => {
  return md5(l).slice(0, 2)
}

const mapToObj = (mapObj) => Object.fromEntries([...mapObj.entries()])

const itemsToDigests = (obj) => {
  const digests = {}
  const ent = Object.entries(obj)
  console.log(ent.length)
  ent.map(([key, value], i) => {
    if (i % 10000 === 0) {
      console.log(i)
    }
    const dig = wordToDigest(key)
    // const map = digests[dig] ?? {}
    // digests[dig] = {
    //    ...map,
    //    [key]: value
    // }
    digests[dig] = digests[dig] ?? new Map()
    digests[dig].set(key, value)
    // // digests[dig] = {
    // //    ...map,
    // //    [key]: value
    // // }
  })
  return Object.fromEntries(
    Object.entries(digests).map(([k, v]) => {
      return [k, Object.fromEntries(v)]
    })
  )
  // return mapToObj(digests)
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
const splitDigestObj = (obj,dir) => {
  const digs = itemsToDigests(obj)
  // console.log(Object.values(digs).map(d => d.length))
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

const writeMap = (path, map) => {
  fs.writeFileSync(path,
    JSON.stringify(Object.fromEntries(
      map.entries()
    ), null, 2)
  )

}

const generateLemmaIndex = (lex) => {
  const lemmaIdx = new Map()
  lex.map(l => {
    // lemma
    const lemma = l.lemma.writtenForm 
    lemmaIdx.set(lemma, [
      ...(lemmaIdx.get(lemma) ?? []),
      l.id
    ])
  })
  return lemmaIdx
}

const generateSynsetIndex = (lex) => {
  const synsetIdx = new Map()
  lex.map((l) => {
    // synset
    l.sense.map( ({synset}) => {
      const befS = synsetIdx.get(synset) ?? []
      synsetIdx.set(synset, [...befS, l.id])
    })
  })
  return synsetIdx
}

const generateLexMap = (lex) => {
  const lexMap = new Map()
  lex.map((l) => {
    lexMap.set(l.id, l)
  })
  return lexMap
}


const structLexs = (lexMap, lemmaMap) => {
  const lemmas = [...lemmaMap.entries()]
  return Object.fromEntries(lemmas.map(([k, v]) => {
    const vs = v.map(vv => [vv, lexMap.get(vv)])
    return [k, Object.fromEntries(vs)]
  }))
}
const structSyn = (lexMap, synsetArr) => {

}

const generateDataFiles = (lex,syn) => {
  console.log("start")
  
  console.log("struct map")
  const lexMap = generateLexMap(lex)
  const lemmaMap = generateLemmaIndex(lex)
  const synsetMap = generateSynsetIndex(lex)

  console.log("lex")
  const l = structLexs(lexMap, lemmaMap)
  console.log("lex split")
  splitDigestObj(l, "dic/lex")
  
  console.log("syn")
  // splitDigest(syn, "dic/syn")
  // generateSynset(syn)
  
  console.log("3")
}
const start = () => {
  const lex = require("../source/lex")
  const syn = require("../source/syn")
  generateDataFiles(lex,syn)
  // generateLexIndex()
}

start()