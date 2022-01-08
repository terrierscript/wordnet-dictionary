
export type LexicalEntry = {
  "id": string
  "lemma": {
    "writtenForm": string,
    "partOfSpeech": string
    "Pronunciation": {
      "#text": string[]
    } | undefined
  },
  "sense": string[]
}
