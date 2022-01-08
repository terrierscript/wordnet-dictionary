export interface Sense {
  id: string
  synset: string
  senseRelation?: SenseRelation[]
  adjposition?: string
  subcat?: string
}

export interface SenseRelation {
  relType: string
  target: string
}

