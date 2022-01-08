import md5 from "md5"
import { LexicalEntry } from "./scheme"

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
export const getSense = (id: string) => getItem("sense", id)
export const getSynset = (id: string) => getItem("syn", id)
export const getLemma = (lemma: string) => getItem("lemma", lemma)
export const getSenseIndex = (id: string) => getItem("senseidx", id)
export const getSynsetIndex = (synsetId: string) => getItem("synidx", synsetId)
export const getSyntacticBehaviour = (senseId: string) => getItem("behavier", senseId)
export const getRandomWord = () => {
  const dig = `${(Math.floor(Math.random() * 16)).toString(16)}${(Math.floor(Math.random() * 16)).toString(16)}`
  const json = getFile("lemma", dig)
  const words = Object.keys(json)
  const rand = Math.floor(Math.random() * words.length)
  return words[rand]
}
