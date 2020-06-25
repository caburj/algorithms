import quickselect from "../src/derived/quickselect.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { comparator } from "../src/utils.ts";

Deno.test("5 items", () => {
  const items = [1, 2, 3, 4, 5];
  assertEquals(quickselect(items, comparator, 2), 4);
  assertEquals(quickselect(items, comparator, 1), 5);
});

Deno.test("20 items", () => {
  const items = Array.from(Array(20).keys());
  assertEquals(quickselect(items, comparator, 5), 15);
  assertEquals(quickselect(items, comparator, 1), 19);
});

Deno.test("1M items", () => {
  const items = Array.from(Array(1000000).keys());
  assertEquals(quickselect(items, comparator, 1), 999999);
  assertEquals(quickselect(items, comparator, 65), 999935);
});
