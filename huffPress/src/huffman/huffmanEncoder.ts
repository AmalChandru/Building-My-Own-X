function encodeText(text: string, huffmanCodes: Map<string, string>): string {
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
  
  export { encodeText };
  