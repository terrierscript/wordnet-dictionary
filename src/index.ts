import md5 from "md5"
import path from "path"
import { Lemma } from "./types/Lemma"
import { LexicalEntry } from "./types/LexicalEntry"
import { Sense } from "./types/Sense"
import { SenseIndex } from "./types/SenseIndex"
import { Synset } from "./types/Synset"
import { SynsetIndex } from "./types/SynsetIndex"

export type {
  Lemma,
  LexicalEntry,
  Sense,
  SenseIndex,
  Synset,
  SynsetIndex,
}

const wordToDigest = (l: string) => {
  return md5(l).slice(0, 2)
}

const getDefaultFileLoader = (dirname: string, dig: string) => {
  return require(`../dic/${dirname}/${dig}.json`)
}

const defaultOptions = {
  loader: getDefaultFileLoader
}
type Behavior = string[]

export const generateDictionary = ({ loader } = defaultOptions) => {

  const getItem = <T>(dirname: string, key: string): T | undefined => {
    const dig = wordToDigest(key)
    const json = loader(dirname, dig)
    return json?.[key]
  }

  const getLexicalEntry = (id: string) => getItem<LexicalEntry>("lex", id)
  const getSense = (id: string) => getItem<Sense>("sense", id)
  const getSynset = (id: string) => getItem<Synset>("syn", id)
  const getLemma = (lemma: string) => getItem<Lemma>("lemma", lemma)
  const getSenseIndex = (id: string) => getItem<SenseIndex[]>("senseidx", id)
  const getSynsetIndex = (synsetId: string) => getItem<SynsetIndex>("synidx", synsetId)
  const getSyntacticBehavior = (senseId: string) => getItem<Behavior>("behavier", senseId)

  const getRandomWord = () => {
    const dig = `${(Math.floor(Math.random() * 16)).toString(16)}${(Math.floor(Math.random() * 16)).toString(16)}`
    const json = loader("lemma", dig)
    const words = Object.keys(json)
    const rand = Math.floor(Math.random() * words.length)
    return words[rand]
  }

  const getFileIndexes = () => {
    return Array(256).fill(0).map((m, i) => {
      return i.toString(16).padStart(2, "0")
    })
  }

  const getFileWords = (index: string) => {
    const json = loader("lemma", index)
    const words = Object.keys(json)
    return words
  }
  return {
    getLexicalEntry,
    getSense,
    getSynset,
    getLemma,
    getSenseIndex,
    getSynsetIndex,
    getFileIndexes,
    getRandomWord,
    getSyntacticBehavior,
    getFileWords
  }
}
