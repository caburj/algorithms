import UF from "../src/UF.ts";
import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";

function testFile(filename: string, nComponents: number) {
  const uf = new UF(filename);
  assertEquals(uf.count(), nComponents);
  const [, ...connections] = Deno.readTextFileSync(filename).trim().split("\n");
  // Check if all the connections are actually connected in the created UF.
  for (let pair of connections) {
    const [p, q] = pair.trim().split(/\s+/).map((str) => parseInt(str, 10));
    assert(uf.connected(p, q), `${p} and ${q} should be connected.`);
  }
}

Deno.test("check tinyUF", () => {
  testFile("./data/tinyUF.txt", 2);
});

Deno.test("check mediumUF", () => {
  testFile("./data/mediumUF.txt", 3);
});

Deno.test("check largeUF", () => {
  testFile("./data/largeUF.txt", 6);
});
