const fs = require("fs")
const path = require("path")
const util = require("util")

const md5 = require("md5")

const wordToDigest = (l) => {
  return md5(l).slice(0, 2)
}

const itemsToDigests = (obj) => {
  const digests = new Map()
  const ent = Object.entries(obj)
  ent.map(([key, value], i) => {
    const dig = wordToDigest(key)
    digests.set(dig, digests.get(dig) ?? new Map())
    digests.get(dig).set(key, value)
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


const splitDigest = (items,dir) => {
  const entries = items.map(item => {
    return [item.id, item]
  })
  const digs = itemsToDigests(Object.fromEntries(entries))
  saveDigests(dir, digs)
}

const splitDigestObj = (obj, dir) => {
  const digs = itemsToDigests(obj)
  // console.log(Object.values(digs).map(d => d.length))
  saveDigests(dir, digs)
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
const structSyn = (syn, synsetMap,lexMap) => {
  return Object.fromEntries(
    syn.map(s => {
      const synset = synsetMap.get(s.id)
      const lex = synset.map(ss => lexMap.get(ss))
      const members = lex.map( l => l.lemma.writtenForm)
      // console.log(s.id, members)
      return [s.id, { ...s, members }]
    })
  )
}

const generateDataFiles = (lex,syn) => {
  console.log("start")
  
  console.log("struct map")
  const lexMap = generateLexMap(lex)
  const lemmaMap = generateLemmaIndex(lex)
  const synsetMap = generateSynsetIndex(lex)

  console.log("lex")
  const l = structLexs(lexMap, lemmaMap)
  splitDigestObj(l, "dic/lex")
  
  console.log("syn")
  const s = structSyn(syn, synsetMap, lexMap)
  console.log(s)
  splitDigestObj(s, "dic/syn")
  
  console.log("end")
}
const start = () => {
  const lex = require("../source/lex")
  const syn = require("../source/syn")
  generateDataFiles(lex,syn)
  // generateLexIndex()
}

start()