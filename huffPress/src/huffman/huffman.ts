import { PriorityQueue } from "./huffmanUtils";

class HuffmanNode {
    letter: string;
    frequency: number;
    left: HuffmanNode | null;
    right: HuffmanNode | null;

    constructor(letter: string, frequency: number) {
        this.letter = letter;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}

function buildHuffmanTree(priorityQueue: PriorityQueue): HuffmanNode | null {
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

function generateHuffmanCodes(root: HuffmanNode, currentCode: string, codesMap: Map<string, string>) {
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

function buildHuffmanCodes(root: HuffmanNode): Map<string, string> {
    const codesMap = new Map<string, string>();
    generateHuffmanCodes(root, '', codesMap);
    return codesMap;
}

export { HuffmanNode, buildHuffmanTree, buildHuffmanCodes };
