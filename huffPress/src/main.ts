import * as fs from 'fs';
import { HuffmanNode, buildHuffmanCodes, buildHuffmanTree } from './huffman/huffman';
import { PriorityQueue, calculateLetterFrequencies } from './huffman/huffmanUtils';
import { encodeText } from './huffman/huffmanEncoder';
import { decodeText } from './huffman/huffmanDecoder';

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

  const frequencyMap = calculateLetterFrequencies(data);

  const priorityQueue = new PriorityQueue();
  for (const [letter, frequency] of frequencyMap){
    const node = new HuffmanNode(letter, frequency);
    priorityQueue.enqueue(node);
  }
  
  const huffmanTreeNode = buildHuffmanTree(priorityQueue);
  if (huffmanTreeNode) {
    const huffmanCodes: Map<string, string> = buildHuffmanCodes(huffmanTreeNode);

    // Encode the text using Huffman codes
    const encodedText = encodeText(data, huffmanCodes);
    console.log('Encoded Text:', encodedText);

    // Decode
    const decodedText = decodeText(encodedText, huffmanTreeNode);
    //console.log('Decoded Text:', decodedText);
  }
});
