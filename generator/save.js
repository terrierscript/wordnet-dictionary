const fs = require("fs")
const md5 = require("md5")

const wordToDigest = (l) => {
  return md5(l).slice(0, 2)
}

const itemsToDigests = (obj) => {
  const digests = new Map()
  const ent = Object.entries(obj)
  ent.map(([key, value], i) => {
    const dig = wordToDigest(key)
    digests.set(dig, digests.get(dig) ?? new Map())
    digests.get(dig).set(key, value)
  })
  return Object.fromEntries(
    [...digests.entries()].map(([k, v]) => {
      return [k, Object.fromEntries(v)]
    })
  )
}

const jsonCompactStringify = (obj) => {
  if (Array.isArray(obj)) {
    throw new Error("obj is array")
  }
  const rows = Object.entries(obj)
    .map(([k, v]) => `  "${k}" : ${JSON.stringify(v)}`)
    .join(",\n")
  return [`{`,rows,'}']
  .join("\n")
}

const saveDigests = (dir, digests) => {
  fs.mkdirSync(dir, { recursive: true })
  Object.entries(digests).map(([dig, obj]) => {
    const item = JSON.stringify(obj, null, 2)
    // const item = jsonCompactStringify(obj)
    fs.writeFileSync(
      `${dir}/${dig}.json`,item
    )
  })
}

const objectOrMapToObject = (item) => {
  const itemEntries = typeof item.entries === "function"
    ? item.entries()
    : Object.entries(item)
  return Object.fromEntries(itemEntries)
}

const saveDigestObj = (obj, dir) => {
  const digs = itemsToDigests(objectOrMapToObject(obj))
  // console.log(Object.values(digs).map(d => d.length))
  saveDigests(dir, digs)
}

module.exports = { saveDigestObj }