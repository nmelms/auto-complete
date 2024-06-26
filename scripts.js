const input = document.querySelector("#input");
const text = document.querySelector("#display-text");
const insertButton = document.querySelector("#insert-btn");
const searchButton = document.querySelector("#search-btn");

input.addEventListener("input", (e) => {
  let words = trie.autocomplete(input.value);
  console.log(words, "in inpt");
});
insertButton.addEventListener("click", () => {
  trie.insert(input.value);
});
searchButton.addEventListener("click", () => {
  trie.search(input.value);
});

class TrieNode {
  constructor() {
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let currentNode = this.root;
    for (let char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
    }
    currentNode.children["*"] = new TrieNode();
  }

  search(word) {
    console.log("search ran", word);
    let currentNode = this.root;
    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        console.log("false");
        return false;
      }
    }
    console.log("true ");
    return currentNode;
  }

  collectAllNodes(root, word = "", words = []) {
    for (let char in root.children) {
      let newWord = word + char;
      if (char === "*") {
        words.push(newWord);
      } else {
        this.collectAllNodes(root.children[char], newWord, words);
      }
    }
    return words;
  }

  autocomplete(prefix) {
    console.log(prefix);
    let currentNode = this.search(prefix);

    if (!currentNode) {
      console.log("no nodes");
      return false;
    }
    console.log(this.collectAllNodes(currentNode));
    return this.collectAllNodes(currentNode);
  }
}

let trie = new Trie();
