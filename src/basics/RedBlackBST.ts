class Node<K, V> {
  key: K;
  value: V;
  left?: Node<K, V>;
  right?: Node<K, V>;
  size: number = 1;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class RedBlackBST<K, V>{
  private root?: Node<K, V>;
  put(key: K, value: V) {
    this.root = this._put(this.root, key, value);
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
  private _put(node: Node<K, V> | undefined, key: K, value: V): Node<K, V> {
    if (!node) return new Node(key, value);
    if (key < node.key) node.left = this._put(node.left, key, value);
    else if (key > node.key) node.right = this._put(node.right, key, value);
    else node.value = value;
    // This isn't just simple incrementation, the size is actually recomputed
    // for every insert. E.g. if the key already exists, then no new node
    // is created, thus, 'left' and 'right' sizes didn't actually change,
    // so the size of the node will remain the same, however, it was still
    // recalculated.
    node.size = 1 + this._size(node.left) + this._size(node.right);
    return node;
  }
  private _size(node?: Node<K, V>): number {
    return node ? node.size : 0;
  }
}

if (import.meta.main) {
  const bst = new RedBlackBST<number, number>();
  function put(key: number, value?: number) {
    value = value ? value : key;
    bst.put(key, value);
  }
  function get(key: number) {
    return bst.get(key);
  }
  put(5)
  put(2)
  put(8)
  put(4, 1000)
  put(1)
  put(6)
  put(7)
  put(3)
  console.log(bst.size());
  console.log(get(4));
}
