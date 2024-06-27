const input = document.querySelector("#input");
const text = document.querySelector("#display-text");
const insertButton = document.querySelector("#insert-btn");

input.addEventListener("input", (e) => {
  text.innerHTML = "";
  let words = trie.autocomplete(input.value);
  if (input.value === "") {
    words = [];
  }

  let list = document.createElement("ul");

  for (let word of words) {
    let item = document.createElement("li");
    item.innerText = input.value + word;
    list.appendChild(item);
  }
  text.appendChild(list);
});

insertButton.addEventListener("click", () => {
  trie.insert(input.value);
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
    let currentNode = this.root;
    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        return false;
      }
    }
    return currentNode;
  }

  collectAllNodes(root, word = "", words = []) {
    for (let char in root.children) {
      if (char === "*") {
        words.push(word);
      } else {
        let newWord = word + char;
        this.collectAllNodes(root.children[char], newWord, words);
      }
    }
    return words;
  }

  autocomplete(prefix) {
    let currentNode = this.search(prefix);

    if (!currentNode) {
      return false;
    }
    return this.collectAllNodes(currentNode);
  }
}

let trie = new Trie();
