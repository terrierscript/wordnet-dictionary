const fs = require("fs")
const md5 = require("md5")

const wordToDigest = (l) => {
  return md5(l).slice(0, 2)
}

module.exports = {
  /**
   * 
   * @param {string} word 
   * @returns 
   */
  searchIndex : (word) => {
    const dig = wordToDigest(word)
    const a = JSON.parse(fs.readFileSync(`dic/index/${dig}.json`).toString())
    
    return a[word]
  },
  /**
   * 
   * @param {string|number} offset
   * @returns 
   */
  searchData : (offset) => {
    const dig = wordToDigest(offset.toString())
    const a = JSON.parse(fs.readFileSync(`dic/data/${dig}.json`).toString())
    return a[offset]
  }
}