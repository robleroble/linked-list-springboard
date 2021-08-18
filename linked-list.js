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
    while (currentNode.next != this.tail && this.length > 1) {
      currentNode = currentNode.next;
    }

    this.tail = currentNode;
    currentNode.next = null;

    this.length = this.length - 1;
    // if popping last value, tail and head become null
    if (this.length === 0) {
      this.tail = null;
      this.head = null;
    }
    return returnVal;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) {
      throw new Error("The list is empty!");
    }

    let returnVal = this.head.val;
    this.head = this.head.next;
    this.length = this.length - 1;
    if (this.length === 0) {
      this.tail = null;
      this.head = null;
    }
    return returnVal;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let currNode = this.head;
    let currIdx = 0;

    while (currIdx != idx) {
      if (currNode.next === null) {
        throw new Error("This index does not exist");
      }
      currNode = currNode.next;
      currIdx = currIdx + 1;
    }
    return currNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let currNode = this.head;
    let currIdx = 0;

    while (currIdx != idx) {
      if (currNode.next === null) {
        throw new Error(
          "This index does not exist. You can't create a new node with this method."
        );
      }
      currNode = currNode.next;
      currIdx = currIdx + 1;
    }

    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    // if list is empty
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    }

    // if idx is 0, we have to replace this.head
    if (idx === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // otherwise, we traverse through nodes until we find the node before idx (we need to change this nodes next value)
      const idxMinusOne = idx - 1;

      let currNode = this.head;
      let currIdx = 0;

      while (currIdx != idxMinusOne) {
        // we can only insert nodes if the currentIdx exists
        if (this.length < idx) {
          throw new Error(
            "This index does not exist. You can't create a new node with this method."
          );
        }
        currNode = currNode.next;
        currIdx = currIdx + 1;
      }
      // change next Node to be the newNode
      let nodeToInsertBefore = currNode.next;
      currNode.next = newNode;
      newNode.next = nodeToInsertBefore;
      // case for when node is inserted as tail
      if (currIdx === idxMinusOne) {
        this.tail = newNode;
      }
    }
    this.length = this.length + 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // if idx does not exist, throw error
    if (idx > this.length - 1) {
      throw new Error(
        "This index does not exist, so there's nothing to remove!"
      );
    }

    // if idx is 0, we change this.head to be the current head's next node
    if (idx === 0) {
      let nodeToRemove = this.head;
      this.head = this.head.next;
      this.length = this.length - 1;
      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      }
      return nodeToRemove.val;
    }

    // traverse thru list to find node previous to node being removed
    const idxMinusOne = idx - 1;
    let currNode = this.head;
    let currIdx = 0;

    while (currIdx != idxMinusOne) {
      currNode = currNode.next;
      currIdx = currIdx + 1;
    }
    // once we find node located before node to be removed, we change the next value to be targetNode's next value...
    // if node to be removed is tail:
    if (currNode.next === this.tail) {
      let nodeToRemove = currNode.next;
      this.tail = currNode;
      currNode.next = null;
      this.length = this.length - 1;
      return nodeToRemove.val;
    } else {
      let nodeToRemove = currNode.next;
      currNode.next = nodeToRemove.next;
      this.length = this.length - 1;
      return nodeToRemove.val;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    // if linked list is empty
    if (this.length === 0) {
      return 0;
    }
    // placeholder variable to store total value of nodes
    let sum = 0;
    // placeholder variable to store count of nodes
    let count = 0;

    let currNode = this.head;
    while (currNode) {
      sum = sum + currNode.val;
      count = count + 1;
      currNode = currNode.next;
    }
    return sum / count;
  }
}

// module.exports = LinkedList;

const testList = new LinkedList([]);

testList.push(1);
testList.push(2);
testList.push(3);
testList.push(4);
testList.push(5);

module.exports = LinkedList;
