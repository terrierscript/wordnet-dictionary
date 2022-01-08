import fs from "fs"
import { xmlToJson } from "../generator/xmltojson"
import { generate } from "../generator/generate"

const execute = () => {
  const file = fs.readFileSync("./tmp/source.xml")
  const data = xmlToJson(file.toString("utf-8"))
  generate(data)
}

execute()
