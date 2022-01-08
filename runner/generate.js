const fs = require("fs")
const xmlToJson = require("../generator/xmltojson")
const generate = require("../generator/generate")

const execute = () => {
  const file = fs.readFileSync("./tmp/source.xml")
  const data = xmlToJson(file.toString("utf-8"))
  generate(data)
}

execute()
