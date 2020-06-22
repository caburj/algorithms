import Queue from "../src/Queue.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("check order", () => {
  const queue = new Queue<number>();
  queue.enqueue(1, 2, 3, 4, 5);
  assertEquals(queue.dequeue(), 1);
  assertEquals(queue.dequeue(), 2);
  assertEquals(queue.dequeue(), 3);
  assertEquals(queue.dequeue(), 4);
  assertEquals(queue.dequeue(), 5);
  assertEquals(queue.dequeue(), undefined);
});

Deno.test("check iterator", () => {
  const queue = new Queue<string>();
  queue.enqueue(..."joseph");
  const values = [];
  for (let letter of queue) {
    values.push(letter);
  }
  assertEquals(values, [..."joseph"]);
});

Deno.test("mixed accesses", () => {
  const queue = new Queue<number>();
  queue.enqueue(1, 2);
  assertEquals(queue.dequeue(), 1);
  assertEquals(queue.dequeue(), 2);
  assertEquals(queue.size, 0);
  assertEquals(queue.dequeue(), undefined);
  assertEquals(queue.size, 0);
  queue.enqueue(3, 4, 5);
  assertEquals(queue.dequeue(), 3);
  assertEquals(queue.size, 2);
  assertEquals(queue.dequeue(), 4);
  queue.enqueue(100);
  assertEquals(queue.dequeue(), 5);
  assertEquals(queue.size, 1);
  assertEquals(queue.dequeue(), 100);
  assertEquals(queue.dequeue(), undefined);
});

Deno.test("iterate on large set", () => {
  const q = new Queue<number>();
  const N = 100000;
  const data = Array.from(Array(N).keys());
  q.enqueue(...data);
  const values = [];
  for (let val of q) {
    values.push(val);
  }
  assertEquals(values, data);
  assertEquals(q.size, N);
});

Deno.test("iterate by dequeue", () => {
  const q = new Queue<number>();
  const N = 100000;
  const data = Array.from(Array(N).keys());
  q.enqueue(...data);
  const values = [];
  for (let i = 0; i < N; i++) {
    values.push(q.dequeue());
  }
  assertEquals(values, data);
  assertEquals(q.size, 0);
});

Deno.test("peek queue", () => {
  const queue = new Queue<string>();
  queue.enqueue(..."joseph");
  assertEquals(queue.peek(), "j");
  assertEquals(queue.size, 6);
  assertEquals(queue.dequeue(), "j");
  queue.enqueue("j");
  queue.dequeue();
  queue.dequeue();
  assertEquals(queue.peek(), "e");
  assertEquals(queue.size, 4);
  assertEquals(queue.dequeue(), "e");
  assertEquals(queue.dequeue(), "p");
  assertEquals(queue.dequeue(), "h");
  assertEquals(queue.peek(), "j");
  assertEquals(queue.dequeue(), "j");
  assertEquals(queue.size, 0);
  assertEquals(queue.peek(), undefined);
});
