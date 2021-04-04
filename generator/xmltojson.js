const parser = require('fast-xml-parser');
const fs = require("fs")
const path = require("path")
const file = path.join(__dirname,"./source/english-wordnet-2020.xml")
const data = fs.readFileSync(file).toString()

const obj = parser.parse(data, {
  // attrNodeName: "attributes",
  // arrayMode: "strict",
  ignoreAttributes: false,
  attributeNamePrefix: "",
})

const output = path.join(__dirname,"./source/english-wordnet-2020.json")

fs.writeFileSync(output,JSON.stringify(obj))