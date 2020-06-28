enum Color {
  Black = 0,
  Red = 1,
}

class Node<K, V> {
  key: K;
  value: V;
  left?: Node<K, V>;
  right?: Node<K, V>;
  size: number = 1;
  color: Color;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.color = Color.Red;
  }
}

/**
 * A data structure for a Symbol Table that supports logarithmic
 * associative array operations and also ordered operations such as
 * getting a min/max key. This has fatter API than a Symbol Table
 * data structure represented by Hash tables such as Map in javascript
 * or dict in python.
 *
 * TODO
 * 1. delete
 * 2. iterator
 * 3. ordered operations
 */
export default class RedBlackBST<K, V> {
  private root?: Node<K, V>;
  put(key: K, value: V) {
    this.root = this._put(this.root, key, value);
    if (this.root) {
      this.root.color = Color.Black;
    }
  }
  get(key: K): V | undefined {
    return this._get(this.root, key);
  }
  size(): number {
    return this._size(this.root);
  }
  private _get(node: Node<K, V> | undefined, key: K): V | undefined {
    if (!node) return;
    if (key < node.key) return this._get(node.left, key);
    else if (key > node.key) return this._get(node.right, key);
    else return node.value;
  }
  /**
   * Helper function in inserting a node with `key` and `value` to this tree.
   * This is very much similar to the `_get` method as they almost do the same
   * thing. However with `_put`, we search for the location-to-be then create
   * a new node on it. When `_put` arrives at a node that is empty (the
   * location-to-be of the new node, which is the left or right node of the
   * previous node), it returns the new node that represents the key-value pair,
   * then it is assigned to that originally empty node.
   */
  private _put(
    node: Node<K, V> | undefined,
    key: K,
    value: V,
  ): Node<K, V> | undefined {
    if (!node) return new Node(key, value);
    if (key < node.key) node.left = this._put(node.left, key, value);
    else if (key > node.key) node.right = this._put(node.right, key, value);
    else node.value = value;
    // Red black tree operations for optimization. The code is self-explanatory.
    if ((!this.isRed(node.left) && this.isRed(node.right))) {
      node = this.rotateLeft(node);
    }
    if (node && (this.isRed(node.left) && this.isRed(node.left?.left))) {
      node = this.rotateRight(node);
    }
    if (node && (this.isRed(node.left) && this.isRed(node.right))) {
      this.flipColor(node);
    }
    // This isn't just simple incrementation, the size is actually recomputed
    // for every insert. E.g. if the key already exists, then no new node
    // is created, thus, 'left' and 'right' sizes didn't actually change,
    // so the size of the node will remain the same, however, it was still
    // recalculated.
    if (node) {
      node.size = 1 + this._size(node.left) + this._size(node.right);
    }
    return node;
  }
  private _size(node?: Node<K, V>): number {
    return node ? node.size : 0;
  }
  /**
   * To maintain the invariant of the left-leaning red-black tree - that
   * there should be no red link to the right node, we perform a left rotation.
   */
  private rotateLeft(node: Node<K, V>): Node<K, V> | undefined {
    let right = node.right;
    if (right) {
      node.right = right.left;
      right.left = node;
      right.color = node.color;
      right.size = node.size;
    }
    node.color = Color.Red;
    node.size = 1 + this._size(node.left) + this._size(node.right);
    return right;
  }
  /**
   * Right rotation is an intermediate step to maintain an invariant
   * of a left-leaning red-black tree: there should be no consecutive
   * red links.
   */
  private rotateRight(node: Node<K, V>): Node<K, V> | undefined {
    let left = node.left;
    if (left) {
      node.left = left.right;
      left.right = node;
      left.color = node.color;
      left.size = node.size;
    }
    node.color = Color.Red;
    node.size = 1 + this._size(node.left) + this._size(node.right);
    return left;
  }
  /**
   * After right rotation, left and right links of the node are both red,
   * which means that the node represents a temporary 4-node which needs
   * to be splitted. Flipping colors performs this split.
   */
  private flipColor(node: Node<K, V>) {
    node.color = Color.Red;
    if (node.left) node.left.color = Color.Black;
    if (node.right) node.right.color = Color.Black;
  }
  private isRed(node: Node<K, V> | undefined): boolean {
    return node ? node.color === Color.Red : false;
  }
}
