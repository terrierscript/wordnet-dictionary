const lexSample = "dic/lemma/00.json"

const lex = () => {
  Object.values(lexSample).map((l) => {
    console.log(l)
  })
}
export const start = () => {
  lex()
}
start()
