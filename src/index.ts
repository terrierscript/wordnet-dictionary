import md5 from "md5"
import { Lemma } from "./types/Lemma"
import { LexicalEntry } from "./types/LexicalEntry"
import { Sense } from "./types/Sense"
import { SenseIndex } from "./types/SenseIndex"
import { Synset } from "./types/Synset"
import { SynsetIndex } from "./types/SynsetIndex"

const wordToDigest = (l: string) => {
  return md5(l).slice(0, 2)
}

const getFile = (dirname: string, dig: string) => {
  return require(`./dic/${dirname}/${dig}.json`)
}

const getItem = <T>(dirname: string, key: string): T | undefined => {
  const dig = wordToDigest(key)
  const json = getFile(dirname, dig)
  return json[key]
}


export const getLexicalEntry = (id: string) => getItem<LexicalEntry>("lex", id)
export const getSense = (id: string) => getItem<Sense>("sense", id)
export const getSynset = (id: string) => getItem<Synset>("syn", id)
export const getLemma = (lemma: string) => getItem<Lemma>("lemma", lemma)
export const getSenseIndex = (id: string) => getItem<SenseIndex>("senseidx", id)
export const getSynsetIndex = (synsetId: string) => getItem<SynsetIndex>("synidx", synsetId)
export const getSyntacticBehaviour = (senseId: string) => getItem<Behavior>("behavier", senseId)
export const getRandomWord = () => {
  const dig = `${(Math.floor(Math.random() * 16)).toString(16)}${(Math.floor(Math.random() * 16)).toString(16)}`
  const json = getFile("lemma", dig)
  const words = Object.keys(json)
  const rand = Math.floor(Math.random() * words.length)
  return words[rand]
}
