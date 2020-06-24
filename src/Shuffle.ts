import { randomInt } from "https://deno.land/x/random_int/mod.ts";
import { swap } from "./utils.ts";

/**
 * Shuffles the given `items` in place.
 * Based on Knuth shuffle.
 */
export default function <T>(items: T[]) {
  if (items.length <= 1) {
    return items;
  }
  for (let i = 1; i < items.length; i++) {
    const r = randomInt(i);
    swap(items, i, r);
  }
}
