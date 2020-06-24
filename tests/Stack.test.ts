import Stack from "../src/basics/Stack.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("check order", () => {
  const stack = new Stack<number>();
  stack.push(1, 2, 3, 4, 5);
  assertEquals(stack.pop(), 5);
  assertEquals(stack.pop(), 4);
  assertEquals(stack.pop(), 3);
  assertEquals(stack.pop(), 2);
  assertEquals(stack.pop(), 1);
  assertEquals(stack.pop(), undefined);
});

Deno.test("check iterator", () => {
  const stack = new Stack<string>();
  stack.push(..."joseph");
  const values = [];
  for (let letter of stack) {
    values.push(letter);
  }
  assertEquals(values, [..."hpesoj"]);
});

Deno.test("peek", () => {
  const stack = new Stack<number>();
  stack.push(1, 2, 3, 4, 5);
  assertEquals(stack.peek(), 5);
  assertEquals(stack.pop(), 5);
  assertEquals(stack.pop(), 4);
  assertEquals(stack.pop(), 3);
  assertEquals(stack.pop(), 2);
  assertEquals(stack.peek(), 1);
  assertEquals(stack.size, 1);
  assertEquals(stack.pop(), 1);
  assertEquals(stack.pop(), undefined);
  assertEquals(stack.peek(), undefined);
  assertEquals(stack.size, 0);
});
