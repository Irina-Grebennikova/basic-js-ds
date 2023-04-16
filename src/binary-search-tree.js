const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    let newNode = new Node(data);
    if (this.treeRoot === null) {
      this.treeRoot = newNode;
    } else {
      addNode(this.treeRoot, newNode);
    }

    function addNode(node, newNode) {
      if (node.data < newNode.data) {
        if (node.right === null) node.right = newNode;
        else {
          addNode(node.right, newNode);
        }
      } else {
        if (node.left === null) node.left = newNode;
        else {
          addNode(node.left, newNode);
        }
      }
    }
  }

  has(data) {
    let currentNode = this.treeRoot;
    while (currentNode) {
      if (currentNode.data === data) return true;
      else if (currentNode.data > data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }
    return false;
  }

  find(data) {
    let currentNode = this.treeRoot;
    while (currentNode) {
      if (currentNode.data === data) return currentNode;
      else if (currentNode.data > data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }
    return null;
  }

  remove(data) {
    this.treeRoot = removeNode(this.treeRoot, data);
    function removeNode(node, data) {
      if (!node) return null;
      if (data === node.data) {

        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let minFromRight = node.right;
        while (minFromRight.left !== null) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
  }

  min() {
    if (this.treeRoot === null) return null;
    let currentNode = this.treeRoot;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (this.treeRoot === null) return null;
    let currentNode = this.treeRoot;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};