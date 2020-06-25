import quickselect from "../src/derived/quickselect.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("5 items", () => {
  const items = [1, 2, 3, 4, 5];
  assertEquals(quickselect(items, 2), 4);
  assertEquals(quickselect(items, 1), 5);
});

Deno.test("20 items", () => {
  const items = Array.from(Array(20).keys());
  assertEquals(quickselect(items, 5), 15);
  assertEquals(quickselect(items, 1), 19);
});

Deno.test("1M items", () => {
  const items = Array.from(Array(1000000).keys());
  assertEquals(quickselect(items, 1), 999999);
  assertEquals(quickselect(items, 65), 999935);
});

Deno.test("object", () => {
  const items = [{ a: 1 }, { a: 10 }, { a: 2 }];
  assertEquals(quickselect(items, 1, (x, y) => x.a < y.a), { a: 10 });
});

Deno.test("undefined", () => {
  let items: number[] = [];
  assertEquals(quickselect(items, 1), undefined);
  items = [10];
  assertEquals(quickselect(items, 10), undefined);
});
