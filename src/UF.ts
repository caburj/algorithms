/**
 * Implementation of weighted union-find with path compression.
 */
export default class UF {
  private parent: number[] = [];
  private size: number[] = [];
  private _count: number = 0;
  constructor(arg: string | number) {
    if (typeof arg === "string") {
      const [nStr, ...connections] = Deno.readTextFileSync(
        arg,
      ).trim().split("\n");
      const nElements = parseInt(nStr);
      this.parent = Array.from(Array(nElements).keys());
      this.size = Array.from(Array(nElements).fill(1));
      this._count = nElements;
      for (let pair of connections) {
        const [p, q] = pair.trim().split(/\s+/);
        this.union(parseInt(p), parseInt(q));
      }
    } else if (typeof arg === "number") {
      this._count = arg;
      this.parent = Array.from(Array(arg).keys());
      this.size = Array.from(Array(arg).fill(1));
    }
  }
  /**
   * Add connection between p and q.
   */
  union(p: number, q: number): void {
    const proot = this.find(p);
    const qroot = this.find(q);
    if (proot === qroot) return;
    // assign the smaller tree to the larger tree.
    if (this.size[proot] < this.size[qroot]) {
      this.parent[proot] = qroot;
      this.size[qroot] += this.size[proot];
    } else {
      this.parent[qroot] = proot;
      this.size[proot] += this.size[qroot];
    }
    this._count--;
  }
  /**
   * Component identifier of p.
   * Implemented to perform path compression.
   */
  find(p: number): number {
    // Keep track of ancestors to enable path compression.
    const ancestors = [];
    while (p !== this.parent[p]) {
      p = this.parent[p];
      ancestors.push(p);
    }
    // At this point, current value of p is the root of original p value.
    // To do path compression, assign each ancestor to have parent
    // equivalent to the computed root.
    for (let ancestor of ancestors) {
      this.parent[ancestor] = p;
    }
    return p;
  }
  /**
   * Check if p and q are in the same component.
   */
  connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }
  /**
   * Number of components
   */
  count(): number {
    return this._count;
  }
}
