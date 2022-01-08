const parser = require("fast-xml-parser")
// const fs = require("fs")
// const path = require("path")
// const fileName = "english-wordnet-2021"
// const file = path.join(__dirname, `./source/${fileName}.xml`)
// const data = fs.readFileSync(file).toString()

export const xmlToJson = (xml) => {
  const obj = parser.parse(xml, {
    // attrNodeName: "attributes",
    // arrayMode: "strict",
    ignoreAttributes: false,
    attributeNamePrefix: "",
  })
  return obj
}
// const output = path.join(__dirname, `./source/${fileName}.json`)

// fs.writeFileSync(output, JSON.stringify(obj))
