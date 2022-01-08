yarn quicktype dic/lex/00.json --lang ts --just-types --top-level=LexicalEntry -o types/LexicalEntry.d.ts
yarn quicktype dic/lemma/00.json --lang ts --just-types --top-level=Lemma -o types/Lemma.d.ts

yarn quicktype dic/behavior/00.json --lang ts --just-types --top-level=Behavior -o types/Behavior.d.ts
yarn quicktype dic/sense/00.json --lang ts --just-types --top-level=Sense -o types/Sense.d.ts
yarn quicktype dic/senseidx/00.json --lang ts --just-types --top-level=SenseIndex -o types/SenseIndex.d.ts
yarn quicktype dic/syn/00.json --lang ts --just-types --top-level=Synset -o types/Synset.d.ts
yarn quicktype dic/synidx/00.json --lang ts --just-types --top-level=SynsetIndex -o types/SynsetIndex.d.ts