export interface Sense {
    id:             string;
    synset:         string;
    senseRelation?: SenseRelation[];
    adjposition?:   string;
    subcat?:        string;
}

export interface SenseRelation {
    relType: RelType;
    target:  string;
}

export enum RelType {
    Also = "also",
    Antonym = "antonym",
    Derivation = "derivation",
    Pertainym = "pertainym",
}
