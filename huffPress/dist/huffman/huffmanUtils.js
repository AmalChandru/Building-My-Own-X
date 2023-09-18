"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = exports.calculateLetterFrequencies = void 0;
function calculateLetterFrequencies(text) {
    const frequencyMap = new Map();
    for (const char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const count = frequencyMap.get(char) || 0;
            frequencyMap.set(char, count + 1);
        }
    }
    return frequencyMap;
}
exports.calculateLetterFrequencies = calculateLetterFrequencies;
class PriorityQueue {
    queue = [];
    enqueue(node) {
        this.queue.push(node);
        this.queue.sort((a, b) => a.frequency - b.frequency);
    }
    dequeue() {
        const dequeuedNode = this.queue.shift();
        return dequeuedNode !== undefined ? dequeuedNode : null;
    }
    isEmpty() {
        return this.queue.length == 0;
    }
    size() {
        return this.queue.length;
    }
}
exports.PriorityQueue = PriorityQueue;
