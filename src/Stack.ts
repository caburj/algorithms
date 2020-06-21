export abstract class AbstractStack<T> implements Iterable<T> {
  protected data: T[] = [];
  [Symbol.iterator](): Iterator<T> {
    let index = this.data.length - 1;
    return {
      next: (): IteratorResult<T> => {
        return index >= 0
          ? { done: false, value: this.data[index--] }
          : { done: true, value: undefined };
      },
    };
  }
  size(): number {
    return this.data.length;
  }
}

export default class Stack<T> extends AbstractStack<T> {
  push(...items: T[]) {
    this.data.push(...items);
  }
  pop(): T | undefined {
    return this.data.pop();
  }
}