const fs = require("fs")
const md5 = require("md5")
const path = require("path")
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
    const filepath = path.join(__dirname ,"dic","index", `${dig}.json`)
    const json = JSON.parse(fs.readFileSync(filepath).toString())
    
    return json[word]
  },
  /**
   * 
   * @param {string|number} offset
   * @returns 
   */
  searchData : (offset) => {
    const dig = wordToDigest(offset.toString())
    const filepath = path.join(__dirname ,"dic","data", `${dig}.json`)
    const json = JSON.parse(fs.readFileSync(filepath).toString())
    
    return json[offset]
  }
}