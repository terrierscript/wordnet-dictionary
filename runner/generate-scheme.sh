yarn quicktype dic/lex/00.json --lang ts --just-types --top-level=LexicalEntry -o src/types/LexicalEntry.d.ts
yarn quicktype dic/lemma/00.json --lang ts --just-types --top-level=Lemma -o src/types/Lemma.d.ts

yarn quicktype dic/behavior/00.json --lang ts --just-types --top-level=Behavior -o src/types/Behavior.d.ts
yarn quicktype dic/sense/00.json --lang ts --just-types --top-level=Sense -o src/types/Sense.d.ts
yarn quicktype dic/senseidx/00.json --lang ts --just-types --top-level=SenseIndex -o types/SenseIndex.d.ts
yarn quicktype dic/syn/00.json --lang ts --just-types --top-level=Synset -o src/types/Synset.d.ts
yarn quicktype dic/synidx/00.json --lang ts --just-types --top-level=SynsetIndex -o types/SynsetIndex.d.ts