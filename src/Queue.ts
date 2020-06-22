export default class Queue<T> implements Iterable<T> {
  private data: Record<number, T> = {};
  private N = 0;
  private current = 0;
  dequeue(): T | undefined {
    const result = this.data[this.current];
    delete this.data[this.current];
    if (result !== undefined) {
      this.current++;
      return result;
    }
  }
  enqueue(...items: T[]) {
    for (let item of items) {
      this.data[this.N++] = item;
    }
  }
  [Symbol.iterator](): Iterator<T> {
    let i = this.current;
    let end = this.N;
    return {
      next: (): IteratorResult<T> => {
        return i < end
          ? { done: false, value: this.data[i++] }
          : { done: true, value: undefined };
      },
    };
  }
  size(): number {
    return this.N - this.current;
  }
}
