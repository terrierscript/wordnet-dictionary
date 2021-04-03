
const digs = Array.from(Array(16), (_, v1) => Array.from(Array(16), (_, v2) => `${v1.toString(16)}${v2.toString(16)}`)).flat(2)

const count = (dir) => {
  const dd = digs.map(dig => {
    const d = require(`../dic/${dir}/${dig}.json`)
    return Object.keys(d).length
  })
  return dd.reduce((cur,acc) => cur + acc, 0)
}
const check = () => {
  console.log("index", count("index"))
  console.log("lex", count("lex"))
  console.log("data", count("data"))
  console.log("syn", count("syn"))
}
check()