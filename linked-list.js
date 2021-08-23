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

    // if list is empty (no this.head)
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // takes current tail and sets next to be new node
      this.tail.next = newNode;
      // make newNode the new tail
      this.tail = newNode;
    }

    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    // if list is empty
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // set newNode's next to be current head
      newNode.next = this.head;
      // make newNode the new head
      this.head = newNode;
    }

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    // if list is empty, we can't pop off a node
    if (this.length === 0) {
      throw new Error("The list is empty!");
    }

    // store tail.val in a variable so we can return its val at the end of func
    let returnVal = this.tail.val;

    // store head in a var to traverse list
    let currentNode = this.head;
    // find node where this.tail is the next node
    // this node will become the new tail when we pop
    while (currentNode.next != this.tail && this.length > 1) {
      currentNode = currentNode.next;
    }

    // set new tail and set next as null
    this.tail = currentNode;
    currentNode.next = null;

    this.length--;

    // if after popping we have an empty list, nothing will remain so we set tail and head to null
    if (this.length === 0) {
      this.tail = null;
      this.head = null;
    }
    return returnVal;
  }

  /** shift(): return & remove first item. */

  shift() {
    // if list is empty, we can't remove anything
    if (this.length === 0) {
      throw new Error("The list is empty!");
    }

    // store head.tail in var to return at end of func
    let returnVal = this.head.val;

    // re-set head to be the current head's next node
    this.head = this.head.next;
    this.length--;

    // if list is empty after removing head, we set head and tail to be null
    if (this.length === 0) {
      this.tail = null;
      this.head = null;
    }
    return returnVal;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // store head in var and set idx to traverse to target idx
    let currNode = this.head;
    let currIdx = 0;

    // traverse thru list until we find currentNode with index of target idx
    while (currIdx != idx) {
      // if we get to end of list without reaching target index, index doesn't exist in list
      if (currNode.next === null) {
        throw new Error("This index does not exist");
      }
      // increment until we reach targetIdx
      currNode = currNode.next;
      currIdx = currIdx + 1;
    }
    return currNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    // store head in var and set idx to traverse to target idx
    let currNode = this.head;
    let currIdx = 0;

    // traverse thru list until we find currentNode with index of target idx
    while (currIdx != idx) {
      // if we get to end of list without reaching target index, index doesn't exist in list
      if (currNode.next === null) {
        throw new Error("This index does not exist in this list.");
      }
      // increment until we reach targetIdx
      currNode = currNode.next;
      currIdx = currIdx + 1;
    }

    // when we reach targetIdx, change node's val
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
      // we want to find node just before target node to change its next val to be newNode
      const idxMinusOne = idx - 1;

      // store currNode and currIdx to traverse thru list
      let currNode = this.head;
      let currIdx = 0;

      // traverse thru list until we find idxMinusOne
      while (currIdx != idxMinusOne) {
        // we can only insert nodes if the currentIdx exists or if we insert at end as new tail
        if (idx > this.length) {
          throw new Error(
            "This index does not exist. You can't create a new node with this method."
          );
        }
        // increment
        currNode = currNode.next;
        currIdx = currIdx + 1;
      }
      // make next of newNode be the node at the targetIdx
      let nodeToInsertBefore = currNode.next;
      // set next of node before targetIdx to be newNode
      currNode.next = newNode;
      // set next val for newNode
      newNode.next = nodeToInsertBefore;
      // case for when node is inserted as tail
      if (currIdx === idxMinusOne) {
        this.tail = newNode;
      }
    }
    this.length++;
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
      this.length--;
      // set head and tail to null if list is empty after removing node
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

module.exports = LinkedList;
