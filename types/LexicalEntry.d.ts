export interface LexicalEntry {
    id:    string;
    lemma: Lemma;
    sense: string[];
    form?: Form[];
}

export interface Form {
    writtenForm: string;
}

export interface Lemma {
    writtenForm:    string;
    partOfSpeech:   PartOfSpeech;
    Pronunciation?: Array<PronunciationClass | string> | PronunciationClass | string;
}

export interface PronunciationClass {
    "#text": string;
    variety: Variety;
}

export enum Variety {
    GB = "GB",
    Nz = "NZ",
    Us = "US",
}

export enum PartOfSpeech {
    A = "a",
    N = "n",
    R = "r",
    S = "s",
    V = "v",
}
