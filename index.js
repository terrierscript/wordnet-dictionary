const fs = require("fs")
const md5 = require("md5")
const path = require("path")
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
  getRandomWord: () => {
    const dig = `${(Math.floor(Math.random() * 16) ).toString(16)}${(Math.floor(Math.random() * 16) ).toString(16)}`
    const json = getFile("index",dig)
    const words = Object.keys(json)
    const rand = Math.floor(Math.random() * words.length)
    return words[rand]
  }
}