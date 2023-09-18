"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeText = void 0;
function decodeText(encodedText, huffmanTree) {
    const ZERO = '0';
    const ONE = '1';
    let decodedText = '';
    let currentNode = huffmanTree;
    for (const bit of encodedText) {
        if (bit === ZERO) {
            currentNode = currentNode.left;
        }
        else if (bit === ONE) {
            currentNode = currentNode.right;
        }
        if (currentNode.left === null && currentNode.right === null) {
            // Found a leaf node, which represents a character
            decodedText += currentNode.letter;
            currentNode = huffmanTree; // Reset to the root for the next character
        }
    }
    return decodedText;
}
exports.decodeText = decodeText;
