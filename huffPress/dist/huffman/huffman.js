"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHuffmanCodes = exports.buildHuffmanTree = exports.HuffmanNode = void 0;
class HuffmanNode {
    letter;
    frequency;
    left;
    right;
    constructor(letter, frequency) {
        this.letter = letter;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}
exports.HuffmanNode = HuffmanNode;
function buildHuffmanTree(priorityQueue) {
    while (!priorityQueue.isEmpty()) {
        if (priorityQueue.size() === 1) {
            return priorityQueue.dequeue();
        }
        const leftNode = priorityQueue.dequeue();
        const rightNode = priorityQueue.dequeue();
        if (leftNode && rightNode) {
            // Create a new node with an empty letter and combined frequency
            const newNode = new HuffmanNode('', leftNode.frequency + rightNode.frequency);
            newNode.left = leftNode;
            newNode.right = rightNode;
            priorityQueue.enqueue(newNode);
        }
    }
    return null;
}
exports.buildHuffmanTree = buildHuffmanTree;
function generateHuffmanCodes(root, currentCode, codesMap) {
    if (root === null) {
        return;
    }
    // If the node is a leaf node (i.e., it has a character), add it to the codesMap
    if (root.letter !== '') {
        codesMap.set(root.letter, currentCode);
    }
    // Traverse the left and right subtrees, appending '0' for left and '1' for right
    if (root.left && root.right) {
        generateHuffmanCodes(root.left, currentCode + '0', codesMap);
        generateHuffmanCodes(root.right, currentCode + '1', codesMap);
    }
}
function buildHuffmanCodes(root) {
    const codesMap = new Map();
    generateHuffmanCodes(root, '', codesMap);
    return codesMap;
}
exports.buildHuffmanCodes = buildHuffmanCodes;
