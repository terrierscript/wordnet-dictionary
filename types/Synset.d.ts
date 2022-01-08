export interface Synset {
    id:              string;
    ili:             string;
    members:         string;
    partOfSpeech:    PartOfSpeech;
    "dc:subject":    string;
    synsetRelation?: SynsetRelation[];
    definition:      string[];
    example?:        Array<ExampleClass | string>;
    iliDefinition?:  string;
    "dc:source"?:    DcSource;
}

export enum DcSource {
    ColloquialWordNet = "Colloquial WordNet",
    PlWordNet40 = "plWordNet 4.0",
}

export interface ExampleClass {
    "#text":     string;
    "dc:source": string;
}

export enum PartOfSpeech {
    A = "a",
    N = "n",
    R = "r",
    S = "s",
    V = "v",
}

export interface SynsetRelation {
    relType: RelType;
    target:  string;
}

export enum RelType {
    Also = "also",
    Attribute = "attribute",
    DomainRegion = "domain_region",
    DomainTopic = "domain_topic",
    Entails = "entails",
    Exemplifies = "exemplifies",
    HasDomainTopic = "has_domain_topic",
    HoloMember = "holo_member",
    HoloPart = "holo_part",
    HoloSubstance = "holo_substance",
    Hypernym = "hypernym",
    Hyponym = "hyponym",
    InstanceHypernym = "instance_hypernym",
    InstanceHyponym = "instance_hyponym",
    IsCausedBy = "is_caused_by",
    IsEntailedBy = "is_entailed_by",
    MeroMember = "mero_member",
    MeroPart = "mero_part",
    MeroSubstance = "mero_substance",
    Similar = "similar",
}
