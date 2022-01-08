// const parser = require("fast-xml-parser")
// const fs = require("fs")
// const path = require("path")

// const file = "./generator/english-wordnet-2021.xml"

const arr = (item) => [item].flat().filter((x) => x !== null && x !== undefined)
const emp = (obj) => {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => [k, v])
      .filter(([_, v]) => !(Array.isArray(v) && v.length === 0))
      .filter(([_, v]) => !(v === null))
  )
}

const convertLex2 = (lex) => {
  const { Lemma, Form, Sense, SyntacticBehaviour, ...rest } = lex
  const senseIds = arr(Sense).map((sense) => sense.id)
  return emp({
    ...rest,
    lemma: Lemma,
    form: arr(Form),
    sense: senseIds,
    // syntacticBehaviour: arr(SyntacticBehaviour)
  })
}

const buildLexicalEntries = (lexs) => {
  return Object.fromEntries(
    lexs.map((lex) => {
      return [lex.id, convertLex2(lex)]
    })
  )
}

const convertSynset = (syn) => {
  const { SynsetRelation, Definition, Example, ILIDefinition, ...rest } = syn
  return emp({
    ...rest,
    iliDefinition: ILIDefinition,
    synsetRelation: arr(SynsetRelation),
    definition: arr(Definition),
    example: arr(Example),
  })
}

const buildSynset = (synsets) => {
  return Object.fromEntries(
    synsets.map((syn) => {
      return [syn.id, convertSynset(syn)]
    })
  )
}

const buildSynsetIndex = (lex) => {
  const synsetIdx = new Map()
  lex.map((l) => {
    // synset
    arr(l.Sense).map(({ synset }) => {
      const curr = synsetIdx.get(synset) ?? []
      synsetIdx.set(synset, [...curr, l.id])
    })
  })
  return Object.fromEntries(
    [...synsetIdx.entries()].map(([k, v]) => {
      return [k, { lexicalEntry: v }]
    })
  )
}

const buildSense = (lex) => {
  const map = new Map()
  lex
    .map((l, i) => {
      return arr(l.Sense)
    })
    .flat()
    .map(({ SenseRelation, ...sense }) => {
      const newSense = emp({
        ...sense,
        senseRelation: arr(SenseRelation),
      })
      // console.log(newSense)
      map.set(sense.id, newSense)
    })
  return map
}

const buildLemmaIndex = (lex) => {
  const lemmaIdx = new Map()
  const formsIdx = new Map()
  lex.map((l, i) => {
    const id = l.id
    const lemma = l.Lemma.writtenForm
    const curr = lemmaIdx.get(lemma) ?? []
    lemmaIdx.set(lemma, [...curr, id])

    // form idx
    arr(l.Form).map((l) => {
      const curr = formsIdx.get(lemma) ?? []
      formsIdx.set(l.writtenForm, [...curr, id])
    })
  })
  const all = new Set([...lemmaIdx.keys(), ...formsIdx.keys()])

  return Object.fromEntries(
    [...all]
      .map((k) => {
        return [
          k,
          {
            lexicalEntry: lemmaIdx.get(k),
            form: formsIdx.get(k),
          },
        ]
      })
      .sort()
  )
}

const buildSyntacticBehaviour = (lexSrc) => {
  const idx = new Map()
  lexSrc.map((lex) => {
    arr(lex.SyntacticBehaviour).map(({ senses, subcategorizationFrame }) => {
      senses.split(" ").map((s) => {
        const curr = idx.get(s) ?? []
        idx.set(s, [...curr, subcategorizationFrame])
      })
    })
  })
  return idx
}

// output: { [synset] :synset[]] }
// lex -> sense -> relType=derivation's revert delivation
const buildSenseIndex = (lex) => {
  const map = new Map()
  lex.map((l) =>
    [l.Sense].flat().map((sense) => {
      const synset = sense.synset
      const rels = [sense.SenseRelation].flat().filter((l) => !!l)
      rels.map((rel) => {
        const m = map.get(rel.target) ?? []
        map.set(rel.target, [
          ...m,
          {
            relType: rel.relType,
            synset,
            sense: sense.id,
          },
        ])
      })
    })
  )
  return map
}

module.exports = {
  buildLexicalEntries,
  buildSynset,
  buildSense,
  buildLemmaIndex,
  buildSynsetIndex,
  buildSyntacticBehaviour,
  buildSenseIndex,
}
