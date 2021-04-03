const fs = require("fs")
const path = require("path")
const md5 = require("md5")

const wordToDigest = (l) => {
  return md5(l).slice(0, 2)
}

const getFile = (type, dig) => {
  const filepath = path.join(__dirname ,"dic",type, `${dig}.json`)
  return JSON.parse(fs.readFileSync(filepath).toString())
  
}

module.exports = {
  /**
   * 
   * @param {string} word 
   * @returns 
   */
  searchIndex : (word) => {
    const dig = wordToDigest(word)
    const json = getFile("index",dig)
    return json[word]
  },
  /**
   * 
   * @param {string|number} offset
   * @returns 
   */
  searchData : (offset) => {
    const dig = wordToDigest(offset.toString())
    const json = getFile("data",dig)
    
    return json[offset]
  },
  searchLexicalEntry : (lemma) => {
    const dig = wordToDigest(lemma)
    const json = getFile("lex",dig)
    
    return json[lemma]
  },
  searchSynset : (id) => {
    const dig = wordToDigest(id)
    const json = getFile("syn",dig)
    
    return json[id]
  },
  getRandomWord: () => {
    const dig = `${(Math.floor(Math.random() * 16) ).toString(16)}${(Math.floor(Math.random() * 16) ).toString(16)}`
    const json = getFile("lex",dig)
    const words = Object.keys(json)
    const rand = Math.floor(Math.random() * words.length)
    return words[rand]
  }
}