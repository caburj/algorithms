export default class Stack<T> implements Iterable<T> {
  private array: T[] = [];
  push(...items: T[]) {
    this.array.push(...items);
  }
  pop(): T | undefined {
    return this.array.pop();
  }
  size(): number {
    return this.array.length;
  }
  [Symbol.iterator](): Iterator<T> {
    let index = this.array.length - 1;
    return {
      next: (): IteratorResult<T> => {
        return index >= 0
          ? { done: false, value: this.array[index--] }
          : { done: true, value: undefined };
      },
    };
  }
}
