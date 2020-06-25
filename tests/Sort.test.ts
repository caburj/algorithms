import { quicksort, mergesort } from "../src/basics/Sort.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const sortMethods = [mergesort, quicksort];

Deno.test("0 items", () => {
  const items: number[] = [];
  for (let sort of sortMethods) {
    const toSort = [...items];
    sort(toSort);
    assertEquals(toSort, []);
  }
});

Deno.test("1 item", () => {
  const items: number[] = [1];
  for (let sort of sortMethods) {
    const toSort = [...items];
    sort(toSort);
    assertEquals(toSort, [1]);
  }
});

Deno.test("5 items", () => {
  const items: number[] = [5, 4, 3, 2, 1];
  for (let sort of sortMethods) {
    const toSort = [...items];
    sort(toSort);
    assertEquals(toSort, [1, 2, 3, 4, 5]);
  }
});

Deno.test("8 items", () => {
  const items = [6, 3, 2, 6, 5, 1, 4, 9];
  for (let sort of sortMethods) {
    const toSort = [...items];
    sort(toSort);
    assertEquals(toSort, [1, 2, 3, 4, 5, 6, 6, 9]);
  }
});

Deno.test("17 items", () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  for (let sort of sortMethods) {
    const toSort = [...items];
    sort(toSort);
    assertEquals(toSort, [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9]);
  }
});

Deno.test("objects", () => {
  class Negate {
    val: number;
    constructor(val: number = 0) {
      this.val = val;
    }
    [Symbol.toPrimitive](hint: "number" | "string" | "default") {
      if (hint === "number") {
        return -this.val;
      } else if (hint === "string") {
        return `${-this.val}`;
      } else {
        return 0;
      }
    }
  }
  const items = [...Array.from(Array(10).keys())].map((x) => new Negate(x));
  for (let sort of sortMethods) {
    const toSort = [...items];
    sort(toSort);
    assertEquals(toSort.map((x) => x.val), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  }
});

Deno.test("mergesort stability", () => {
  type Foo = { a: number; b: number };
  const items: Foo[] = [
    { a: 1, b: 4 },
    { a: 2, b: 3 },
    { a: -1, b: 4 },
    { a: 15, b: 3 },
    { a: 0, b: 3 },
    { a: -10, b: 4 },
  ];
  const comparatorA = (x: Foo, y: Foo) => x.a < y.a;
  const comparatorB = (x: Foo, y: Foo) => x.b < y.b;
  mergesort(items, comparatorA);
  mergesort(items, comparatorB);
  assertEquals(items.map((item) => item.b), [3, 3, 3, 4, 4, 4]);
  assertEquals(items.map((item) => item.a), [0, 2, 15, -10, -1, 1]);
});

Deno.test("quicksort example", () => {
  const letters = [..."QUICKSORTEXAMPLE"];
  quicksort(letters);
  assertEquals(letters, [..."ACEEIKLMOPQRSTUX"]);
});
