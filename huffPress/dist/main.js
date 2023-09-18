"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const huffman_1 = require("./huffman/huffman");
const huffmanUtils_1 = require("./huffman/huffmanUtils");
const huffmanEncoder_1 = require("./huffman/huffmanEncoder");
const huffmanDecoder_1 = require("./huffman/huffmanDecoder");
const fileName = process.argv[2];
if (!fileName) {
    console.error('Please provide a file name as a command-line argument.');
    process.exit(1);
}
fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }
    const frequencyMap = (0, huffmanUtils_1.calculateLetterFrequencies)(data);
    const priorityQueue = new huffmanUtils_1.PriorityQueue();
    for (const [letter, frequency] of frequencyMap) {
        const node = new huffman_1.HuffmanNode(letter, frequency);
        priorityQueue.enqueue(node);
    }
    const huffmanTreeNode = (0, huffman_1.buildHuffmanTree)(priorityQueue);
    if (huffmanTreeNode) {
        const huffmanCodes = (0, huffman_1.buildHuffmanCodes)(huffmanTreeNode);
        // Encode the text using Huffman codes
        const encodedText = (0, huffmanEncoder_1.encodeText)(data, huffmanCodes);
        console.log('Encoded Text:', encodedText);
        // Decode
        const decodedText = (0, huffmanDecoder_1.decodeText)(encodedText, huffmanTreeNode);
        //console.log('Decoded Text:', decodedText);
    }
});
