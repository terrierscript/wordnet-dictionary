export interface SenseIndex {
    relType: RelType;
    synset:  string;
    sense:   string;
}

export enum RelType {
    Also = "also",
    Antonym = "antonym",
    Derivation = "derivation",
    Pertainym = "pertainym",
}
