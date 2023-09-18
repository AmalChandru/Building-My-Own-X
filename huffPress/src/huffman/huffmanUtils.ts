import { HuffmanNode } from "./huffman";

function calculateLetterFrequencies(text: string): Map<string, number> {
  const frequencyMap = new Map<string, number>();

  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const count = frequencyMap.get(char) || 0;
      frequencyMap.set(char, count + 1);
    }
  }

  return frequencyMap;
}

class PriorityQueue {
  private queue: HuffmanNode[] = [];

  enqueue(node: HuffmanNode){
    this.queue.push(node);
    this.queue.sort((a,b) => a.frequency - b.frequency);
  }

  dequeue(): HuffmanNode | null{
    const dequeuedNode = this.queue.shift();
    return dequeuedNode !== undefined ? dequeuedNode : null;
  }

  isEmpty(): boolean{
    return this.queue.length == 0;
  }

  size(): number{
    return this.queue.length;
  }
}

export {calculateLetterFrequencies, PriorityQueue}