const input = document.querySelector("#input");
const text = document.querySelector("#display-text");
const insertButton = document.querySelector("#insert-btn");

input.addEventListener("input", (e) => {
  text.innerText = e.target.value;
});
insertButton.addEventListener("click", () => {
  trie.insert(input.value);
});

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
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
        currentNode = currentNode.children[char];
      }
      currentNode = currentNode.children[char];
    }

    currentNode.children["*"] = new TrieNode();
  }
}

let trie = new Trie();
