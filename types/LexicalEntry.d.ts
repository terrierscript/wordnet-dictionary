export interface LexicalEntry {
  id: string
  lemma: Lemma
  sense: string[]
  form?: Form[]
}

export interface Form {
  writtenForm: string
}

export interface Lemma {
  writtenForm: string
  partOfSpeech: string
  Pronunciation?: Array<PronunciationClass | string> | PronunciationClass | string
}

export interface PronunciationClass {
  "#text": string
  variety: string
}
