const fs = require("fs")
const path = require("path")
const md5 = require("md5")

const wordToDigest = (l) => {
  return md5(l).slice(0, 2)
}

const getFile = (dirname, dig) => {
  // const filepath = path.join(__dirname, "dic", type, `${dig}.json`)
  return require(`./dic/${dirname}/${dig}.json`)
  // return JSON.parse(fs.readFileSync(filepath).toString())
  
}

const getItem = (dirname, key) => {
  const dig = wordToDigest(key)
  const json = getFile(dirname, dig)
  return json[key]
}
module.exports = {
  getLexicalEntry : (id) => getItem("lex", id),
  getSense : (id) => getItem("sense", id),
  getSynset : (id) => getItem("syn", id),
  getLemma : (lemma) => getItem("lemma", lemma),
  getSenseIndex : (id) => getItem("senseidx", id),
  getSynsetIndex : (synsetId) => getItem("synidx", synsetId),
  getSyntacticBehaviour: (senseId) => getItem("behavier", senseId),
  getRandomWord : () => {
    const dig = `${(Math.floor(Math.random() * 16) ).toString(16)}${(Math.floor(Math.random() * 16) ).toString(16)}`
    const json = getFile("lemma",dig)
    const words = Object.keys(json)
    const rand = Math.floor(Math.random() * words.length)
    return words[rand]
  }
}