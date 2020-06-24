import { AbstractStack } from "./Stack.ts";

export default class Bag<T> extends AbstractStack<T> {
  add(...items: T[]) {
    this.data.push(...items);
  }
}
