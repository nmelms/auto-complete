const input = document.querySelector("#input");
const text = document.querySelector("#display-text");
const insertButton = document.querySelector("#insert-btn");
const searchButton = document.querySelector("#search-btn");

input.addEventListener("input", (e) => {
  text.innerText = e.target.value;
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
    return true;
  }
}

let trie = new Trie();
