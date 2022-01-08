const parser = require("fast-xml-parser")
const fs = require("fs")
const path = require("path")
const fileName = "english-wordnet-2020"
const file = path.join(__dirname, `./source/${fileName}.xml`)
const data = fs.readFileSync(file).toString()

const obj = parser.parse(data, {
  // attrNodeName: "attributes",
  // arrayMode: "strict",
  ignoreAttributes: false,
  attributeNamePrefix: "",
})

const output = path.join(__dirname, `./source/${fileName}.json`)

fs.writeFileSync(output, JSON.stringify(obj))
