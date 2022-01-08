export interface Synset {
  id: string
  ili: string
  members: string
  partOfSpeech: string
  "dc:subject": string
  synsetRelation?: SynsetRelation[]
  definition: string[]
  example?: Array<ExampleClass | string>
  iliDefinition?: string
  "dc:source"?: string
}


export interface ExampleClass {
  "#text": string
  "dc:source": string
}


export interface SynsetRelation {
  relType: string
  target: string
}
