yarn quicktype dic/lex/00.json --lang ts --just-types --top-level=LexicalEntry -o src/types/LexicalEntry.ts
yarn quicktype dic/lemma/00.json --lang ts --just-types --top-level=Lemma -o src/types/Lemma.ts

yarn quicktype dic/behavior/00.json --lang ts --just-types --top-level=Behavior -o src/types/Behavior.ts
yarn quicktype dic/sense/00.json --lang ts --just-types --top-level=Sense -o src/types/Sense.ts
yarn quicktype dic/senseidx/00.json --lang ts --just-types --top-level=SenseIndex -o types/SenseIndex.ts
yarn quicktype dic/syn/00.json --lang ts --just-types --top-level=Synset -o src/types/Synset.ts
yarn quicktype dic/synidx/00.json --lang ts --just-types --top-level=SynsetIndex -o types/SynsetIndex.ts