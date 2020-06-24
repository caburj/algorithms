import mergesort from "../src/Mergesort.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const sortClasses = [mergesort];
const numberComparator = (a: number, b: number) => a < b;

Deno.test("0 items", () => {
  const items: number[] = [];
  for (let sort of sortClasses) {
    const toSort = [...items];
    sort<number>(toSort, numberComparator);
    assertEquals(toSort, []);
  }
});

Deno.test("1 item", () => {
  const items: number[] = [1];
  for (let sort of sortClasses) {
    const toSort = [...items];
    sort<number>(toSort, numberComparator);
    assertEquals(toSort, [1]);
  }
});

Deno.test("5 items", () => {
  const items: number[] = [5, 4, 3, 2, 1];
  for (let sort of sortClasses) {
    const toSort = [...items];
    sort<number>(toSort, numberComparator);
    assertEquals(toSort, [1, 2, 3, 4, 5]);
  }
});

Deno.test("8 items", () => {
  const items = [6, 3, 2, 6, 5, 1, 4, 9];
  for (let sort of sortClasses) {
    const toSort = [...items];
    sort<number>(toSort, numberComparator);
    assertEquals(toSort, [1, 2, 3, 4, 5, 6, 6, 9]);
  }
});

Deno.test("17 items", () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  for (let sort of sortClasses) {
    const toSort = [...items];
    sort<number>(toSort, numberComparator);
    assertEquals(toSort, [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9]);
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
