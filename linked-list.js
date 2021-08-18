/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length = this.length + 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length = this.length + 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0) {
      throw new Error("The list is empty!");
    }
    let returnVal = this.tail.val;
    let currentNode = this.head;
    // find node where this.tail is the next node
    // this node will become the new node when we pop
    while (currentNode.next != this.tail) {
      currentNode = currentNode.next;
    }

    this.tail = currentNode;
    currentNode.next = null;

    this.length = this.length - 1;
    return returnVal;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) {
      throw new Error("The list is empty!")
    }

    let returnVal = this.head.val;
    this.head = this.head.next;
    this.length = this.length - 1;
    return returnVal;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let currNode = this.head;
    let currIdx = 0;

    while (currIdx != idx) {
      if (currNode.next === null) {
        throw new Error("This index does not exist")
      }
      currNode = currNode.next;
      currIdx = currIdx +1;
    }
    return currNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let currNode = this.head;
    let currIdx = 0;

    while (currIdx != idx) {
      if (currNode.next === null) {
        throw new Error("This index does not exist. You can't create a new node with this method.")
      }
      currNode = currNode.next;
      currIdx = currIdx + 1;
    }

    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    const idxMinusOne = idx - 1;

    let currNode = this.head;
    let currIdx = 0;

    while (currIdx != idxMinusOne) {
      currNode = currNode.next;
      currIdx = currIdx + 1;
    }
    
    let nodeToInsertBefore = currNode.next;
    currNode.next = newNode;
    newNode.next = nodeToInsertBefore;
    this.length = this.length +1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {}

  /** average(): return an average of all values in the list */

  average() {}
}

// module.exports = LinkedList;

const testList = new LinkedList([]);

testList.push(1);
testList.push(2);
testList.push(3);
testList.push(4);
testList.push(5);
