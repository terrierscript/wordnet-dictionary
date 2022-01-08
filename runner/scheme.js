const lex = () => {
  const lexSample = require("../dic/lex/00.json")
  Object.values(lexSample).map((l) => {
    console.log(l, Object.keys(l))
  })
}
const lemma = () => {
  // const lexSample = require("../dic/lemma/00.json")
  // Object.entries(lexSample).map((l) => {
  //   console.log(l)
  // })
}

const start = () => {
  lex()
  lemma()
}
start()
