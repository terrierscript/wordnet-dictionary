"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomWord = exports.getSyntacticBehaviour = exports.getSynsetIndex = exports.getSenseIndex = exports.getLemma = exports.getSynset = exports.getSense = exports.getLexicalEntry = void 0;
var md5_1 = __importDefault(require("md5"));
var wordToDigest = function (l) {
    return md5_1.default(l).slice(0, 2);
};
var getFile = function (dirname, dig) {
    return require("./dic/" + dirname + "/" + dig + ".json");
};
var getItem = function (dirname, key) {
    var dig = wordToDigest(key);
    var json = getFile(dirname, dig);
    return json[key];
};
var getLexicalEntry = function (id) { return getItem("lex", id); };
exports.getLexicalEntry = getLexicalEntry;
var getSense = function (id) { return getItem("sense", id); };
exports.getSense = getSense;
var getSynset = function (id) { return getItem("syn", id); };
exports.getSynset = getSynset;
var getLemma = function (lemma) { return getItem("lemma", lemma); };
exports.getLemma = getLemma;
var getSenseIndex = function (id) { return getItem("senseidx", id); };
exports.getSenseIndex = getSenseIndex;
var getSynsetIndex = function (synsetId) { return getItem("synidx", synsetId); };
exports.getSynsetIndex = getSynsetIndex;
var getSyntacticBehaviour = function (senseId) { return getItem("behavier", senseId); };
exports.getSyntacticBehaviour = getSyntacticBehaviour;
var getRandomWord = function () {
    var dig = "" + (Math.floor(Math.random() * 16)).toString(16) + (Math.floor(Math.random() * 16)).toString(16);
    var json = getFile("lemma", dig);
    var words = Object.keys(json);
    var rand = Math.floor(Math.random() * words.length);
    return words[rand];
};
exports.getRandomWord = getRandomWord;
