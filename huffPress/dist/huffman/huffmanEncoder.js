"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeText = void 0;
function encodeText(text, huffmanCodes) {
    let encodedText = '';
    for (const char of text) {
        const code = huffmanCodes.get(char);
        if (code !== undefined) {
            encodedText += code;
        }
        // TODO - include spaces while creating huffman code
        //   else {
        //     console.error(`Character "${char}" does not have a Huffman code.`);
        //     // Handle the error as needed (e.g., throw an exception or return an error code)
        //   }
    }
    return encodedText;
}
exports.encodeText = encodeText;
