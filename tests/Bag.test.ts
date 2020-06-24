import Bag from "../src/basics/Bag.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("check iterator", () => {
  const stack = new Bag<number>();
  stack.add(5, 4, 3, 2, 1);
  const values = [];
  for (let letter of stack) {
    values.push(letter);
  }
  assertEquals(values, [1, 2, 3, 4, 5]);
});
